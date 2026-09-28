import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors, type } from '../constants/theme';
import {
  formatDistance,
  formatDuration,
  formatElevation,
  spokenDistance,
  spokenDuration,
  spokenElevation,
} from '../utils/format';

/**
 * Props: distanceMiles, elevationGainFt, durationMinutes, units
 * Three columns normally; stacks into rows when the user has large text on.
 * Each stat is a single screen-reader element ("Distance, 11.8 miles").
 */
export default function StatsRow({ distanceMiles, elevationGainFt, durationMinutes, units = 'imperial' }) {
  const { fontScale } = useWindowDimensions();
  const stacked = fontScale >= 1.35;

  const stats = [
    { key: 'distance', icon: 'map-marker', label: 'Distance', value: formatDistance(distanceMiles, units), spoken: spokenDistance(distanceMiles, units) },
    { key: 'elevation', icon: 'image-filter-hdr', label: 'Elevation', value: formatElevation(elevationGainFt, units), spoken: spokenElevation(elevationGainFt, units) },
    { key: 'time', icon: 'clock-time-four', label: 'Time', value: formatDuration(durationMinutes), spoken: spokenDuration(durationMinutes) },
  ];

  return (
    <View style={[styles.row, stacked && styles.stacked]}>
      {stats.map((stat, i) => (
        <View
          key={stat.key}
          style={[
            stacked ? styles.itemStacked : styles.item,
            !stacked && i > 0 && styles.itemDivider,
          ]}
          accessible
          accessibilityLabel={`${stat.label === 'Elevation' ? 'Elevation gain' : stat.label === 'Time' ? 'Estimated time' : stat.label}, ${stat.spoken}`}
        >
          <View style={styles.valueRow}>
            <MaterialCommunityIcons name={stat.icon} size={20} color={colors.textPrimary} />
            <Text style={type.statValue} numberOfLines={stacked ? undefined : 1} adjustsFontSizeToFit={!stacked} minimumFontScale={0.8}>
              {stat.value}
            </Text>
          </View>
          <Text style={[type.statLabel, stacked && styles.labelStacked]}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    paddingVertical: 12,
  },
  stacked: { flexDirection: 'column', gap: 10 },
  item: { flex: 1, alignItems: 'center', gap: 4, paddingHorizontal: 4 },
  itemDivider: { borderLeftWidth: 1, borderLeftColor: colors.divider },
  itemStacked: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  labelStacked: { fontSize: 15 },
});
