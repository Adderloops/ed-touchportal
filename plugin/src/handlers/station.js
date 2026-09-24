'use strict';

const defs = require('../../definitions/category-station');

module.exports = function registerStationHandlers(router, ctx) {
  const { state } = ctx;

  router.on('EngineerProgress', (e) => {
    if (e.Engineer) {
      state.setMany([
        { id: defs.states.lastEngineer.id, value: e.Engineer },
        { id: defs.states.lastEngineerRank.id, value: e.Rank !== undefined ? e.Rank : e.Progress },
      ]);
    }
  });

  router.on('EngineerCraft', (e) => {
    state.pulse(defs.states.lastBlueprintApplied.id, `${e.Blueprint_Localised || e.Blueprint} (grade ${e.Level})`, '', 8000);
  });

  router.on('CommunityGoal', (e) => {
    if (Array.isArray(e.CurrentGoals) && e.CurrentGoals.length > 0) {
      const goal = e.CurrentGoals[0];
      state.setMany([
        { id: defs.states.communityGoalName.id, value: goal.Title },
        { id: defs.states.communityGoalContribution.id, value: goal.PlayerContribution },
        { id: defs.states.communityGoalPosition.id, value: goal.PlayerPercentileBand },
      ]);
    }
  });
};
