import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { colors, radius, spacing } from '../constants/theme';

/**
 * Props: options (["All","Easy","Moderate","Hard"]), selected, onSelect(option)
 * Horizontal scroll row so the chips never clip on 320pt phones or large text.
 */
export default function FilterChips({ options, selected, onSelect }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
      accessibilityLabel="Filter by difficulty"
      keyboardShouldPersistTaps="handled"
    >
      {options.map((option) => {
        const isSelected = option === selected;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            accessibilityRole="button"
            accessibilityLabel={`${option} difficulty`}
            accessibilityState={{ selected: isSelected }}
            hitSlop={{ top: 4, bottom: 4 }}
            style={({ pressed }) => [
              styles.chip,
              isSelected ? styles.chipSelected : styles.chipIdle,
              pressed && { opacity: 0.75 },
            ]}
          >
            <Text style={[styles.label, isSelected && styles.labelSelected]}>{option}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { gap: spacing.chipGap, paddingVertical: 2 },
  chip: {
    minHeight: 38,
    minWidth: 64,
    paddingHorizontal: 18,
    borderRadius: radius.chip,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  chipIdle: { backgroundColor: colors.bgCard, borderColor: colors.border },
  chipSelected: { backgroundColor: colors.primary, borderColor: colors.primary },
  label: { fontSize: 15, fontWeight: '500', color: colors.textPrimary },
  labelSelected: { color: colors.textOnColor, fontWeight: '600' },
});
