// Start Navigation: hand off to the phone's maps app with directions to the
// trailhead (spec §8 #2 — external maps, "to the trailhead").
import { Alert, Linking, Platform } from 'react-native';

export async function openTrailheadInMaps(trail) {
  if (!trail?.trailhead) return;
  const { latitude, longitude } = trail.trailhead;
  const dest = `${latitude},${longitude}`;
  const label = encodeURIComponent(trail.name);
  const web = `https://www.google.com/maps/dir/?api=1&destination=${dest}`;

  const candidates = Platform.select({
    // Apple Maps, starting directions to the trailhead
    ios: [`http://maps.apple.com/?daddr=${dest}&q=${label}`, web],
    // Google Maps turn-by-turn; fall back to any maps app, then the browser
    android: [`google.navigation:q=${dest}`, `geo:0,0?q=${dest}(${label})`, web],
    default: [web],
  });

  for (const url of candidates) {
    try {
      await Linking.openURL(url);
      return;
    } catch {
      // try the next option
    }
  }
  Alert.alert('Could not open maps', 'No maps app is available on this device.');
}
