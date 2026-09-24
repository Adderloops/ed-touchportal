'use strict';

const { FLAGS } = require('./flags');

const CATEGORY_ID = 'ed.ship';

const states = {
  fuelMain: { id: 'ed.ship.fuelMain', desc: 'Main tank fuel (t)', default: '0' },
  fuelReservoir: { id: 'ed.ship.fuelReservoir', desc: 'Reservoir fuel (t)', default: '0' },
  cargoMass: { id: 'ed.ship.cargoMass', desc: 'Current cargo (t)', default: '0' },
  legalState: { id: 'ed.ship.legalState', desc: 'Legal state', default: 'Clean' },
  guiFocus: { id: 'ed.ship.guiFocus', desc: 'Currently focused panel', default: 'NoFocus' },
  fireGroup: { id: 'ed.ship.fireGroup', desc: 'Active fire group', default: '0' },
  pipsSystems: { id: 'ed.ship.pipsSystems', desc: 'Systems pips', default: '0' },
  pipsEngines: { id: 'ed.ship.pipsEngines', desc: 'Engines pips', default: '0' },
  pipsWeapons: { id: 'ed.ship.pipsWeapons', desc: 'Weapons pips', default: '0' },
  selectedWeapon: { id: 'ed.ship.selectedWeapon', desc: 'Selected weapon/module', default: '' },
  gravity: { id: 'ed.ship.gravity', desc: 'Local gravity (G)', default: '' },
  // Texto dinámico del botón "RECALL SHIP" / "DISMISS SHIP" de la página
  // ED - SRV. No refleja un dato directo del juego: se pone a "DISMISS\nSHIP"
  // cuando llega un evento de Journal "ModuleInfo" (señal real, ver
  // src/handlers/cmdr.js) y vuelve a "RECALL\nSHIP" cuando el usuario pulsa
  // el botón estando ya en el estado "DISMISS" (inferencia, ver
  // src/actions.js) -- el Dismiss no deja ninguna señal real en el juego.
  shipRecallLabel: { id: 'ed.ship.shipRecallLabel', desc: 'Recall/Dismiss Ship button label based on the last detected signal', default: 'RECALL\nSHIP' },
  // Página nueva "ED - Loadout" (2026-09-17): las 4 listas del equipamiento
  // actual, calculadas a partir de "Modules" del evento Loadout -- ver
  // src/services/module-names.js (clasificación por Slot + decodificador de
  // "Item") y el handler en src/handlers/cmdr.js.
  loadoutHardpoints: { id: 'ed.ship.loadoutHardpoints', desc: 'Equipped weapon hardpoints (Small/Medium/Large/Huge)', default: 'No data yet' },
  loadoutUtility: { id: 'ed.ship.loadoutUtility', desc: 'Equipped utility mounts (Tiny)', default: 'No data yet' },
  loadoutCoreInternals: { id: 'ed.ship.loadoutCoreInternals', desc: 'Core internal modules (the 8 fixed slots of every ship)', default: 'No data yet' },
  loadoutOptionalInternals: { id: 'ed.ship.loadoutOptionalInternals', desc: 'Equipped optional internal modules', default: 'No data yet' },
  // Panel de estadísticas al pie de "ED - Loadout" (2026-09-18, v5 ronda
  // 3): SOLO datos que el propio evento Loadout manda directamente (masa,
  // alcance de salto máximo, valor de nave, seguro) -- decisión explícita
  // del usuario tras preguntarle, para no arriesgar cálculos propios tipo
  // Coriolis (velocidad, DPS, resistencias de escudo/blindaje), que el
  // juego no expone. Calculados/formateados en src/handlers/cmdr.js.
  loadoutMass: { id: 'ed.ship.loadoutMass', desc: 'Unladen / laden mass (tons, calculated from Loadout)', default: 'No data yet' },
  loadoutJumpRangeMax: { id: 'ed.ship.loadoutJumpRangeMax', desc: 'Max jump range (ly, from the Loadout event)', default: 'No data yet' },
  loadoutShipValue: { id: 'ed.ship.loadoutShipValue', desc: 'Total ship value (hull + modules, credits, from the Loadout event)', default: 'No data yet' },
  loadoutInsurance: { id: 'ed.ship.loadoutInsurance', desc: 'Insurance / rebuy cost (credits, from the Loadout event)', default: 'No data yet' },
};

// Un state + un event "When X changes" por cada flag de Status.json (bitfield principal)
for (const flag of FLAGS) {
  states[flag.id] = { id: `ed.ship.${flag.id}`, desc: flag.desc, default: 'false' };
}

