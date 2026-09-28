// Persistence for per-user data (saved trails + settings).
//
// v1: stored on the device with AsyncStorage, keyed by user id.
// Later: replace the bodies of loadUserData / saveUserData with calls to your
// backend (e.g. GET/PATCH /users/:id). The UserContext and screens stay the same.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DEFAULT_SETTINGS } from '../data/user';

const keyFor = (userId) => `trailmate:user:${userId}:v1`;

export async function loadUserData(userId) {
  try {
    const raw = await AsyncStorage.getItem(keyFor(userId));
    const stored = raw ? JSON.parse(raw) : {};
    return {
      savedTrailIds: Array.isArray(stored.savedTrailIds) ? stored.savedTrailIds : [],
      settings: {
        ...DEFAULT_SETTINGS,
        ...stored.settings,
        notifications: {
          ...DEFAULT_SETTINGS.notifications,
          ...stored.settings?.notifications,
        },
      },
    };
  } catch (error) {
    console.warn('TrailMate: could not load saved data', error);
    return { savedTrailIds: [], settings: DEFAULT_SETTINGS };
  }
}

export async function saveUserData(userId, data) {
  try {
    await AsyncStorage.setItem(keyFor(userId), JSON.stringify(data));
  } catch (error) {
    console.warn('TrailMate: could not save data', error);
  }
}
