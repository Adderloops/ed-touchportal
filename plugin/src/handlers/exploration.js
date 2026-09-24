'use strict';

const defs = require('../../definitions/category-exploration');

module.exports = function registerExplorationHandlers(router, ctx) {
  const { state, session } = ctx;

  router.on('FSSDiscoveryScan', (e) => {
    state.set(defs.states.bodiesInSystem.id, e.BodyCount);
  });

  router.on('FSSAllBodiesFound', () => {
    state.pulse(defs.states.allBodiesFound.id, 'true', 'false', 3000);
  });

  router.on('Scan', (e) => {
    session.exploration.scans += 1;
    state.setMany([
      { id: defs.states.lastScannedBody.id, value: e.BodyName },
      { id: defs.states.lastScannedBodyType.id, value: e.StarType || e.PlanetClass || '' },
      { id: defs.states.sessionScansCount.id, value: session.exploration.scans },
    ]);
  });

  router.on('SAAScanComplete', (e) => {
    state.set(defs.states.lastMappedBody.id, e.BodyName);
  });

  router.on('MaterialCollected', (e) => {
    state.set(defs.states.lastMaterialCollected.id, e.Name_Localised || e.Name);
  });

  router.on('CodexEntry', (e) => {
    state.pulse(defs.states.lastCodexEntry.id, e.Name_Localised || e.Name, '', 8000);
  });

  const addExplorationEarnings = (e) => {
    const total = e.TotalEarnings || 0;
    session.exploration.dataSoldCredits += total;
    state.set(defs.states.explorationDataSoldSession.id, session.exploration.dataSoldCredits);
  };
  router.on('SellExplorationData', addExplorationEarnings);
  router.on('MultiSellExplorationData', addExplorationEarnings);
};
