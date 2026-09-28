import { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, radius, sizes } from '../constants/theme';

// Accepts a remote URL string, a local require(...) number, or null.
// (On web a require() can be an object, so objects pass through too.)
export function toSource(uri) {
  if (typeof uri === 'number' || (uri && typeof uri === 'object')) return uri;
  if (typeof uri === 'string' && uri.length > 0) return { uri };
  return null;
}

/**
 * Props: uri (string | require() | null), variant ("thumb" | "hero"), label, style
 * States: loading (neutral bg) · loaded · missing / failed (green fallback + mountain icon)
 * Thumb is decorative (the card label covers it); hero is labeled "Photo of {name}".
 */
export default function TrailImage({ uri, variant = 'thumb', label, style }) {
  const source = toSource(uri);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(typeof uri !== 'string');

  useEffect(() => {
    setFailed(false);
    setLoaded(typeof uri !== 'string');
  }, [uri]);

  const isHero = variant === 'hero';
  const showFallback = !source || failed;
  const a11y = isHero
    ? { accessible: true, accessibilityRole: 'image', accessibilityLabel: label ? `Photo of ${label}` : 'Trail photo' }
    : { accessible: false, accessibilityElementsHidden: true, importantForAccessibility: 'no-hide-descendants' };

  return (
    <View
      style={[
        isHero ? styles.hero : styles.thumb,
        { backgroundColor: showFallback ? colors.imageFallback : colors.imageLoading },
        style,
      ]}
      {...a11y}
    >
      {showFallback ? (
        <MaterialCommunityIcons
          name="image-filter-hdr"
          size={isHero ? 56 : 32}
          color={colors.primary}
          style={{ opacity: 0.55 }}
        />
      ) : (
        <Image
          source={source}
          style={[styles.fill, { opacity: loaded ? 1 : 0 }]}
          resizeMode="cover"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  // Explicit 100% size: on web a require()'d image otherwise renders at its intrinsic size.
  fill: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  thumb: {
    width: sizes.thumbWidth,
    height: sizes.thumbHeight,
    borderRadius: radius.image,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hero: {
    width: '100%',
    height: sizes.heroHeight,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
