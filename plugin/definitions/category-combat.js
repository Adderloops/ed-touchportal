'use strict';

const CATEGORY_ID = 'ed.combat';

const states = {
  isUnderAttack: { id: 'ed.combat.isUnderAttack', desc: 'Under attack (pulse)', default: 'false' },
  isInterdicted: { id: 'ed.combat.isInterdicted', desc: 'Being interdicted (pulse)', default: 'false' },
  lastInterdictorName: { id: 'ed.combat.lastInterdictorName', desc: 'Last interdictor', default: '' },
  escapedInterdiction: { id: 'ed.combat.escapedInterdiction', desc: 'Interdiction escaped (pulse)', default: 'false' },
  lastBountyAmount: { id: 'ed.combat.lastBountyAmount', desc: 'Last bounty amount', default: '0' },
  lastBountyFaction: { id: 'ed.combat.lastBountyFaction', desc: 'Last bounty faction', default: '' },
  sessionBountyTotal: { id: 'ed.combat.sessionBountyTotal', desc: 'Bounty total this session', default: '0' },
  lastKillbondAmount: { id: 'ed.combat.lastKillbondAmount', desc: 'Last combat bond amount', default: '0' },
  deathsSession: { id: 'ed.combat.deathsSession', desc: 'Deaths this session', default: '0' },
  lastDiedKilledBy: { id: 'ed.combat.lastDiedKilledBy', desc: 'Last death caused by', default: '' },
  hullHealthPercent: { id: 'ed.combat.hullHealthPercent', desc: 'Last reported hull health %', default: '100' },
  heatWarning: { id: 'ed.combat.heatWarning', desc: 'Heat warning (pulse)', default: 'false' },
  shieldsDown: { id: 'ed.combat.shieldsDown', desc: 'Shields down (pulse)', default: 'false' },
  targetName: { id: 'ed.combat.targetName', desc: 'Target name', default: '' },
  targetShip: { id: 'ed.combat.targetShip', desc: 'Target ship type', default: '' },
  fighterDestroyed: { id: 'ed.combat.fighterDestroyed', desc: 'Fighter destroyed (pulse)', default: 'false' },
};

const events = [
  { id: 'ed.combat.event.isUnderAttack', name: 'When under attack', format: 'Under attack: $val', valueStateId: states.isUnderAttack.id, valueType: 'text' },
  { id: 'ed.combat.event.isInterdicted', name: 'When interdicted', format: 'Interdicted: $val', valueStateId: states.isInterdicted.id, valueType: 'choice', valueChoices: ['true', 'false'] },
  { id: 'ed.combat.event.bounty', name: 'When a bounty is awarded', format: 'Bounty awarded: $val', valueStateId: states.lastBountyAmount.id, valueType: 'text' },
  { id: 'ed.combat.event.died', name: 'When you die', format: 'You died (killed by: $val)', valueStateId: states.lastDiedKilledBy.id, valueType: 'text' },
  { id: 'ed.combat.event.heatWarning', name: 'When there is a heat warning', format: 'Heat warning: $val', valueStateId: states.heatWarning.id, valueType: 'choice', valueChoices: ['true', 'false'] },
  { id: 'ed.combat.event.shieldsDown', name: 'When shields go down', format: 'Shields down: $val', valueStateId: states.shieldsDown.id, valueType: 'choice', valueChoices: ['true', 'false'] },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Combat', states, events, actions: [] };
