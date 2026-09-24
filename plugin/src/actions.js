'use strict';

const fs = require('fs');
const path = require('path');
const { spawn, execFile } = require('child_process');

const metaDefs = require('../definitions/category-meta');
const powerDefs = require('../definitions/category-powerplay');
const navDefs = require('../definitions/category-nav');
const shipDefs = require('../definitions/category-ship');
const audioDefs = require('../definitions/category-audio');

// SoundVolumeCommandLine (NirSoft, freeware) - controla el volumen de
// aplicaciones concretas en Windows. Se distribuye junto al plugin en
// tools/svcl.exe (ver https://www.nirsoft.net/utils/sound_volume_command_line.html).
const SVCL_PATH = path.join(__dirname, '..', 'tools', 'svcl.exe');

function runSvcl(args) {
  if (process.platform !== 'win32') {
    console.error('[actions] Audio: svcl.exe only works on Windows, action ignored');
    return;
  }
  execFile(SVCL_PATH, args, (err) => {
    if (err) console.error(`[actions] Audio: error running svcl.exe ${args.join(' ')}:`, err.message);
  });
}

function setAppVolume(processId, percent) {
  const clamped = Math.max(0, Math.min(100, Math.round(Number(percent))));
  runSvcl(['/SetVolume', processId, String(clamped)]);
}

function toggleAppMute(processId) {
  runSvcl(['/Switch', processId]);
}

// Alterna el state entre la ruta del icono "OFF" (sin mutear) y la del
// icono "ON" (muteado) -- Touch Portal usa el VALOR del state directamente
// como ruta del icono ("Change the Icon with the value from plugin
// state"), así que aquí no guardamos 'muted'/'unmuted' sino la ruta que
// le toca. Optimista (no confirma contra el mute real de Windows): ver
// nota en registerActions(). Devuelve 'muted'/'unmuted' solo para el log.
function toggleMutedState(state, stateId) {
  const current = state.get(stateId) || audioDefs.MUTE_ICON_OFF;
  const isMuted = current === audioDefs.MUTE_ICON_ON;
  const next = isMuted ? audioDefs.MUTE_ICON_OFF : audioDefs.MUTE_ICON_ON;
  state.set(stateId, next);
  return isMuted ? 'unmuted' : 'muted';
}

function openUrl(url) {
  const platform = process.platform;
  try {
    if (platform === 'win32') {
      // 'start' es un built-in de cmd.exe, no un ejecutable: hay que pasar por cmd /c
      execFile('cmd.exe', ['/c', 'start', '""', url]);
    } else if (platform === 'darwin') {
      execFile('open', [url]);
    } else {
      execFile('xdg-open', [url]);
    }
  } catch (err) {
    console.error('[actions] Could not open the browser:', err);
  }
}

function copyToClipboard(text) {
  const platform = process.platform;
  try {
    if (platform === 'win32') {
      const proc = spawn('clip');
      proc.stdin.end(text);
    } else if (platform === 'darwin') {
      const proc = spawn('pbcopy');
      proc.stdin.end(text);
    } else {
      const proc = spawn('xclip', ['-selection', 'clipboard']);
      proc.stdin.end(text);
    }
  } catch (err) {
    console.error('[actions] Could not copy to clipboard:', err);
  }
}

/**
 * Registra el listener de "Action" de Touch Portal y resuelve cada
 * ed.meta.action.* / ed.power.action.* contra el estado actual del plugin.
 *
 * @param {import('touchportal-api').Client} tpClient
 * @param {{ state: import('./services/state-store'), session: import('./session-stats'), journalTailer: import('./services/journal-tailer').JournalTailer }} ctx
 */
