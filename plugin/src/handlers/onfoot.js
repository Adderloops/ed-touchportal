'use strict';

const defs = require('../../definitions/category-onfoot');

module.exports = function registerOnFootHandlers(router, ctx) {
  const { state } = ctx;

  router.on('SwitchSuitLoadout', (e) => {
    state.set(defs.states.suitName.id, e.SuitName_Localised || e.SuitName);
  });

  router.on('BackpackChange', (e) => {
    const added = Array.isArray(e.Added) && e.Added.length > 0 ? e.Added[0] : null;
    const removed = Array.isArray(e.Removed) && e.Removed.length > 0 ? e.Removed[0] : null;
    const item = added || removed;
    if (item) {
      const label = `${added ? '+' : '-'}${item.Name_Localised || item.Name}`;
      state.pulse(defs.states.lastBackpackItem.id, label, '', 5000);
    }
  });

  router.on('ScanOrganic', (e) => {
    state.setMany([
      { id: defs.states.lastOrganicScanned.id, value: e.Species_Localised || e.Species },
      { id: defs.states.lastOrganicStage.id, value: e.ScanType },
    ]);
  });

  router.on('Embark', () => state.pulse(defs.states.isEmbarked.id, 'true'));
  router.on('Disembark', () => state.pulse(defs.states.isEmbarked.id, 'false', 'false', 1));
};
