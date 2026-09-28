import { useCallback, useMemo } from 'react';
import { FlatList, LayoutAnimation, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, ScreenHeader, TrailCard } from '../components';
import { colors, spacing } from '../constants/theme';
import { useUser } from '../context/UserContext';
import { getTrailsByIds } from '../services/trailRepository';

export default function SavedScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { savedTrailIds, isHydrated, toggleSaved, units } = useUser();

  // Newest saved first; IDs whose trail no longer exists are skipped.
  const savedTrails = useMemo(() => getTrailsByIds(savedTrailIds), [savedTrailIds]);

  const openTrail = useCallback((trail) => navigation.navigate('TrailDetails', { trailId: trail.id }), [navigation]);

  const unsave = useCallback(
    (trail) => {
      // Smoothly collapse the removed card.
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      toggleSaved(trail.id);
    },
    [toggleSaved]
  );

  let body;
  if (!isHydrated) {
    body = <EmptyState variant="loading" />; // spinner, not the empty state, while loading
  } else {
    body = (
      <FlatList
        data={savedTrails}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrailCard trail={item} units={units} isSaved onPress={openTrail} onToggleSave={unsave} />
        )}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <EmptyState variant="savedEmpty" onAction={() => navigation.navigate('Explore')} />
        }
      />
    );
  }

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScreenHeader title="Saved" variant="page" />
      {body}
    </View>
  );
}

const Separator = () => <View style={{ height: spacing.cardGap }} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  list: { padding: spacing.screen, paddingBottom: 24, flexGrow: 1 },
});
