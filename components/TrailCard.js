import { memo } from 'react';
import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { cardShadow, colors, radius, sizes, spacing, type } from '../constants/theme';
import { formatDistance, formatDuration, spokenDistance, spokenDuration } from '../utils/format';
import TrailImage from './TrailImage';
import DifficultyBadge from './DifficultyBadge';
import StarButton from './StarButton';

/**
 * Props: trail, isSaved, units, onPress(trail), onToggleSave(trail)
 * Whole card = one button ("{name}, {difficulty}, {distance}, {time}");
 * the star is a separate focus stop.
 */
function TrailCard({ trail, isSaved, units = 'imperial', onPress, onToggleSave }) {
  const { width } = useWindowDimensions();
  const compact = width < 360; // e.g. iPhone SE: smaller thumbnail leaves room for the name
  const a11yLabel = `${trail.name}, ${trail.difficulty}, ${spokenDistance(trail.distanceMiles, units)}, ${spokenDuration(trail.durationMinutes)}`;

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onPress?.(trail)}
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityHint="Opens trail details"
        style={({ pressed }) => [styles.main, pressed && styles.pressed]}
      >
        <TrailImage
          uri={trail.imageUrl}
          variant="thumb"
          style={compact && { width: sizes.thumbWidth * 0.78, height: sizes.thumbHeight * 0.85 }}
        />
        <View style={styles.info}>
          <Text style={type.cardTitle} numberOfLines={2} ellipsizeMode="tail">
            {trail.name}
          </Text>
          <DifficultyBadge level={trail.difficulty} size="sm" />
          <Text style={type.meta}>
            {formatDistance(trail.distanceMiles, units)}
            {'  •  '}
            {formatDuration(trail.durationMinutes)}
          </Text>
        </View>
      </Pressable>
      <View style={styles.star}>
        <StarButton isSaved={isSaved} trailName={trail.name} onToggle={() => onToggleSave?.(trail)} />
      </View>
    </View>
  );
}

export default memo(TrailCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgCard,
    borderRadius: radius.card,
    borderWidth: StyleSheet.hairlineWidth * 2,
    borderColor: colors.border,
    ...cardShadow,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.card,
    paddingRight: 4,
    borderRadius: radius.card,
  },
  pressed: { opacity: 0.7 },
  info: { flex: 1, marginLeft: 12, gap: 6 },
  star: { paddingRight: 6 },
});
