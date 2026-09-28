import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from '../constants/theme';
import TrailImage from './TrailImage';
import StarButton from './StarButton';

/**
 * Props: trail, isSaved, onBack, onToggleSave, topInset (safe-area top)
 * Photo runs under the status bar; buttons sit below it on solid circles so
 * they stay visible on very bright or very dark photos.
 */
export default function HeroHeader({ trail, isSaved, onBack, onToggleSave, topInset = 0 }) {
  return (
    <View>
      <TrailImage
        uri={trail.imageUrl}
        variant="hero"
        label={trail.name}
        style={{ height: sizes.heroHeight + topInset }}
      />
      <View style={[styles.bar, { top: topInset + 10 }]} pointerEvents="box-none">
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="Back"
          hitSlop={4}
          style={({ pressed }) => [styles.back, pressed && { opacity: 0.7 }]}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <StarButton isSaved={isSaved} onToggle={onToggleSave} trailName={trail.name} variant="overlay" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  back: {
    width: sizes.minTouch,
    height: sizes.minTouch,
    borderRadius: sizes.minTouch / 2,
    backgroundColor: colors.overlayDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
