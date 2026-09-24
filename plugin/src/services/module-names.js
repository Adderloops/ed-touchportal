'use strict';

/**
 * v3 (2026-09-18) -- rediseño pedido por el usuario tras ver el v1/v2:
 * "quiero los datos listados e identificados, tipo Edsy o Coriolis, con
 * indicación de lo que está ingenierizado". En vez de una lista de texto
 * por categoría (v1/v2), cada MÓDULO INDIVIDUAL pasa a tener su propio
 * "slot" con datos separados (texto a mostrar + booleano "ingenierizado")
 * para que la página pueda pintar una TARJETA DE COLOR por módulo (ámbar
 * si está ingenierizado, igual que ya se hacía para CORE INTERNALS en el
 * primer mockup) -- el color de fondo es el Único mecanismo de Touch Portal
 * confirmado fiable para "estado en vivo" (ver Bug #8 del proyecto), así
 * que es la señal PRINCIPAL de "ingenierizado"; el texto añade además el
 * grado (G5), el tipo de ingeniería y el efecto experimental si lo hay.
 *
 * Número de slots por categoría (fijo, generoso, decidido con el usuario):
 * 8 hardpoints, 8 utilidad, 8 core (siempre los mismos 8 nombrados), 14
 * opcionales. Los slots que la nave actual no usa se marcan como "vacío"
 * (placeholder honesto, NUNCA datos inventados) -- el usuario indicó
 * expresamente que avisará cuando tenga una nave que ejercite hardpoints/
 * utilidad para poder validar esas categorías con datos reales también.
 */

const CLASS_LETTER = { 5: 'A', 4: 'B', 3: 'C', 2: 'D', 1: 'E' };
const HP_SIZE_LETTER = { Huge: 'H', Large: 'L', Medium: 'M', Small: 'S' };

const CORE_SLOT_LABELS = {
  PowerPlant: 'POWER PLANT',
  MainEngines: 'THRUSTERS',
  FrameShiftDrive: 'FSD',
  LifeSupport: 'LIFE SUPPORT',
  PowerDistributor: 'DISTRIBUTOR',
  Radar: 'SENSORS',
  FuelTank: 'FUEL TANK',
  Armour: 'ARMOUR',
};
// Mismo orden que la pantalla de equipamiento del propio juego, y MISMAS
// claves que usa CATEGORY_SHIP_CORE_KEYS en definitions/category-ship.js
// (no cambiar sin cambiar también ahí).
const CORE_ORDER = ['PowerPlant', 'MainEngines', 'FrameShiftDrive', 'LifeSupport', 'PowerDistributor', 'Radar', 'FuelTank', 'Armour'];

const HARDPOINT_RE = /^(Huge|Large|Medium|Small)Hardpoint(\d+)$/;
const UTILITY_RE = /^TinyHardpoint(\d+)$/;
const OPTIONAL_RE = /^(?:Slot(\d+)_Size(\d+)|Cargo(\d+)|Military(\d+))$/;
const HARDPOINT_SIZE_ORDER = { Huge: 0, Large: 1, Medium: 2, Small: 3 };

const WORD_DICT = {
  multicannon: 'Multi-cannon',
  plasmaaccelerator: 'Plasma Accelerator',
  railgun: 'Rail Gun',
  beamlaser: 'Beam Laser',
  pulselaser: 'Pulse Laser',
  pulselaserburst: 'Burst Laser',
  cannon: 'Cannon',
  missilerack: 'Missile Rack',
  minelauncher: 'Mine Launcher',
  fragmentcannon: 'Fragment Cannon',
  plasmashockcannon: 'Shock Cannon',
  guardian_plasmalauncher: 'Guardian Plasma Charger',
  guardian_shardcannon: 'Guardian Shard Cannon',
  heatsinklauncher: 'Heat Sink Launcher',
  chafflauncher: 'Chaff Launcher',
  causticsinklauncher: 'Caustic Sink Launcher',
  electroniccountermeasure: 'ECM',
  pointdefence: 'Point Defence',
  shieldbooster: 'Shield Booster',
  crimeslicer: 'Scanner Disruptor',
  xenoscanner: 'Xeno Scanner',
  shutdownfieldneutraliser: 'Shutdown Field Neutraliser',
  mining_lance: 'Mining Lance',
  cargorack: 'Cargo Rack',
  largecargorack: 'Large Cargo Rack',
  fuelscoop: 'Fuel Scoop',
  shieldgenerator: 'Shield Generator',
  shieldcellbank: 'Shield Cell Bank',
  hullreinforcement: 'Hull Reinforcement',
  modulereinforcement: 'Module Reinforcement',
  dockingcomputer: 'Docking Computer',
  supercruiseassist: 'Supercruise Assist',
  fsdinterdictor: 'FSD Interdictor',
  refinery: 'Refinery',
  collection: 'Collector Limpet Ctrl',
  fueltransfer: 'Fuel Transfer Limpet Ctrl',
  repair: 'Repair Limpet Ctrl',
  prospector: 'Prospector Limpet Ctrl',
  decontamination: 'Decontamination Limpet Ctrl',
  passengercabin: 'Passenger Cabin',
  autofieldmaintenance: 'Auto Field-Maintenance',
  corrosionproofcargorack: 'Corrosion Resistant Cargo Rack',
  detailedsurfacescanner: 'Detailed Surface Scanner',
  fsssampler: 'FSS',
  buggybay: 'Planetary Vehicle Hangar',
  fighterbay: 'Fighter Hangar',
  mrascanner: 'Pulse Wave Analyser',
};

