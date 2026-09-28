import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, HeroHeader, MapPreview, PrimaryButton, StatsRow, TrailTitle } from '../components';
import { colors, spacing, type } from '../constants/theme';
import { useUser } from '../context/UserContext';
import { getTrailById } from '../services/trailRepository';
import { openTrailheadInMaps } from '../utils/maps';

export default function TrailDetailsScreen({ route, navigation }) {
  const insets = useSafeAreaInsets();
  const { isSaved, toggleSaved, units } = useUser();
  const trail = getTrailById(route.params?.trailId);

  if (!trail) {
    return (
      <View style={[styles.screen, { paddingTop: insets.top }]}>
        <EmptyState variant="notFound" onAction={() => navigation.goBack()} />
      </View>
    );
  }

  const saved = isSaved(trail.id);
  const canNavigate = !!trail.trailhead;

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <HeroHeader
          trail={trail}
          isSaved={saved}
          topInset={insets.top}
          onBack={() => navigation.goBack()}
          onToggleSave={() => toggleSaved(trail.id)}
        />

        <View style={styles.content}>
          <TrailTitle name={trail.name} difficulty={trail.difficulty} />

          <StatsRow
            distanceMiles={trail.distanceMiles}
            elevationGainFt={trail.elevationGainFt}
            durationMinutes={trail.durationMinutes}
            units={units}
          />

          <View style={styles.section}>
            <Text style={type.sectionTitle} accessibilityRole="header">
              Description
            </Text>
            {trail.description.map((paragraph, i) => (
              <Fragment key={i}>
                {i > 0 && <View style={styles.rule} />}
                <Text style={type.body}>{paragraph}</Text>
              </Fragment>
            ))}
          </View>

          <MapPreview mapImageUrl={trail.mapImageUrl} trailName={trail.name} />
        </View>
      </ScrollView>

      {/* Pinned footer, above the home indicator */}
      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, 12) + 4 }]}>
        <PrimaryButton
          title="Start Navigation"
          onPress={() => openTrailheadInMaps(trail)}
          disabled={!canNavigate}
          accessibilityHint={canNavigate ? 'Opens your maps app with directions to the trailhead' : undefined}
          icon={<Ionicons name="navigate" size={20} color="#FFFFFF" />}
        />
        {!canNavigate && <Text style={styles.footerNote}>Trailhead location unavailable for this trail.</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  scroll: { paddingBottom: 24 },
  content: { padding: spacing.screen, paddingTop: 18, gap: 16 },
  section: { gap: 10 },
  rule: { height: 1, backgroundColor: colors.divider, marginVertical: 2 },
  footer: {
    paddingHorizontal: spacing.screen,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    backgroundColor: colors.bgScreen,
  },
  footerNote: { ...type.statLabel, textAlign: 'center', marginTop: 8 },
});
