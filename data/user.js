// Everything that belongs to the *person*, not the trail (spec §4).
// Saved + hiked status live here, never on trail objects, so when real
// accounts arrive only the source of this data changes (see services/).

export const DEFAULT_SETTINGS = {
  units: 'imperial', // 'imperial' | 'metric'
  notifications: {
    nearbyTrails: true,
    savedReminders: false,
  },
};

// v1 has no sign-in, so everyone is this local demo user.
export const DEMO_USER = {
  id: 'local-demo-user',
  name: 'Jordan Rivera',
  avatarUrl: require('../assets/avatars/jordan.jpg'), // URL string, require(), or null
  trailsHikedCount: 12,
  savedTrailIds: [], // newest first
  settings: DEFAULT_SETTINGS,
};
