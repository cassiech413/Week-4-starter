import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, sizes } from '../constants/theme';

/**
 * Props: isSaved, onToggle, trailName, variant ("plain" on cards | "overlay" on hero)
 * Hit area is always ≥ 44×44. It is its own focus stop inside a card and
 * does not trigger the card's onPress.
 */
export default function StarButton({ isSaved, onToggle, trailName, variant = 'plain' }) {
  const overlay = variant === 'overlay';
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="button"
      accessibilityLabel={isSaved ? `Remove ${trailName} from saved` : `Save ${trailName}`}
      accessibilityState={{ selected: !!isSaved }}
      hitSlop={overlay ? 4 : 8}
      style={({ pressed }) => [
        styles.base,
        overlay && styles.overlay,
        pressed && { opacity: 0.6, transform: [{ scale: 0.92 }] },
      ]}
    >
      <Ionicons
        name={isSaved ? 'star' : 'star-outline'}
        size={overlay ? 24 : 28}
        color={isSaved ? colors.starSaved : overlay ? colors.textPrimary : colors.starUnsaved}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minWidth: sizes.minTouch,
    minHeight: sizes.minTouch,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    width: sizes.minTouch,
    height: sizes.minTouch,
    borderRadius: sizes.minTouch / 2,
    backgroundColor: colors.overlayLight,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 3,
  },
});