// Rediseño "tipo Edsy/Coriolis" (2026-09-18): un slot fijo por cada hueco de
// equipamiento posible, con SU PROPIO texto (nombre + insignia + grado de
// ingeniería + tipo + efecto experimental, ver src/services/module-names.js)
// y SU PROPIO booleano "ingenierizado" -- el booleano es lo que dispara el
// cambio de color de fondo de la tarjeta (ámbar si engineered=true) vía el
// mismo mecanismo PLUGIN_EVENT + CHANGE_BUTTON_VISUALS_ACTION que ya usan
// los 17 flags/6 interruptores de "ED - Vuelo" (único mecanismo de color en
// vivo confirmado fiable en el proyecto). Número de slots por categoría,
// fijo y generoso, decidido con el usuario: 8 hardpoints, 8 utilidad, 8 core
// (siempre los mismos 8 nombrados) y 14 opcionales -- los que la nave actual
// no usa quedan en "— vacío —" (nunca datos inventados).
const CORE_SLOT_DESCS = {
  PowerPlant: 'Power Plant',
  MainEngines: 'Thrusters',
  FrameShiftDrive: 'FSD',
  LifeSupport: 'Life Support',
  PowerDistributor: 'Power Distributor',
  Radar: 'Sensors',
  FuelTank: 'Fuel Tank',
  Armour: 'Armour',
};
const CORE_KEYS = ['PowerPlant', 'MainEngines', 'FrameShiftDrive', 'LifeSupport', 'PowerDistributor', 'Radar', 'FuelTank', 'Armour'];

const MODULE_SLOTS = [
  ...Array.from({ length: 8 }, (_, i) => ({ key: `hp${i + 1}`, desc: `Hardpoint ${i + 1}` })),
  ...Array.from({ length: 8 }, (_, i) => ({ key: `ut${i + 1}`, desc: `Utility ${i + 1}` })),
  ...CORE_KEYS.map((k) => ({ key: `core${k}`, desc: CORE_SLOT_DESCS[k] })),
  ...Array.from({ length: 14 }, (_, i) => ({ key: `opt${i + 1}`, desc: `Optional Internal ${i + 1}` })),
];

for (const slot of MODULE_SLOTS) {
  states[`loadout_${slot.key}`] = { id: `ed.ship.loadout${cap(slot.key)}`, desc: `${slot.desc}: equipped module (name/grade/engineering type)`, default: '— empty —' };
  states[`loadout_${slot.key}Eng`] = { id: `ed.ship.loadout${cap(slot.key)}Eng`, desc: `${slot.desc}: engineered?`, default: 'false' };
}
function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

const BOOLEAN_CHOICES = ['true', 'false'];

const events = [
  { id: 'ed.ship.event.legalState', name: 'When the Legal State changes', format: 'When the Legal State becomes $val', valueStateId: states.legalState.id, valueType: 'choice', valueChoices: ['Clean', 'IllegalCargo', 'Speeding', 'Wanted', 'Hostile', 'PassengerWanted', 'Warrant'] },
  { id: 'ed.ship.event.guiFocus', name: 'When the Focused Panel changes', format: 'When the Focused Panel becomes $val', valueStateId: states.guiFocus.id, valueType: 'choice', valueChoices: ['NoFocus', 'InternalPanel', 'ExternalPanel', 'CommsPanel', 'RolePanel', 'StationServices', 'GalaxyMap', 'SystemMap', 'Orrery', 'FSS mode', 'SAA mode', 'Codex'] },
  ...FLAGS.map((flag) => ({
    id: `ed.ship.event.${flag.id}`,
    name: `When it changes: ${flag.desc}`,
    format: `When "${flag.desc}" becomes $val`,
    valueStateId: states[flag.id].id,
    valueType: 'choice',
    valueChoices: BOOLEAN_CHOICES,
  })),
  ...MODULE_SLOTS.map((slot) => ({
    id: `ed.ship.event.loadout${cap(slot.key)}Eng`,
    name: `When it changes: engineered? (${slot.desc})`,
    format: `When "${slot.desc}" engineered becomes $val`,
    valueStateId: states[`loadout_${slot.key}Eng`].id,
    valueType: 'choice',
    valueChoices: BOOLEAN_CHOICES,
  })),
];

const actions = [
  {
    id: 'ed.ship.action.recallShipPressed',
    name: 'Ship: notify Recall/Dismiss button press (internal use)',
    format: 'Ship: flag a possible Dismiss when the Recall/Dismiss Ship button is pressed',
  },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Ship Status', states, events, actions, MODULE_SLOTS };
