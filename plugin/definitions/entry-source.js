'use strict';

/**
 * Fuente única de verdad del entry.tp. Se genera con `npm run build-entry`
 * (ver scripts/build-entry.js). No edites entry.tp a mano: los cambios se
 * perderían en la siguiente generación.
 *
 * Cada módulo category-*.js exporta { categoryId, categoryName, states,
 * events, actions } usando los MISMOS ids que consumen los handlers en
 * src/handlers/*.js, así que entry.tp y el código nunca se desincronizan.
 * Algunos módulos (p.ej. category-audio) exportan además `connectors`
 * (sliders nativos de Touch Portal).
 */

const categoriesDefs = [
  require('./category-ship'),
  require('./category-cmdr'),
  require('./category-nav'),
  require('./category-combat'),
  require('./category-exploration'),
  require('./category-trade'),
  require('./category-powerplay'),
  require('./category-missions'),
  require('./category-station'),
  require('./category-onfoot'),
  require('./category-carrier'),
  require('./category-squadron'),
  ...(require('./features').AUDIO_ENABLED ? [require('./category-audio')] : []),
  require('./category-meta'),
];

function toTpCategory(def) {
  return {
    id: def.categoryId,
    name: def.categoryName,
    imagepath: '%TP_PLUGIN_FOLDER%ed-touchportal-plugin/images/icon-24.png',
    actions: (def.actions || []).map((a) => ({
      id: a.id,
      name: a.name,
      prefix: def.categoryName,
      type: 'communicate',
      format: a.format,
      ...(a.data ? { data: a.data } : {}),
    })),
    connectors: (def.connectors || []).map((c) => ({
      id: c.id,
      name: c.name,
      format: c.format,
      ...(c.data ? { data: c.data } : {}),
    })),
    states: Object.values(def.states).map((s) => ({
      id: s.id,
      type: 'text',
      desc: s.desc,
      default: s.default,
    })),
    events: (def.events || []).map((e) => ({
      id: e.id,
      type: 'communicate',
      name: e.name,
      format: e.format,
      valueType: e.valueType || 'text',
      ...(e.valueChoices ? { valueChoices: e.valueChoices } : {}),
      valueStateId: e.valueStateId,
    })),
  };
}

module.exports = {
  sdk: 6,
  version: 100,
  name: 'ED Touch Portal Plugin',
  id: 'com.adder.edtouchportal',
  plugin_start_cmd: 'node ./plugin.js start',
  configuration: {
    colorDark: '#0b0f14',
    colorLight: '#e67e22',
  },
  categories: categoriesDefs.map(toTpCategory),
};
