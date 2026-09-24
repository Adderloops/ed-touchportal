'use strict';

const defs = require('../../definitions/category-squadron');

const SQUADRON_EVENTS = [
  'SquadronStartup',
  'SquadronCreated',
  'JoinedSquadron',
  'LeftSquadron',
  'KickedFromSquadron',
  'DisbandedSquadron',
  'SquadronPromotion',
  'SquadronDemotion',
  'InvitedToSquadron',
  'AppliedToSquadron',
  'WonATrophyForSquadron',
];

module.exports = function registerSquadronHandlers(router, ctx) {
  const { state } = ctx;

  router.on('SquadronStartup', (e) => {
    state.setMany([
      { id: defs.states.name.id, value: e.SquadronName },
      { id: defs.states.rank.id, value: e.CurrentRank },
    ]);
  });

  for (const eventName of SQUADRON_EVENTS) {
    router.on(eventName, (e) => {
      const label = e.SquadronName ? `${eventName}: ${e.SquadronName}` : eventName;
      state.pulse(defs.states.lastEvent.id, label, '', 8000);
      if (e.SquadronName) state.set(defs.states.name.id, e.SquadronName);
      if (e.NewRank !== undefined) state.set(defs.states.rank.id, e.NewRank);
    });
  }
};
