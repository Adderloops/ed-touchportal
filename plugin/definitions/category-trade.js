'use strict';

const CATEGORY_ID = 'ed.trade';

const states = {
  lastCommodity: { id: 'ed.trade.lastCommodity', desc: 'Last commodity traded', default: '' },
  lastAction: { id: 'ed.trade.lastAction', desc: 'Last action (Buy/Sell)', default: '' },
  lastQty: { id: 'ed.trade.lastQty', desc: 'Last trade quantity', default: '0' },
  sessionProfit: { id: 'ed.trade.sessionProfit', desc: 'Trade profit this session (approx.)', default: '0' },
  lastMiningMaterial: { id: 'ed.trade.lastMiningMaterial', desc: 'Last refined material (mining)', default: '' },
  sessionMiningCount: { id: 'ed.trade.sessionMiningCount', desc: 'Materials refined this session', default: '0' },
  lastCargoCollected: { id: 'ed.trade.lastCargoCollected', desc: 'Last cargo collected', default: '' },
  lastMaterialCollected: { id: 'ed.trade.lastMaterialCollected', desc: 'Last raw material collected (SRV/on foot)', default: '' },
  shipCargoList: { id: 'ed.trade.shipCargoList', desc: 'Live ship cargo hold contents', default: 'No data yet (board your ship or move cargo)' },
  shipCargoCount: { id: 'ed.trade.shipCargoCount', desc: 'Total units in the ship cargo hold', default: '0' },
  shipCargoCapacity: { id: 'ed.trade.shipCargoCapacity', desc: 'Ship cargo capacity (t), from the last Loadout', default: '' },
  srvCargoList: { id: 'ed.trade.srvCargoList', desc: 'Live SRV cargo hold contents', default: 'No data yet (board the SRV or move cargo)' },
  srvCargoCount: { id: 'ed.trade.srvCargoCount', desc: 'Total units in the SRV cargo hold', default: '0' },
  srvCargoCapacity: { id: 'ed.trade.srvCargoCapacity', desc: 'Active SRV cargo capacity (t), by vehicle type', default: '' },
};

const events = [
  { id: 'ed.trade.event.commodity', name: 'When a commodity is bought or sold', format: '$val', valueStateId: states.lastCommodity.id, valueType: 'text' },
  { id: 'ed.trade.event.mining', name: 'When a mined material is refined', format: 'Refined: $val', valueStateId: states.lastMiningMaterial.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Trade / Mining', states, events, actions: [] };