const MOUNT_LABEL = { turret: 'Turret', gimbal: 'Gimballed', fixed: 'Fixed' };

// Tipo de ingeniería: BlueprintName llega como "<Categoria>_<Modificador>"
// (p.ej. "Armour_HeavyDuty", "FSD_LongRange") -- se traduce solo la parte
// del MODIFICADOR (la categoría ya se ve por el propio módulo). Cubre los
// modificadores más comunes del juego; cualquiera no listado cae al
// fallback (separar por mayúscula y capitalizar), igual que WORD_DICT.
const BLUEPRINT_DICT = {
  heavyduty: 'Heavy Duty',
  lightweight: 'Lightweight',
  boosted: 'Boosted',
  overcharged: 'Overcharged',
  dirty: 'Dirty',
  clean: 'Clean',
  longrange: 'Long Range',
  priorityengines: 'Engine Focused',
  prioritysystems: 'System Focused',
  priorityweapons: 'Weapon Focused',
  efficient: 'Efficient',
  efficiency: 'Efficiency',
  reinforced: 'Reinforced',
  increasedcapacity: 'Increased Capacity',
  focused: 'Focused',
  rapidfire: 'Rapid Fire',
  doubleshot: 'Double Shot',
  highcapacity: 'High Capacity',
  lownoise: 'Low Emissions',
  stealth: 'Stealth',
  shielded: 'Shielded',
  restorative: 'Restorative',
  resistive: 'Resistive',
  kinetic: 'Kinetic Resistant',
  thermalresistant: 'Thermal Resistant',
  thermal: 'Thermal',
  chargeenhanced: 'Charge Enhanced',
  fastercharge: 'Faster Charge',
  armoured: 'Armoured',
  overloaded: 'Overloaded',
  deepplating: 'Deep Plating',
  chargecapacity: 'Charge Capacity',
  fastboot: 'Fast Boot',
};

function titleFallback(token) {
  if (!token) return '';
  return token.charAt(0).toUpperCase() + token.slice(1);
}

/** "Armour_HeavyDuty" / "FSD_LongRange_1" -> "Resistente" / "Largo Alcance" (fallback: "Long Range"). */
function decodeBlueprintType(blueprintName) {
  if (!blueprintName) return '';
  // quita el primer token (categoría del módulo, no aporta nada nuevo aquí)
  // y cualquier sufijo numérico suelto (a veces el propio juego añade "_1").
  const parts = String(blueprintName).split('_').filter(Boolean);
  const rest = parts.slice(1).filter((t) => !/^\d+$/.test(t));
  if (!rest.length) return titleFallback(parts[0] || '');
  const full = rest.join('').toLowerCase();
  if (BLUEPRINT_DICT[full]) return BLUEPRINT_DICT[full];
  // separa CamelCase en palabras para el fallback ("LongRange" -> "Long Range")
  const words = rest.map((t) => t.replace(/([a-z])([A-Z])/g, '$1 $2'));
  return words.map(titleFallback).join(' ');
}

function titleFallbackToken(token) {
  if (!token) return '';
  return token.charAt(0).toUpperCase() + token.slice(1);
}

function decodeItemName(item) {
  if (!item) return '';
  let s = String(item).toLowerCase();
  s = s.replace(/^(int_|hpt_)/, '');
  s = s.replace(/_size\d+/, '').replace(/_class\d+/, '').replace(/_grade\d+/, '')
    .replace(/_(tiny|small|medium|large|huge)$/, '');

  let mount = '';
  const mountMatch = s.match(/_(fixed|gimbal|turret)(?:_|$)/);
  if (mountMatch) {
    mount = mountMatch[1];
    s = s.replace(`_${mountMatch[1]}`, '');
  }

  const tokens = s.split('_').filter(Boolean);
  const full = tokens.join('_');
  let label = WORD_DICT[full];
  if (!label) {
    for (const t of tokens) {
      if (WORD_DICT[t]) { label = WORD_DICT[t]; break; }
    }
  }
  if (!label) label = tokens.map(titleFallbackToken).join(' ');
  if (mount && MOUNT_LABEL[mount]) label += ` (${MOUNT_LABEL[mount]})`;
  return label;
}

