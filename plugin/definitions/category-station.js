'use strict';

const CATEGORY_ID = 'ed.station';

const states = {
  lastEngineer: { id: 'ed.station.lastEngineer', desc: 'Last engineer visited/updated', default: '' },
  lastEngineerRank: { id: 'ed.station.lastEngineerRank', desc: 'Rank with that engineer', default: '' },
  lastBlueprintApplied: { id: 'ed.station.lastBlueprintApplied', desc: 'Last modification applied', default: '' },
  communityGoalName: { id: 'ed.station.communityGoalName', desc: 'Active Community Goal', default: '' },
  communityGoalContribution: { id: 'ed.station.communityGoalContribution', desc: 'Your Community Goal contribution', default: '0' },
  communityGoalPosition: { id: 'ed.station.communityGoalPosition', desc: 'Your Community Goal position', default: '0' },
};

const events = [
  { id: 'ed.station.event.blueprint', name: 'When an engineering modification is applied', format: 'Modification applied: $val', valueStateId: states.lastBlueprintApplied.id, valueType: 'text' },
  { id: 'ed.station.event.communityGoal', name: 'When the Community Goal updates', format: 'Community Goal: $val', valueStateId: states.communityGoalName.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Station / Engineers', states, events, actions: [] };
