'use strict';

const CATEGORY_ID = 'ed.carrier';

const states = {
  name: { id: 'ed.carrier.name', desc: 'Fleet Carrier name', default: '' },
  callsign: { id: 'ed.carrier.callsign', desc: 'Fleet Carrier callsign', default: '' },
  fuelLevel: { id: 'ed.carrier.fuelLevel', desc: 'Tritium level', default: '0' },
  balance: { id: 'ed.carrier.balance', desc: 'Fleet Carrier balance', default: '0' },
  jumpDestination: { id: 'ed.carrier.jumpDestination', desc: 'Next jump destination', default: '' },
  jumpTime: { id: 'ed.carrier.jumpTime', desc: 'Scheduled jump time (UTC)', default: '' },
  jumpScheduled: { id: 'ed.carrier.jumpScheduled', desc: 'Jump scheduled (pulse)', default: 'false' },
};

const events = [
  { id: 'ed.carrier.event.jumpScheduled', name: 'When a Fleet Carrier jump is scheduled', format: 'Carrier jump scheduled to: $val', valueStateId: states.jumpDestination.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Fleet Carrier', states, events, actions: [] };
