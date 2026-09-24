'use strict';

// Portado del proyecto ElitePowerPlayTracker propio del usuario.
const COLORS = {
  'Aisling Duval': '#43b5eb',
  'Archon Delaine': '#ed453c',
  'Arissa Lavigny-Duval': '#d082fd',
  'Denton Patreus': '#3fd3d3',
  'Edmund Mahon': '#5acd57',
  'Felicia Winters': '#e9b61e',
  'Jerome Archer': '#e876eb',
  'Li Yong-Rui': '#38db9d',
  'Nakato Kaine': '#a6d950',
  'Pranav Antal': '#d6d758',
  'Yuri Grom': '#ef8435',
  'Zemina Torval': '#7b94f3',
};

function getPowerplayColor(power) {
  return COLORS[power] || '#f07b05';
}

function getMeritsRequiredForRank(rank) {
  const normalizedRank = Math.max(0, Math.floor(rank));
  if (normalizedRank <= 1) return normalizedRank === 1 ? 2000 : null;
  if (normalizedRank === 2) return 5000;
  if (normalizedRank === 3) return 9000;
  if (normalizedRank === 4) return 15000;
  return 15000 + (normalizedRank + 1 - 5) * 8000;
}

function getMeritsToNextRank(currentRank, totalMerits) {
  const rank = Math.max(0, Math.floor(currentRank));
  const merits = Math.max(0, Math.floor(totalMerits));
  if (rank === 0) return { nextRank: 1, requiredMerits: null, remainingMerits: null };
  const nextRank = rank + 1;
  const requiredMerits = getMeritsRequiredForRank(rank);
  if (requiredMerits === null) return { nextRank, requiredMerits: null, remainingMerits: null };
  return { nextRank, requiredMerits, remainingMerits: Math.max(0, requiredMerits - merits) };
}

module.exports = { getPowerplayColor, getMeritsRequiredForRank, getMeritsToNextRank };
