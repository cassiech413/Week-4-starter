import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../constants/theme';
import { toSource } from './TrailImage';

/**
 * Props: mapImageUrl (URL | require() | null), trailName
 * v1 is a static image so it works on iOS, Android and web without map API keys.
 * Missing → renders nothing (section hidden). Failed load → fallback box.
 */
export default function MapPreview({ mapImageUrl, trailName }) {
  const [failed, setFailed] = useState(false);
  if (!mapImageUrl) return null;
  const source = toSource(mapImageUrl);

  return (
    <View
      style={styles.frame}
      accessible
      accessibilityRole="image"
      accessibilityLabel={`Map preview of ${trailName} route`}
    >
      {failed ? (
        <View style={styles.fallback}>
          <Ionicons name="map-outline" size={28} color={colors.textSecondary} />
          <Text style={styles.fallbackText}>Map preview unavailable</Text>
        </View>
      ) : (
        <Image source={source} style={styles.image} resizeMode="cover" onError={() => setFailed(true)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    borderRadius: radius.map,
    borderWidth: 4,
    borderColor: colors.bgCard,
    backgroundColor: colors.bgCard,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  image: { width: '100%', height: 140, borderRadius: radius.map - 4 },
  fallback: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.imageLoading,
  },
  fallbackText: { color: colors.textSecondary, fontSize: 14 },
});
