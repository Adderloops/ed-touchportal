'use strict';

const defs = require('../../definitions/category-missions');

module.exports = function registerMissionsHandlers(router, ctx) {
  const { state, session } = ctx;

  const refreshActiveCount = () => state.set(defs.states.activeCount.id, session.activeMissionIds.size);

  router.on('MissionAccepted', (e) => {
    session.activeMissionIds.add(e.MissionID);
    state.set(defs.states.lastAccepted.id, e.Name_Localised || e.Name);
    refreshActiveCount();
  });

  router.on('MissionCompleted', (e) => {
    session.activeMissionIds.delete(e.MissionID);
    session.missions.completed += 1;
    state.setMany([
      { id: defs.states.lastCompleted.id, value: e.Name_Localised || e.Name },
      { id: defs.states.completedSession.id, value: session.missions.completed },
    ]);
    refreshActiveCount();
  });

  router.on('MissionFailed', (e) => {
    session.activeMissionIds.delete(e.MissionID);
    session.missions.failed += 1;
    state.setMany([
      { id: defs.states.lastFailed.id, value: e.Name_Localised || e.Name },
      { id: defs.states.failedSession.id, value: session.missions.failed },
    ]);
    refreshActiveCount();
  });

  router.on('MissionAbandoned', (e) => {
    session.activeMissionIds.delete(e.MissionID);
    refreshActiveCount();
  });
};
