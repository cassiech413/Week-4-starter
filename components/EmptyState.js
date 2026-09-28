import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius, type } from '../constants/theme';

const PRESETS = {
  exploreNoResults: {
    icon: 'search-outline',
    title: 'No trails match',
    body: 'Try another name or difficulty.',
    actionLabel: 'Clear search & filters',
  },
  savedEmpty: {
    icon: 'star-outline',
    title: 'No saved trails yet',
    body: 'Tap the star on any trail to save it here.',
    actionLabel: 'Explore trails',
  },
  notFound: {
    icon: 'alert-circle-outline',
    title: 'Trail not found',
    body: 'This trail may have been removed.',
    actionLabel: 'Go back',
  },
};

/**
 * Props: variant ("exploreNoResults" | "savedEmpty" | "notFound" | "loading"),
 *        title / body / actionLabel (optional overrides), onAction
 */
export default function EmptyState({ variant, title, body, actionLabel, onAction }) {
  if (variant === 'loading') {
    return (
      <View style={styles.wrap} accessible accessibilityLabel="Loading" accessibilityRole="progressbar">
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  const preset = PRESETS[variant] ?? {};
  const t = title ?? preset.title;
  const b = body ?? preset.body;
  const a = actionLabel ?? preset.actionLabel;

  return (
    <View style={styles.wrap}>
      <View style={styles.iconCircle} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Ionicons name={preset.icon ?? 'leaf-outline'} size={32} color={colors.primary} />
      </View>
      <Text style={styles.title} accessibilityRole="header">{t}</Text>
      {b ? <Text style={styles.body}>{b}</Text> : null}
      {a && onAction ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          style={({ pressed }) => [styles.action, pressed && { opacity: 0.75 }]}
        >
          <Text style={styles.actionText}>{a}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center', paddingVertical: 56, paddingHorizontal: 32 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.imageFallback,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: { ...type.sectionTitle, fontSize: 20, textAlign: 'center' },
  body: { ...type.body, color: colors.textSecondary, textAlign: 'center', marginTop: 6 },
  action: {
    marginTop: 20,
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: radius.button,
    borderWidth: 1.5,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: { color: colors.primary, fontSize: 16, fontWeight: '600' },
});