function decodeSizeClass(item, fallbackSize) {
  if (!item) return fallbackSize ? String(fallbackSize) : '';
  const s = String(item).toLowerCase();
  const szMatch = s.match(/_size(\d+)/);
  const clMatch = s.match(/_class(\d+)/);
  const size = szMatch ? szMatch[1] : fallbackSize;
  if (!size) return '';
  const cls = clMatch ? (CLASS_LETTER[clMatch[1]] || clMatch[1]) : '';
  return `${size}${cls}`;
}

/** Texto nativo (2-3 líneas, \n literal) + booleano "ingenierizado" para UN slot con módulo real. */
function moduleSlotText(badge, name, off, engineering) {
  let line1 = badge ? `${badge}  ${name}` : name;
  if (off) line1 += '  [OFF]';
  if (!engineering || !engineering.Level) {
    return { text: line1, engineered: false };
  }
  const plus = engineering.ExperimentalEffect ? '+' : '';
  const type = decodeBlueprintType(engineering.BlueprintName);
  let line2 = `🔧 G${engineering.Level}${plus}`;
  if (type) line2 += `  ${type}`;
  const lines = [line1, line2];
  const effect = engineering.ExperimentalEffect_Localised;
  if (effect) lines.push(effect);
  return { text: lines.join('\n'), engineered: true };
}

const EMPTY_SLOT = { text: '— empty —', engineered: false };

/**
 * Clasifica el array "Modules" de un Loadout en slots FIJOS por categoría
 * (8 hardpoints, 8 utilidad, 8 core, 14 opcionales), cada uno con
 * {text, engineered} listo para un AUTO_UPDATE_EVENT + CHANGE_BUTTON_VISUALS
 * por módulo. Los slots que la nave no usa quedan como EMPTY_SLOT (nunca
 * datos inventados).
 */
function buildLoadoutSlots(modules) {
  const hpList = [];
  const utList = [];
  const core = {};
  const optList = [];

  for (const m of modules || []) {
    const slot = m.Slot;
    if (!slot || !m.Item) continue;
    let mm;
    if ((mm = slot.match(HARDPOINT_RE))) {
      hpList.push({ size: mm[1], idx: Number(mm[2]), m });
    } else if (UTILITY_RE.test(slot)) {
      utList.push({ m });
    } else if (CORE_SLOT_LABELS[slot]) {
      core[slot] = m;
    } else if ((mm = slot.match(OPTIONAL_RE))) {
      // El tamaño para ordenar se saca del propio "Item" (siempre trae
      // "_sizeN", incluso en slots "CargoNN"/"MilitaryNN" que no lo declaran
      // en el nombre del slot) -- el grupo del slot ("Slot(\d+)_Size(\d+)")
      // solo se usa como último recurso si el Item no lo trajera.
      const itemSizeMatch = String(m.Item || '').toLowerCase().match(/_size(\d+)/);
      const slotSize = itemSizeMatch ? Number(itemSizeMatch[1]) : Number(mm[2] || 0);
      optList.push({ size: slotSize, m });
    }
  }

  hpList.sort((a, b) => (HARDPOINT_SIZE_ORDER[a.size] - HARDPOINT_SIZE_ORDER[b.size]) || (a.idx - b.idx));
  optList.sort((a, b) => b.size - a.size);

  const hardpoints = new Array(8).fill(null).map((_, i) => {
    const e = hpList[i];
    if (!e) return EMPTY_SLOT;
    const badge = HP_SIZE_LETTER[e.size] || '';
    return moduleSlotText(badge, decodeItemName(e.m.Item), e.m.On === false, e.m.Engineering);
  });

  const utility = new Array(8).fill(null).map((_, i) => {
    const e = utList[i];
    if (!e) return EMPTY_SLOT;
    return moduleSlotText('T', decodeItemName(e.m.Item), e.m.On === false, e.m.Engineering);
  });

  const coreArr = CORE_ORDER.map((key) => {
    const m = core[key];
    if (!m) return EMPTY_SLOT;
    let sc;
    if (key === 'Armour') {
      const grMatch = String(m.Item).toLowerCase().match(/_grade(\d+)/);
      sc = grMatch ? `T${grMatch[1]}` : '';
    } else {
      sc = decodeSizeClass(m.Item, null);
    }
    return moduleSlotText(sc, CORE_SLOT_LABELS[key], false, m.Engineering);
  });

  const optional = new Array(14).fill(null).map((_, i) => {
    const e = optList[i];
    if (!e) return EMPTY_SLOT;
    const sc = decodeSizeClass(e.m.Item, e.size);
    return moduleSlotText(sc, decodeItemName(e.m.Item), e.m.On === false, e.m.Engineering);
  });

  return { hardpoints, utility, core: coreArr, optional };
}

