// Not in the mockups — designed in the same style (spec §6).
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, type } from '../constants/theme';
import { useUser } from '../context/UserContext';

const OPTIONS = [
  { value: 'imperial', label: 'Imperial', detail: 'Miles and feet' },
  { value: 'metric', label: 'Metric', detail: 'Kilometers and meters' },
];

export default function UnitsScreen() {
  const { settings, setUnits } = useUser();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.group} accessibilityRole="radiogroup" accessibilityLabel="Preferred units">
        {OPTIONS.map((opt, i) => {
          const selected = settings.units === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setUnits(opt.value)}
              accessibilityRole="radio"
              accessibilityLabel={`${opt.label}, ${opt.detail}`}
              accessibilityState={{ checked: selected }}
              style={({ pressed }) => [styles.row, i < OPTIONS.length - 1 && styles.divider, pressed && styles.pressed]}
            >
              <View style={styles.text}>
                <Text style={type.settingsRow}>{opt.label}</Text>
                <Text style={styles.detail}>{opt.detail}</Text>
              </View>
              {selected && <Ionicons name="checkmark" size={24} color={colors.primary} />}
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.note}>Distances and elevation update everywhere in the app.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  content: { padding: spacing.screen },
  group: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 64, paddingVertical: 12 },
  pressed: { opacity: 0.7 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  text: { flex: 1, gap: 2 },
  detail: { fontSize: 14, color: colors.textSecondary },
  note: { ...type.statLabel, marginTop: 12, marginHorizontal: 4 },
});
