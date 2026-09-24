'use strict';

const CATEGORY_ID = 'ed.missions';

const states = {
  activeCount: { id: 'ed.missions.activeCount', desc: 'Active missions', default: '0' },
  lastAccepted: { id: 'ed.missions.lastAccepted', desc: 'Last accepted mission', default: '' },
  lastCompleted: { id: 'ed.missions.lastCompleted', desc: 'Last completed mission', default: '' },
  lastFailed: { id: 'ed.missions.lastFailed', desc: 'Last failed mission', default: '' },
  completedSession: { id: 'ed.missions.completedSession', desc: 'Missions completed this session', default: '0' },
  failedSession: { id: 'ed.missions.failedSession', desc: 'Missions failed this session', default: '0' },
};

const events = [
  { id: 'ed.missions.event.accepted', name: 'When a mission is accepted', format: 'Mission accepted: $val', valueStateId: states.lastAccepted.id, valueType: 'text' },
  { id: 'ed.missions.event.completed', name: 'When a mission is completed', format: 'Mission completed: $val', valueStateId: states.lastCompleted.id, valueType: 'text' },
  { id: 'ed.missions.event.failed', name: 'When a mission fails', format: 'Mission failed: $val', valueStateId: states.lastFailed.id, valueType: 'text' },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Missions', states, events, actions: [] };
