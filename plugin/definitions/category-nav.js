'use strict';

const CATEGORY_ID = 'ed.nav';

const states = {
  currentSystem: { id: 'ed.nav.currentSystem', desc: 'Current system', default: '' },
  currentBody: { id: 'ed.nav.currentBody', desc: 'Current body/station', default: '' },
  starClass: { id: 'ed.nav.starClass', desc: 'Main star class', default: '' },
  systemSecurity: { id: 'ed.nav.systemSecurity', desc: 'System security', default: '' },
  systemAllegiance: { id: 'ed.nav.systemAllegiance', desc: 'System allegiance', default: '' },
  systemGovernment: { id: 'ed.nav.systemGovernment', desc: 'System government', default: '' },
  systemEconomy: { id: 'ed.nav.systemEconomy', desc: 'System economy', default: '' },
  population: { id: 'ed.nav.population', desc: 'System population', default: '0' },
  nextSystem: { id: 'ed.nav.nextSystem', desc: 'Next destination on the route', default: '' },
  jumpsRemaining: { id: 'ed.nav.jumpsRemaining', desc: 'Jumps remaining on the plotted route', default: '0' },
  lastJumpDistance: { id: 'ed.nav.lastJumpDistance', desc: 'Distance of the last jump (ly)', default: '0' },
  lastJumpFuelUsed: { id: 'ed.nav.lastJumpFuelUsed', desc: 'Fuel used in the last jump (t)', default: '0' },
  isJumping: { id: 'ed.nav.isJumping', desc: 'Jumping right now (pulse)', default: 'false' },
  jumpType: { id: 'ed.nav.jumpType', desc: 'Type of jump started (Hyperspace/Supercruise)', default: '' },
  dockingRequestStatus: { id: 'ed.nav.dockingRequestStatus', desc: 'Docking request status', default: '' },
  dockingGrantedPad: { id: 'ed.nav.dockingGrantedPad', desc: 'Granted docking pad', default: '' },
  isTouchdown: { id: 'ed.nav.isTouchdown', desc: 'Surface touchdown occurred (pulse)', default: 'false' },
  isLiftoff: { id: 'ed.nav.isLiftoff', desc: 'Surface liftoff occurred (pulse)', default: 'false' },
};

const events = [
  { id: 'ed.nav.event.currentSystem', name: 'When the Current System changes', format: 'On arrival at $val', valueStateId: states.currentSystem.id, valueType: 'text' },
  { id: 'ed.nav.event.dockingRequestStatus', name: 'When the Docking Status changes', format: 'When the docking status becomes $val', valueStateId: states.dockingRequestStatus.id, valueType: 'choice', valueChoices: ['Requested', 'Cancelled', 'Denied', 'Granted', 'Timeout', ''] },
  { id: 'ed.nav.event.isJumping', name: 'When an FSD jump starts/ends', format: 'FSD jump: $val', valueStateId: states.isJumping.id, valueType: 'choice', valueChoices: ['true', 'false'] },
  { id: 'ed.nav.event.isTouchdown', name: 'When touching down on a surface', format: 'Surface touchdown: $val', valueStateId: states.isTouchdown.id, valueType: 'choice', valueChoices: ['true', 'false'] },
  { id: 'ed.nav.event.isLiftoff', name: 'When lifting off from a surface', format: 'Surface liftoff: $val', valueStateId: states.isLiftoff.id, valueType: 'choice', valueChoices: ['true', 'false'] },
];

module.exports = { categoryId: CATEGORY_ID, categoryName: 'Navigation', states, events, actions: [] };
