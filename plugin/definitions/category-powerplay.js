'use strict';

const CATEGORY_ID = 'ed.power';

const states = {
  status: { id: 'ed.power.status', desc: 'Powerplay tracker status', default: 'NO_DATA' },
  name: { id: 'ed.power.name', desc: 'Pledged Power', default: '' },
  color: { id: 'ed.power.color', desc: 'Power colour', default: '#f07b05' },
  rank: { id: 'ed.power.rank', desc: 'Current Powerplay rank', default: '0' },
  nextRank: { id: 'ed.power.nextRank', desc: 'Next Powerplay rank', default: '1' },
  totalMerits: { id: 'ed.power.totalMerits', desc: 'Total merits', default: '0' },
  gainedMerits: { id: 'ed.power.gainedMerits', desc: 'Merits gained since last reset', default: '0' },
  remainingMerits: { id: 'ed.power.remainingMerits', desc: 'Merits remaining to next rank', default: '0' },
  lastVoucherAmount: { id: 'ed.power.lastVoucherAmount', desc: 'Last Powerplay voucher amount', default: '0' },
};

const events = [
  { id: 'ed.power.event.rank', name: 'When the Powerplay Rank changes', format: 'Powerplay rank: $val', valueStateId: states.rank.id, valueType: 'text' },
  { id: 'ed.power.event.power', name: 'When the Power changes', format: 'Power: $val', valueStateId: states.name.id, valueType: 'text' },
  { id: 'ed.power.event.totalMerits', name: 'When Total Merits change', format: 'Total merits: $val', valueStateId: states.totalMerits.id, valueType: 'text' },
];

const actions = [
  { id: 'ed.power.action.resetMeritCounter', name: 'Powerplay: Reset merit counter', format: 'Powerplay: Reset gained merits counter' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Powerplay', states, events, actions };
