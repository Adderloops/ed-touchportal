'use strict';

const CATEGORY_ID = 'ed.explo';

const states = {
  bodiesInSystem: { id: 'ed.explo.bodiesInSystem', desc: 'Bodies detected in system (FSS)', default: '0' },
  allBodiesFound: { id: 'ed.explo.allBodiesFound', desc: 'All bodies found (pulse)', default: 'false' },
  lastScannedBody: { id: 'ed.explo.lastScannedBody', desc: 'Last scanned body', default: '' },
  lastScannedBodyType: { id: 'ed.explo.lastScannedBodyType', desc: 'Last scanned body type', default: '' },
  lastMaterialCollected: { id: 'ed.explo.lastMaterialCollected', desc: 'Last material collected', default: '' },
  sessionScansCount: { id: 'ed.explo.sessionScansCount', desc: 'Scans this session', default: '0' },
  lastCodexEntry: { id: 'ed.explo.lastCodexEntry', desc: 'Last Codex entry discovered', default: '' },
  explorationDataSoldSession: { id: 'ed.explo.explorationDataSoldSession', desc: 'Exploration data sold (credits, session)', default: '0' },
  lastMappedBody: { id: 'ed.explo.lastMappedBody', desc: 'Last mapped body (SAA)', default: '' },
};

const events = [
  { id: 'ed.explo.event.scan', name: 'When a body is scanned', format: 'Scanned: $val', valueStateId: states.lastScannedBody.id, valueType: 'text' },
  { id: 'ed.explo.event.allBodiesFound', name: 'When the system is fully scanned (FSS)', format: 'System complete: $val', valueStateId: states.allBodiesFound.id, valueType: 'choice', valueChoices: ['true', 'false'] },
  { id: 'ed.explo.event.codex', name: 'When a Codex entry is discovered', format: 'New Codex entry: $val', valueStateId: states.lastCodexEntry.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Exploration', states, events, actions: [] };
