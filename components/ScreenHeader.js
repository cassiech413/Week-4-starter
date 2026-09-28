import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, type } from '../constants/theme';

/**
 * Props: title, variant ("brand" green app title | "page" title + divider | "none")
 * Place inside a safe-area-aware screen so it sits below the notch.
 */
export default function ScreenHeader({ title, variant = 'page' }) {
  if (variant === 'none') return null;
  const brand = variant === 'brand';
  return (
    <View style={[styles.wrap, !brand && styles.page]}>
      <Text style={brand ? type.appTitle : type.screenTitle} accessibilityRole="header">
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: spacing.screen,
    paddingTop: 12,
    paddingBottom: 12,
  },
  page: {
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
});
