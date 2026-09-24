'use strict';

const CATEGORY_ID = 'ed.cmdr';

const states = {
  name: { id: 'ed.cmdr.name', desc: 'Commander name', default: '' },
  credits: { id: 'ed.cmdr.credits', desc: 'Credits (approximate, see README)', default: '0' },
  combatRank: { id: 'ed.cmdr.combatRank', desc: 'Combat rank', default: 'Harmless' },
  tradeRank: { id: 'ed.cmdr.tradeRank', desc: 'Trade rank', default: 'Penniless' },
  exploRank: { id: 'ed.cmdr.exploRank', desc: 'Exploration rank', default: 'Aimless' },
  cqcRank: { id: 'ed.cmdr.cqcRank', desc: 'CQC rank', default: 'Helpless' },
  federationRank: { id: 'ed.cmdr.federationRank', desc: 'Federation rank', default: 'None' },
  empireRank: { id: 'ed.cmdr.empireRank', desc: 'Empire rank', default: 'None' },
  reputationFederation: { id: 'ed.cmdr.reputationFederation', desc: 'Federation reputation (-100..100)', default: '0' },
  reputationEmpire: { id: 'ed.cmdr.reputationEmpire', desc: 'Empire reputation (-100..100)', default: '0' },
  reputationAlliance: { id: 'ed.cmdr.reputationAlliance', desc: 'Alliance reputation (-100..100)', default: '0' },
  reputationIndependent: { id: 'ed.cmdr.reputationIndependent', desc: 'Independent reputation (-100..100)', default: '0' },
  shipType: { id: 'ed.cmdr.shipType', desc: 'Current ship type', default: '' },
  shipName: { id: 'ed.cmdr.shipName', desc: 'Current ship name', default: '' },
  shipIdent: { id: 'ed.cmdr.shipIdent', desc: 'Current ship ID', default: '' },
  fuelCapacityMain: { id: 'ed.cmdr.fuelCapacityMain', desc: 'Main tank capacity (t)', default: '0' },
  fuelCapacityReserve: { id: 'ed.cmdr.fuelCapacityReserve', desc: 'Reservoir capacity (t)', default: '0' },
};

const events = [
  { id: 'ed.cmdr.event.shipType', name: 'When the Ship Type changes', format: 'When the ship becomes $val', valueStateId: states.shipType.id, valueType: 'text' },
  { id: 'ed.cmdr.event.combatRank', name: 'When the Combat Rank changes', format: 'When the Combat Rank becomes $val', valueStateId: states.combatRank.id, valueType: 'text' },
  { id: 'ed.cmdr.event.tradeRank', name: 'When the Trade Rank changes', format: 'When the Trade Rank becomes $val', valueStateId: states.tradeRank.id, valueType: 'text' },
  { id: 'ed.cmdr.event.exploRank', name: 'When the Exploration Rank changes', format: 'When the Exploration Rank becomes $val', valueStateId: states.exploRank.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'CMDR / Pilot', states, events, actions: [] };
