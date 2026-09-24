'use strict';

const defs = require('../../definitions/category-carrier');
const { formatThousands } = require('../services/format');

module.exports = function registerCarrierHandlers(router, ctx) {
  const { state } = ctx;

  router.on('CarrierStats', (e) => {
    state.setMany([
      { id: defs.states.name.id, value: e.Name },
      { id: defs.states.callsign.id, value: e.Callsign },
      { id: defs.states.fuelLevel.id, value: e.FuelLevel },
      { id: defs.states.balance.id, value: e.Finance ? formatThousands(e.Finance.CarrierBalance) : undefined },
    ]);
  });

  router.on('CarrierJumpRequest', (e) => {
    state.setMany([
      { id: defs.states.jumpDestination.id, value: e.SystemName || e.BodyName },
      { id: defs.states.jumpTime.id, value: e.DepartureTime },
    ]);
    state.pulse(defs.states.jumpScheduled.id, 'true', 'false', 5000);
  });

  router.on('CarrierJumpCancelled', () => {
    state.setMany([
      { id: defs.states.jumpDestination.id, value: '' },
      { id: defs.states.jumpTime.id, value: '' },
    ]);
  });

  router.on('CarrierJump', (e) => {
    state.set(defs.states.jumpDestination.id, '');
    state.set(defs.states.jumpTime.id, '');
  });
};