module.exports = { decodeItemName, decodeSizeClass, decodeBlueprintType, buildLoadoutSlots, CORE_ORDER };

/*
 * v4 (2026-09-18, misma tarde) -- el usuario vio las 4 páginas de tarjetas
 * y pidió lo contrario: UNA sola página "ED - Loadout", estilo lista densa
 * tipo Coriolis/Edsy (captura de referencia: 4 columnas -- CORE INTERNAL,
 * OPTIONAL INTERNAL, HARDPOINTS, UTILITY MOUNTS -- cada módulo en una
 * línea, con un icono de tuerca + un número pequeño a la derecha del
 * nombre cuando está ingenierizado, indicando el grado) pero con los
 * colores del proyecto (cian/negro), no el naranja de la captura.
 *
 * `buildLoadoutColumns` genera esas 4 listas de texto (una línea por
 * módulo, "\n" literal) reutilizando la misma clasificación/decodificación
 * que `buildLoadoutSlots` -- la única diferencia es el formato de salida
 * (texto plano concatenado en vez de slots fijos con color individual,
 * porque esta vez el "de un vistazo" lo da la propia lista compacta, no
 * una tarjeta de color por módulo).
 */
function engTagInline(engineering) {
  if (!engineering || !engineering.Level) return '';
  const plus = engineering.ExperimentalEffect ? '+' : '';
  return `  ⚙${engineering.Level}${plus}`;
}

function buildLoadoutColumns(modules) {
  const hpList = [];
  const utList = [];
  const core = {};
  const optList = [];

  for (const m of modules || []) {
    const slot = m.Slot;
    if (!slot || !m.Item) continue;
    let mm;
    if ((mm = slot.match(HARDPOINT_RE))) {
      hpList.push({ size: mm[1], idx: Number(mm[2]), m });
    } else if (UTILITY_RE.test(slot)) {
      utList.push({ m });
    } else if (CORE_SLOT_LABELS[slot]) {
      core[slot] = m;
    } else if ((mm = slot.match(OPTIONAL_RE))) {
      const itemSizeMatch = String(m.Item || '').toLowerCase().match(/_size(\d+)/);
      const slotSize = itemSizeMatch ? Number(itemSizeMatch[1]) : Number(mm[2] || 0);
      optList.push({ size: slotSize, m });
    }
  }

  hpList.sort((a, b) => (HARDPOINT_SIZE_ORDER[a.size] - HARDPOINT_SIZE_ORDER[b.size]) || (a.idx - b.idx));
  optList.sort((a, b) => b.size - a.size);

  // Margen izquierdo (2026-09-18, a petición del usuario -- "alineraría el
  // texto a la izquierda con un margen para que estén alineados"): dos
  // espacios delante de cada línea (y de los textos de "vacío") para que,
  // combinado con el nuevo TA=4 (alineado a la izquierda) del .tml, el
  // texto no quede pegado al borde izquierdo del panel horneado.
  const MARGIN = '  ';
  const hpLines = hpList.map((e) => {
    const badge = HP_SIZE_LETTER[e.size] || '';
    const off = e.m.On === false ? '  [OFF]' : '';
    return `${MARGIN}${badge}  ${decodeItemName(e.m.Item)}${off}${engTagInline(e.m.Engineering)}`;
  });
  const utLines = utList.map((e) => {
    const off = e.m.On === false ? '  [OFF]' : '';
    return `${MARGIN}T  ${decodeItemName(e.m.Item)}${off}${engTagInline(e.m.Engineering)}`;
  });
  const coreLines = CORE_ORDER.filter((k) => core[k]).map((k) => {
    const m = core[k];
    let sc;
    if (k === 'Armour') {
      const grMatch = String(m.Item).toLowerCase().match(/_grade(\d+)/);
      sc = grMatch ? `T${grMatch[1]}` : '';
    } else {
      sc = decodeSizeClass(m.Item, null);
    }
    return `${MARGIN}${sc}  ${CORE_SLOT_LABELS[k]}${engTagInline(m.Engineering)}`;
  });
  const optLines = optList.map((e) => {
    const sc = decodeSizeClass(e.m.Item, e.size);
    return `${MARGIN}${sc}  ${decodeItemName(e.m.Item)}${engTagInline(e.m.Engineering)}`;
  });

  return {
    hardpoints: hpLines.length ? hpLines.join('\n') : `${MARGIN}None equipped`,
    utility: utLines.length ? utLines.join('\n') : `${MARGIN}None equipped`,
    core: coreLines.length ? coreLines.join('\n') : `${MARGIN}No data yet`,
    optional: optLines.length ? optLines.join('\n') : `${MARGIN}None equipped`,
  };
}

module.exports.buildLoadoutColumns = buildLoadoutColumns;
