'use strict';

const defs = require('../../definitions/category-nav');
const { formatThousands } = require('../services/format');

module.exports = function registerNavHandlers(router, ctx) {
  const { state } = ctx;

  router.on('Location', (e) => {
    state.setMany([
      { id: defs.states.currentSystem.id, value: e.StarSystem },
      { id: defs.states.currentBody.id, value: e.Body },
      { id: defs.states.systemAllegiance.id, value: e.SystemAllegiance },
      { id: defs.states.systemGovernment.id, value: e.SystemGovernment_Localised || e.SystemGovernment },
      { id: defs.states.systemEconomy.id, value: e.SystemEconomy_Localised || e.SystemEconomy },
      { id: defs.states.systemSecurity.id, value: e.SystemSecurity_Localised || e.SystemSecurity },
      { id: defs.states.population.id, value: formatThousands(e.Population) },
    ]);
  });

  router.on('FSDJump', (e) => {
    state.setMany([
      { id: defs.states.currentSystem.id, value: e.StarSystem },
      { id: defs.states.systemAllegiance.id, value: e.SystemAllegiance },
      { id: defs.states.systemGovernment.id, value: e.SystemGovernment_Localised || e.SystemGovernment },
      { id: defs.states.systemEconomy.id, value: e.SystemEconomy_Localised || e.SystemEconomy },
      { id: defs.states.systemSecurity.id, value: e.SystemSecurity_Localised || e.SystemSecurity },
      { id: defs.states.population.id, value: formatThousands(e.Population) },
      { id: defs.states.lastJumpDistance.id, value: e.JumpDist },
      { id: defs.states.lastJumpFuelUsed.id, value: e.FuelUsed },
    ]);
    state.pulse(defs.states.isJumping.id, 'false', 'false', 1); // asegura reset si venía de StartJump
  });

  router.on('Docked', (e) => {
    state.setMany([
      { id: defs.states.currentBody.id, value: e.StationName },
      { id: defs.states.dockingRequestStatus.id, value: '' },
      { id: defs.states.dockingGrantedPad.id, value: '' },
    ]);
  });

  router.on('DockingRequested', () => state.set(defs.states.dockingRequestStatus.id, 'Requested'));
  router.on('DockingCancelled', () => state.pulse(defs.states.dockingRequestStatus.id, 'Cancelled', '', 10000));
  router.on('DockingDenied', () => state.pulse(defs.states.dockingRequestStatus.id, 'Denied', '', 10000));
  router.on('DockingTimeout', () => state.pulse(defs.states.dockingRequestStatus.id, 'Timeout', '', 10000));
  router.on('DockingGranted', (e) => {
    state.set(defs.states.dockingGrantedPad.id, e.LandingPad);
    state.set(defs.states.dockingRequestStatus.id, 'Granted');
  });

  router.on('FSDTarget', (e) => {
    state.setMany([
      { id: defs.states.nextSystem.id, value: e.Name },
      { id: defs.states.jumpsRemaining.id, value: e.RemainingJumpsInRoute },
    ]);
  });

  router.on('StartJump', (e) => {
    state.set(defs.states.jumpType.id, e.JumpType);
    state.pulse(defs.states.isJumping.id, 'true', 'false', 60000);
  });

  router.on('Touchdown', () => state.pulse(defs.states.isTouchdown.id, 'true'));
  router.on('Liftoff', () => state.pulse(defs.states.isLiftoff.id, 'true'));
};
