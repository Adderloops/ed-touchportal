'use strict';

const CATEGORY_ID = 'ed.squadron';

const states = {
  name: { id: 'ed.squadron.name', desc: 'Squadron name', default: '' },
  rank: { id: 'ed.squadron.rank', desc: 'Squadron rank', default: '' },
  lastEvent: { id: 'ed.squadron.lastEvent', desc: 'Last Squadron event', default: '' },
};

const events = [
  { id: 'ed.squadron.event.lastEvent', name: 'When a Squadron event occurs', format: 'Squadron: $val', valueStateId: states.lastEvent.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Squadron', states, events, actions: [] };
