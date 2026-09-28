// Not in the mockups — designed in the same style (spec §6).
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { colors, spacing, type } from '../constants/theme';

export default function AboutScreen() {
  const version = Constants.expoConfig?.version ?? '1.0.0';
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.logo} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
          <MaterialCommunityIcons name="image-filter-hdr" size={40} color={colors.textOnColor} />
        </View>
        <Text style={type.appTitle} accessibilityRole="header">TrailMate</Text>
        <Text style={styles.version}>Version {version} (prototype)</Text>
      </View>

      <View style={styles.card}>
        <Text style={type.sectionTitle} accessibilityRole="header">About this build</Text>
        <Text style={type.body}>
          TrailMate helps you discover hiking trails, check the basics, and save the ones you want to visit later.
        </Text>
        <Text style={type.body}>
          All trail data in this version is sample data for testing. Don’t use it to plan a real hike.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={type.sectionTitle} accessibilityRole="header">Credits</Text>
        <Text style={type.body}>Photos and illustrations: placeholder images from the TrailMate design mockups.</Text>
        <Text style={type.body}>Icons: Ionicons and Material Community Icons via @expo/vector-icons.</Text>
        <Text style={type.body}>Built by the TrailMate team, SI 669.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  content: { padding: spacing.screen, gap: 16, paddingBottom: 32 },
  hero: { alignItems: 'center', paddingVertical: 16, gap: 6 },
  logo: {
    width: 72,
    height: 72,
    borderRadius: 18,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  version: { fontSize: 15, color: colors.textSecondary },
  card: {
    backgroundColor: colors.bgCard,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    gap: 10,
  },
});
