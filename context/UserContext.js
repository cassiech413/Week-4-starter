// App-wide user state: profile, saved trails, settings.
//
// Auth-ready structure:
//   - Screens only talk to `useUser()`; they never touch storage directly.
//   - Data is loaded/saved per `user.id` through services/userRepository.js.
//   - To add real accounts later, wrap this provider in an AuthProvider, pass
//     the signed-in user as `initialUser`, and point userRepository at your API.
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { DEFAULT_SETTINGS, DEMO_USER } from '../data/user';
import { loadUserData, saveUserData } from '../services/userRepository';

const UserContext = createContext(null);

export function UserProvider({ initialUser = DEMO_USER, children }) {
  const [profile] = useState({
    id: initialUser.id,
    name: initialUser.name,
    avatarUrl: initialUser.avatarUrl,
    trailsHikedCount: initialUser.trailsHikedCount,
  });
  const [savedTrailIds, setSavedTrailIds] = useState(initialUser.savedTrailIds ?? []);
  const [settings, setSettings] = useState(initialUser.settings ?? DEFAULT_SETTINGS);
  const [isHydrated, setIsHydrated] = useState(false);
  const pendingToggles = useRef([]); // taps made before storage finished loading

  // 1) Load persisted data once on start.
  useEffect(() => {
    let cancelled = false;
    loadUserData(profile.id).then((stored) => {
      if (cancelled) return;
      // Re-apply any taps that happened during the (brief) load.
      let ids = stored.savedTrailIds;
      for (const id of pendingToggles.current) {
        ids = ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids];
      }
      pendingToggles.current = [];
      setSavedTrailIds(ids);
      setSettings(stored.settings);
      setIsHydrated(true);
    });
    return () => {
      cancelled = true;
    };
  }, [profile.id]);

  // 2) Save whenever saved trails or settings change (after loading).
  useEffect(() => {
    if (!isHydrated) return;
    saveUserData(profile.id, { savedTrailIds, settings });
  }, [isHydrated, profile.id, savedTrailIds, settings]);

  const isSaved = useCallback((trailId) => savedTrailIds.includes(trailId), [savedTrailIds]);

  const toggleSaved = useCallback(
    (trailId) => {
      if (!isHydrated) pendingToggles.current.push(trailId);
      setSavedTrailIds((ids) =>
        ids.includes(trailId) ? ids.filter((id) => id !== trailId) : [trailId, ...ids] // newest first
      );
    },
    [isHydrated]
  );

  const setUnits = useCallback((units) => setSettings((s) => ({ ...s, units })), []);

  const setNotification = useCallback(
    (key, enabled) =>
      setSettings((s) => ({ ...s, notifications: { ...s.notifications, [key]: enabled } })),
    []
  );

  // v1 has no accounts, so logging out keeps local data (spec §5.17).
  // Later: call your auth service here, then clear/replace the user.
  const logOut = useCallback(async () => {}, []);

  const value = useMemo(
    () => ({
      profile,
      savedTrailIds,
      settings,
      units: settings.units,
      isHydrated,
      isSaved,
      toggleSaved,
      setUnits,
      setNotification,
      logOut,
    }),
    [profile, savedTrailIds, settings, isHydrated, isSaved, toggleSaved, setUnits, setNotification, logOut]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
