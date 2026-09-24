'use strict';

const TouchPortalAPI = require('touchportal-api');

const { JournalTailer, getJournalFolder } = require('./src/services/journal-tailer');
const StatusReader = require('./src/services/status-reader');
const CargoReader = require('./src/services/cargo-reader');
const StateStore = require('./src/services/state-store');
const EventRouter = require('./src/event-router');
const SessionStats = require('./src/session-stats');
const registerAllHandlers = require('./src/handlers');
const { registerActions, setAppVolume } = require('./src/actions');

const shipDefs = require('./definitions/category-ship');
const onFootDefs = require('./definitions/category-onfoot');
const metaDefs = require('./definitions/category-meta');
const tradeDefs = require('./definitions/category-trade');
const audioDefs = require('./definitions/category-audio');
const { AUDIO_ENABLED } = require('./definitions/features');

const PLUGIN_ID = require('./definitions/entry-source').id;

const TPClient = new TouchPortalAPI.Client();
const state = new StateStore(TPClient);
const session = new SessionStats();
const router = new EventRouter();
const journalTailer = new JournalTailer(getJournalFolder(), 400);
const statusReader = new StatusReader(getJournalFolder(), 500);
const cargoReader = new CargoReader(getJournalFolder(), 1000);

registerAllHandlers(router, { state, session });

router.onAny((event) => {
  state.set(metaDefs.states.lastEventName.id, event.event);
});

journalTailer.on('event', (event) => router.dispatch(event));

journalTailer.on('file-changed', (filePath) => {
  console.log(`[plugin] Following Journal: ${filePath}`);
  state.set(metaDefs.states.status.id, 'CONNECTED');
});

journalTailer.on('error', (err) => {
  console.error('[plugin] Journal:', err.message);
  state.set(metaDefs.states.status.id, 'NO_JOURNAL');
});

function applyStatusUpdate(decoded) {
  const pairs = [];

  for (const key of Object.keys(shipDefs.states)) {
    if (decoded[key] !== undefined) pairs.push({ id: shipDefs.states[key].id, value: decoded[key] });
  }
  for (const key of Object.keys(onFootDefs.states)) {
    if (decoded[key] !== undefined) pairs.push({ id: onFootDefs.states[key].id, value: decoded[key] });
  }

  state.setMany(pairs);
}

function applyCargoUpdate(decoded) {
  if (decoded.vessel === 'SRV') {
    state.setMany([
      { id: tradeDefs.states.srvCargoList.id, value: decoded.list },
      { id: tradeDefs.states.srvCargoCount.id, value: decoded.count },
    ]);
  } else {
    state.setMany([
      { id: tradeDefs.states.shipCargoList.id, value: decoded.list },
      { id: tradeDefs.states.shipCargoCount.id, value: decoded.count },
    ]);
  }
}

registerActions(TPClient, { state, session, journalTailer });

// IMPORTANTE: no se puede enviar ningún state antes de que Touch Portal
// confirme el emparejamiento (evento "Info"): el socket interno de
// touchportal-api no existe todavía y stateUpdate() lanzaría una excepción.
// Por eso el tailer del Journal y el poller de Status.json solo arrancan
// aquí dentro, no al cargar el módulo.
TPClient.on('Info', () => {
  console.log('[plugin] Connected to Touch Portal');
  state.set(metaDefs.states.status.id, 'CONNECTED');
  state.set(metaDefs.states.sessionStart.id, session.startedAt.toISOString());

  // El default que lleva entry.tp para los 3 states de mute se generó en
  // la máquina donde se compiló el plugin, así que NO es de fiar como
  // ruta real de icono en el PC del usuario. Aquí empujamos el valor
  // bueno (calculado con __dirname, ya en la máquina donde corre esto de
  // verdad) en cuanto se conecta, para que los botones MUTE arranquen
  // mostrando el icono "sin mutear" desde el primer instante.
  if (AUDIO_ENABLED) {
    state.set(audioDefs.MUTED_STATE_IDS.eliteDangerous, audioDefs.MUTE_ICON_OFF);
    state.set(audioDefs.MUTED_STATE_IDS.chrome, audioDefs.MUTE_ICON_OFF);
    state.set(audioDefs.MUTED_STATE_IDS.discord, audioDefs.MUTE_ICON_OFF);
  }

  statusReader.start(applyStatusUpdate);
  cargoReader.start(applyCargoUpdate);
  journalTailer.start();
});

TPClient.on('Settings', () => {});

// Sliders del mezclador de audio (categoría ed.audio).
// Formato de "ConnectorChange" confirmado en caliente el 2026-09-22:
//   { type:'connectorChange', connectorId:'ed.audio.connector.appVolume',
//     value: 0-100, data:[{id:'ed.audio.connector.appVolume.data.app', value:'Elite Dangerous'}] }
const AUDIO_CONNECTOR_ID = audioDefs.connectors[0].id;
const AUDIO_CONNECTOR_DATA_ID = audioDefs.connectors[0].data[0].id;

function resolveConnectorAppLabel(message) {
  if (Array.isArray(message.data)) {
    const found = message.data.find((d) => d.id === AUDIO_CONNECTOR_DATA_ID);
    if (found) return found.value;
  }
  return undefined;
}

// Al arrastrar el slider, Touch Portal manda ~10 ConnectorChange/segundo.
// Sin límite, cada uno lanzaría un proceso svcl.exe nuevo (spam de procesos
// y riesgo de que lleguen fuera de orden). Se aplica como mucho una vez
// cada AUDIO_VOLUME_THROTTLE_MS, siempre con el último valor recibido.
const AUDIO_VOLUME_THROTTLE_MS = 120;
const audioThrottleState = new Map(); // processId -> { lastRun, timer, pendingValue }

function throttledSetAppVolume(processId, value) {
  let st = audioThrottleState.get(processId);
  if (!st) {
    st = { lastRun: 0, timer: null, pendingValue: null };
    audioThrottleState.set(processId, st);
  }
  st.pendingValue = value;

  const elapsed = Date.now() - st.lastRun;
  if (elapsed >= AUDIO_VOLUME_THROTTLE_MS) {
    st.lastRun = Date.now();
    setAppVolume(processId, st.pendingValue);
    return;
  }
  if (!st.timer) {
    st.timer = setTimeout(() => {
      st.timer = null;
      st.lastRun = Date.now();
      setAppVolume(processId, st.pendingValue);
    }, AUDIO_VOLUME_THROTTLE_MS - elapsed);
  }
}

TPClient.on('ConnectorChange', (message) => {
  if (!AUDIO_ENABLED) return;
  if (!message.connectorId || !message.connectorId.includes(AUDIO_CONNECTOR_ID)) return;

  const appLabel = resolveConnectorAppLabel(message);
  const processId = audioDefs.APP_PROCESS_MAP[appLabel];

  if (processId && message.value !== undefined) {
    throttledSetAppVolume(processId, message.value);
  } else {
    console.error(`[plugin] Audio: could not resolve connector (app=${appLabel}, value=${message.value})`);
  }
});

process.on('SIGINT', () => {
  journalTailer.stop();
  statusReader.stop();
  cargoReader.stop();
  process.exit(0);
});

TPClient.connect({ pluginId: PLUGIN_ID });
