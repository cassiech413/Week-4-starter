import { StyleSheet, Text, View } from 'react-native';
import { colors, radius, type } from '../constants/theme';

const PALETTE = {
  Easy: { bg: colors.easy, fg: colors.easyText },
  Moderate: { bg: colors.moderate, fg: colors.moderateText },
  Hard: { bg: colors.hard, fg: colors.hardText },
};

/**
 * Props: level ("Easy" | "Moderate" | "Hard"), size ("sm" cards | "md" details)
 * Difficulty is always written as text (never color alone). Unknown values
 * render on a gray badge so a data typo is visible instead of crashing.
 */
export default function DifficultyBadge({ level, size = 'sm' }) {
  const palette = PALETTE[level] ?? { bg: colors.unknownBadge, fg: '#FFFFFF' };
  const md = size === 'md';
  return (
    <View
      style={[styles.badge, md && styles.md, { backgroundColor: palette.bg }]}
      accessible
      accessibilityLabel={`Difficulty: ${level || 'unknown'}`}
    >
      <Text style={[type.badge, md && styles.mdText, { color: palette.fg }]}>{level || 'Unknown'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  md: { paddingHorizontal: 12, paddingVertical: 4 },
  mdText: { fontSize: 15 },
});