function registerActions(tpClient, ctx) {
  const { state, session, journalTailer } = ctx;

  tpClient.on('Action', (data) => {
    switch (data.actionId) {
      case metaDefs.actions[0].id: // resetSession
        session.reset();
        state.set(powerDefs.states.gainedMerits.id, 0);
        console.log('[actions] Session counters reset');
        break;

      case metaDefs.actions[1].id: { // reloadJournal
        journalTailer.reloadFromStart();
        console.log('[actions] Re-reading current Journal from the start');
        break;
      }

      case metaDefs.actions[2].id: { // openInara
        const system = state.get(navDefs.states.currentSystem.id) || '';
        openUrl(`https://inara.cz/elite/starsystem/?search=${encodeURIComponent(system)}`);
        break;
      }

      case metaDefs.actions[3].id: { // openEDSM
        const system = state.get(navDefs.states.currentSystem.id) || '';
        openUrl(`https://www.edsm.net/en/system?systemName=${encodeURIComponent(system)}`);
        break;
      }

      case metaDefs.actions[4].id: { // copySystemToClipboard
        const system = state.get(navDefs.states.currentSystem.id) || '';
        copyToClipboard(system);
        break;
      }

      case metaDefs.actions[5].id: { // exportSessionStats
        exportSessionStats(state, session);
        break;
      }

      case powerDefs.actions[0].id: { // Powerplay: reset merit counter
        const total = Number(state.get(powerDefs.states.totalMerits.id) || 0);
        session.powerplay.meritsAtReset = total;
        state.set(powerDefs.states.gainedMerits.id, 0);
        console.log(`[actions] Powerplay merit counter reset at ${total}`);
        break;
      }

      // Una acción fija por app (ver definitions/category-audio.js, misma
      // orden que Object.keys(APP_PROCESS_MAP)): cada botón de mute de la
      // página invoca directamente la suya, sin necesidad de leer ningún
      // data field. Además de llamar a svcl.exe, alterna el state
      // ed.audio.state.muted.<app> -- de forma optimista, igual que
      // shipDefs.shipRecallLabel, porque no hay una forma barata de leer
      // el mute real de Windows en cada pulsación. Ese state es lo que
      // Touch Portal usa (acción nativa "Change visuals by plug-in state")
      // para pintar el icono MUTE cian o el MUTED rojo en el botón.
      case audioDefs.actions[0].id: { // toggleMute.eliteDangerous
        toggleAppMute(audioDefs.APP_PROCESS_MAP['Elite Dangerous']);
        const next = toggleMutedState(state, audioDefs.actions[0].stateId);
        console.log(`[actions] Audio: mute toggled for Elite Dangerous (state -> ${next})`);
        break;
      }

      case audioDefs.actions[1].id: { // toggleMute.chrome
        toggleAppMute(audioDefs.APP_PROCESS_MAP['Chrome']);
        const next = toggleMutedState(state, audioDefs.actions[1].stateId);
        console.log(`[actions] Audio: mute toggled for Chrome (state -> ${next})`);
        break;
      }

      case audioDefs.actions[2].id: { // toggleMute.discord
        toggleAppMute(audioDefs.APP_PROCESS_MAP['Discord']);
        const next = toggleMutedState(state, audioDefs.actions[2].stateId);
        console.log(`[actions] Audio: mute toggled for Discord (state -> ${next})`);
        break;
      }

      case shipDefs.actions[0].id: { // recallShipPressed
        // No hay ninguna señal real de que el Dismiss haya funcionado (ver
        // handlers/cmdr.js): si el botón ya estaba mostrando "DISMISS SHIP"
        // (porque un ModuleInfo confirmó que la nave llegó), al pulsar se
        // asume que el jugador la ha despedido y se vuelve a "RECALL SHIP".
        // Si el botón todavía decía "RECALL SHIP", NO se adivina que la
        // nave ya está cerca -- eso solo lo confirma un ModuleInfo real.
        const current = state.get(shipDefs.states.shipRecallLabel.id);
        if (current === 'DISMISS\nSHIP') {
          state.set(shipDefs.states.shipRecallLabel.id, 'RECALL\nSHIP');
          console.log('[actions] Recall/Dismiss: assuming Dismiss after press');
        }
        break;
      }

      default:
        // Acción desconocida: se ignora (puede venir de una versión previa del plugin)
        break;
    }
  });
}

function exportSessionStats(state, session) {
  const logsDir = path.join(__dirname, '..', 'logs');
  try {
    fs.mkdirSync(logsDir, { recursive: true });
  } catch (err) {
    console.error('[actions] Could not create logs folder:', err);
    return;
  }

  const summary = {
    exportedAt: new Date().toISOString(),
    sessionStartedAt: session.startedAt.toISOString(),
    combat: session.combat,
    trade: session.trade,
    exploration: session.exploration,
    missions: { ...session.missions, active: session.activeMissionIds.size },
    powerplay: {
      power: state.get(powerDefs.states.name.id),
      rank: state.get(powerDefs.states.rank.id),
      totalMerits: state.get(powerDefs.states.totalMerits.id),
      gainedMerits: state.get(powerDefs.states.gainedMerits.id),
    },
  };

  const fileName = `session-${new Date().toISOString().replace(/[:.]/g, '-')}.json`;
  const filePath = path.join(logsDir, fileName);
  fs.writeFileSync(filePath, JSON.stringify(summary, null, 2), 'utf8');
  console.log(`[actions] Session stats exported to ${filePath}`);
}

module.exports = { registerActions, openUrl, copyToClipboard, setAppVolume, toggleAppMute };
