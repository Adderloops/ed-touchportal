#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const entrySource = require('../definitions/entry-source');

const outputPath = path.join(__dirname, '..', 'entry.tp');
fs.writeFileSync(outputPath, JSON.stringify(entrySource, null, 2) + '\n', 'utf8');

let totalStates = 0;
let totalEvents = 0;
let totalActions = 0;
for (const cat of entrySource.categories) {
  totalStates += cat.states.length;
  totalEvents += cat.events.length;
  totalActions += cat.actions.length;
}

console.log(`entry.tp written to ${outputPath}`);
console.log(`Categories: ${entrySource.categories.length} | States: ${totalStates} | Events: ${totalEvents} | Actions: ${totalActions}`);
