import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AccessibilityInfo, FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { EmptyState, FilterChips, ScreenHeader, SearchBar, TrailCard } from '../components';
import { colors, spacing } from '../constants/theme';
import { useUser } from '../context/UserContext';
import { DIFFICULTY_OPTIONS, filterTrails, getTrails } from '../services/trailRepository';

export default function ExploreScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { units, isSaved, toggleSaved, savedTrailIds } = useUser();
  const [query, setQuery] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const listRef = useRef(null);

  const trails = getTrails();
  const results = useMemo(() => filterTrails(trails, query, difficulty), [trails, query, difficulty]);

  // Scroll back to the top when the filter changes (spec §6).
  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [difficulty]);

  // Tell screen-reader users how many trails are showing, after typing pauses.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }
    const t = setTimeout(() => {
      AccessibilityInfo.announceForAccessibility?.(
        results.length === 0 ? 'No trails match' : `${results.length} ${results.length === 1 ? 'trail' : 'trails'} shown`
      );
    }, 700);
    return () => clearTimeout(t);
  }, [results.length, query, difficulty]);

  const openTrail = useCallback((trail) => navigation.navigate('TrailDetails', { trailId: trail.id }), [navigation]);
  const onToggleSave = useCallback((trail) => toggleSaved(trail.id), [toggleSaved]);

  const clearAll = () => {
    setQuery('');
    setDifficulty('All');
  };

  const q = query.trim();
  const noResults = (() => {
    if (q && difficulty !== 'All') return { title: `No ${difficulty} trails match “${q}”`, body: 'Try another name or difficulty.' };
    if (q) return { title: `No trails match “${q}”`, body: 'Check the spelling or try another name.' };
    return { title: `No ${difficulty} trails yet`, body: 'Try another difficulty.' };
  })();

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <ScreenHeader title="TrailMate" variant="brand" />
      <View style={styles.controls}>
        <SearchBar value={query} onChangeText={setQuery} />
        <FilterChips options={DIFFICULTY_OPTIONS} selected={difficulty} onSelect={setDifficulty} />
      </View>

      <FlatList
        ref={listRef}
        data={results}
        keyExtractor={(item) => item.id}
        extraData={savedTrailIds}
        renderItem={({ item }) => (
          <TrailCard
            trail={item}
            units={units}
            isSaved={isSaved(item.id)}
            onPress={openTrail}
            onToggleSave={onToggleSave}
          />
        )}
        ItemSeparatorComponent={Separator}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        ListEmptyComponent={
          <EmptyState
            variant="exploreNoResults"
            title={noResults.title}
            body={noResults.body}
            onAction={clearAll}
          />
        }
      />
    </View>
  );
}

const Separator = () => <View style={{ height: spacing.cardGap }} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  controls: { paddingHorizontal: spacing.screen, gap: 14, paddingBottom: 14 },
  list: { paddingHorizontal: spacing.screen, paddingTop: 2, paddingBottom: 24, flexGrow: 1 },
});
