// Single place screens get trail data from. Today it reads mock data;
// later it can fetch from an API without any screen changing.
import { TRAILS } from '../data/trails';

export function getTrails() {
  return TRAILS;
}

export function getTrailById(id) {
  return TRAILS.find((trail) => trail.id === id) ?? null;
}

export function getTrailsByIds(ids) {
  // Keeps the order of `ids` (newest saved first) and silently skips IDs
  // whose trail no longer exists in the data.
  return ids.map(getTrailById).filter(Boolean);
}

export const DIFFICULTY_OPTIONS = ['All', 'Easy', 'Moderate', 'Hard'];

// Search (name only, trimmed, case-insensitive) AND difficulty filter.
export function filterTrails(trails, query, difficulty) {
  const q = query.trim().toLowerCase();
  return trails.filter((trail) => {
    const matchesQuery = q === '' || trail.name.toLowerCase().includes(q);
    const matchesDifficulty = difficulty === 'All' || trail.difficulty === difficulty;
    return matchesQuery && matchesDifficulty;
  });
}
