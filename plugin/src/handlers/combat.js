'use strict';

const defs = require('../../definitions/category-combat');
const { formatThousands } = require('../services/format');

module.exports = function registerCombatHandlers(router, ctx) {
  const { state, session } = ctx;

  router.on('UnderAttack', (e) => {
    state.pulse(defs.states.isUnderAttack.id, e.Target || 'true', 'false', 800);
  });

  router.on('Interdicted', (e) => {
    state.set(defs.states.lastInterdictorName.id, e.Interdictor_Localised || e.Interdictor || '');
    state.pulse(defs.states.isInterdicted.id, 'true');
  });

  router.on('EscapeInterdiction', () => {
    state.pulse(defs.states.escapedInterdiction.id, 'true');
  });

  router.on('Bounty', (e) => {
    const amount = e.TotalReward !== undefined ? e.TotalReward : e.Reward;
    state.set(defs.states.lastBountyAmount.id, formatThousands(amount));
    state.set(defs.states.lastBountyFaction.id, e.VictimFaction || '');
    session.combat.bountyTotal += amount || 0;
    state.set(defs.states.sessionBountyTotal.id, formatThousands(session.combat.bountyTotal));
  });

  router.on('FactionKillBond', (e) => {
    state.set(defs.states.lastKillbondAmount.id, formatThousands(e.Reward));
  });

  router.on('CapShipBond', (e) => {
    state.set(defs.states.lastKillbondAmount.id, formatThousands(e.Reward));
  });

  router.on('Died', (e) => {
    session.combat.deaths += 1;
    state.set(defs.states.deathsSession.id, session.combat.deaths);
    const killer = e.KillerName_Localised || e.KillerName || (Array.isArray(e.Killers) ? e.Killers.map((k) => k.Name_Localised || k.Name).join(', ') : 'unknown');
    state.pulse(defs.states.lastDiedKilledBy.id, killer, '', 5000);
  });

  router.on('HullDamage', (e) => {
    if (e.Health !== undefined) {
      state.set(defs.states.hullHealthPercent.id, Math.round(e.Health * 100));
    }
  });

  router.on('HeatWarning', () => state.pulse(defs.states.heatWarning.id, 'true'));

  router.on('ShieldState', (e) => {
    if (e.ShieldsUp === false) state.pulse(defs.states.shieldsDown.id, 'true');
  });

  router.on('ShipTargeted', (e) => {
    if (e.TargetLocked === false) {
      state.set(defs.states.targetName.id, '');
      state.set(defs.states.targetShip.id, '');
      return;
    }
    if (e.PilotName_Localised || e.PilotName) {
      state.set(defs.states.targetName.id, e.PilotName_Localised || e.PilotName);
    }
    if (e.Ship_Localised || e.Ship) {
      state.set(defs.states.targetShip.id, e.Ship_Localised || e.Ship);
    }
  });

  router.on('FighterDestroyed', () => state.pulse(defs.states.fighterDestroyed.id, 'true'));
};
