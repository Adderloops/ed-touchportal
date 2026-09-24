'use strict';

const path = require('path');

const CATEGORY_ID = 'ed.audio';

// Iconos del botón MUTE (estilo PCB, ver claude/pagina-audio-2026-09-22.md):
// se copian junto al resto de imágenes del plugin (images/icon-24.png etc.)
// para poder referenciarlos con una ruta absoluta resuelta en el propio PC
// del usuario -- la acción nativa de Touch Portal "Change the Icon with the
// value from plugin state" usa el VALOR LITERAL del state como icono (no es
// una condición 'si vale X entonces...', es un bind directo), así que el
// state tiene que contener la ruta al fichero, no un texto como 'muted'.
const IMAGES_DIR = path.join(__dirname, '..', 'images');
const MUTE_ICON_OFF = path.join(IMAGES_DIR, 'mute-off.png');
const MUTE_ICON_ON = path.join(IMAGES_DIR, 'mute-on.png');

// Apps controlables desde el mezclador. La clave es la etiqueta visible en
// Touch Portal; el valor es el identificador de proceso que entiende
// svcl.exe (SoundVolumeCommandLine de NirSoft, ver tools/svcl.exe).
const APP_PROCESS_MAP = {
  'Elite Dangerous': 'EliteDangerous64.exe',
  Chrome: 'chrome.exe',
  Discord: 'Discord.exe',
};

const APP_CHOICES = Object.keys(APP_PROCESS_MAP);

// Un state por app cuyo VALOR es la ruta al icono que le toca ahora mismo
// (MUTE_ICON_OFF o MUTE_ICON_ON), no un simple 'muted'/'unmuted'. Se
// actualiza de forma optimista en actions.js cada vez que se pulsa el botón
// (mismo patrón ya usado en shipDefs.states.shipRecallLabel: no hay forma
// barata de leer el mute real de Windows en cada pulsación, así que se
// asume que el toggle ha funcionado). Arranca siempre apuntando al icono
// "OFF" (sin mutear).
const states = {
  status: { id: 'ed.audio.status', desc: 'Audio mixer status', default: 'OK' },
  mutedEliteDangerous: {
    id: 'ed.audio.state.muted.eliteDangerous',
    desc: 'Elite Dangerous muted?',
    default: MUTE_ICON_OFF,
  },
  mutedChrome: { id: 'ed.audio.state.muted.chrome', desc: 'Chrome muted?', default: MUTE_ICON_OFF },
  mutedDiscord: { id: 'ed.audio.state.muted.discord', desc: 'Discord muted?', default: MUTE_ICON_OFF },
};

const events = [];

// Una acción fija por app (sin data field) en vez de una única acción
// parametrizada: evita depender de la forma, no verificada en vivo, que
// tendría un botón PLUGIN_ACTION con "data" -- los botones sin data ya
// están confirmados byte a byte (ver RESET SESSION/RELOAD JOURNAL, etc.
// en ED - Utilidades). La key va sin espacios/tildes para que el id quede
// limpio; el nombre visible sí lleva el nombre real de la app.
const AUDIO_APP_KEYS = {
  'Elite Dangerous': 'eliteDangerous',
  Chrome: 'chrome',
  Discord: 'discord',
};

// Mapa appKey -> id del state de mute correspondiente (ver `states` arriba),
// para que actions.js no tenga que reconstruir el id a mano.
const MUTED_STATE_IDS = {
  eliteDangerous: states.mutedEliteDangerous.id,
  chrome: states.mutedChrome.id,
  discord: states.mutedDiscord.id,
};

const actions = Object.keys(APP_PROCESS_MAP).map((appLabel) => ({
  id: `ed.audio.action.toggleMute.${AUDIO_APP_KEYS[appLabel]}`,
  name: `Toggle mute: ${appLabel}`,
  format: `Toggle mute for ${appLabel}`,
  app: appLabel, // metadato interno (no viaja a entry.tp), usado por actions.js
  stateId: MUTED_STATE_IDS[AUDIO_APP_KEYS[appLabel]],
}));

// Los "connectors" son los sliders nativos de Touch Portal. Usamos un único
// connector con un data field de tipo choice para elegir la app: cada botón
// slider de la página fija un valor distinto de ese data field (ver
// hallazgos-editor-test-claude-2026-09-11.md sobre el formato real de "C").
const connectors = [
  {
    id: 'ed.audio.connector.appVolume',
    name: 'App volume slider',
    format: 'Set volume for {$ed.audio.connector.appVolume.data.app$}',
    data: [
      {
        id: 'ed.audio.connector.appVolume.data.app',
        type: 'choice',
        label: 'App',
        default: APP_CHOICES[0],
        valueChoices: APP_CHOICES,
      },
    ],
  },
];

module.exports = {
  categoryId: CATEGORY_ID,
  categoryName: 'Audio Mixer',
  states,
  events,
  actions,
  connectors,
  APP_PROCESS_MAP,
  APP_CHOICES,
  MUTED_STATE_IDS,
  MUTE_ICON_OFF,
  MUTE_ICON_ON,
};
