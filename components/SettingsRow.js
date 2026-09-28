import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, type } from '../constants/theme';

/**
 * Props: label, onPress, value (optional current value, e.g. "Imperial"),
 *        variant ("nav" with chevron | "destructive" red, no chevron), divider
 */
export default function SettingsRow({ label, onPress, value, variant = 'nav', divider = variant === 'nav' }) {
  const destructive = variant === 'destructive';
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={value ? `${label}, ${value}` : label}
      accessibilityHint={destructive ? undefined : `Opens ${label} settings`}
      style={({ pressed }) => [styles.row, divider && styles.divider, pressed && styles.pressed]}
    >
      <Text style={[type.settingsRow, styles.label, destructive && styles.destructive]}>{label}</Text>
      {!destructive && (
        <View style={styles.right}>
          {value ? <Text style={styles.value}>{value}</Text> : null}
          <Ionicons name="chevron-forward" size={22} color={colors.chevron} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 58,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  pressed: { backgroundColor: 'rgba(0,0,0,0.04)' },
  label: { flex: 1 },
  destructive: { color: colors.destructive },
  right: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  value: { fontSize: 16, color: colors.textSecondary },
});
