// Not in the mockups — designed in the same style (spec §6).
// v1 stores the preferences only; no real notifications are sent.
import { Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { colors, spacing, type } from '../constants/theme';
import { useUser } from '../context/UserContext';

const OPTIONS = [
  { key: 'nearbyTrails', label: 'New trails near me', description: 'Hear about newly added trails in your area.' },
  { key: 'savedReminders', label: 'Reminders for saved trails', description: 'A nudge about trails you starred but haven’t hiked.' },
];

export default function NotificationsScreen() {
  const { settings, setNotification } = useUser();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.group}>
        {OPTIONS.map((opt, i) => {
          const enabled = !!settings.notifications[opt.key];
          return (
            <Pressable
              key={opt.key}
              onPress={() => setNotification(opt.key, !enabled)}
              accessibilityRole="switch"
              accessibilityLabel={opt.label}
              accessibilityHint={opt.description}
              accessibilityState={{ checked: enabled }}
              style={[styles.row, i < OPTIONS.length - 1 && styles.divider]}
            >
              <View style={styles.text}>
                <Text style={type.settingsRow}>{opt.label}</Text>
                <Text style={styles.description}>{opt.description}</Text>
              </View>
              <Switch
                value={enabled}
                onValueChange={(v) => setNotification(opt.key, v)}
                trackColor={{ false: '#C9CED6', true: colors.primary }}
                thumbColor="#FFFFFF"
                activeThumbColor="#FFFFFF"
                ios_backgroundColor="#C9CED6"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              />
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.note}>Preview build: preferences are saved, but notifications aren’t sent yet.</Text>
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
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12, minHeight: 64 },
  divider: { borderBottomWidth: 1, borderBottomColor: colors.divider },
  text: { flex: 1, gap: 2 },
  description: { fontSize: 14, color: colors.textSecondary },
  note: { ...type.statLabel, marginTop: 12, marginHorizontal: 4 },
});
