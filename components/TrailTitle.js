import { StyleSheet, Text, View } from 'react-native';
import { type } from '../constants/theme';
import DifficultyBadge from './DifficultyBadge';

/** Props: name, difficulty. A long name pushes the badge to the next line. */
export default function TrailTitle({ name, difficulty }) {
  return (
    <View style={styles.row}>
      <Text style={[type.detailTitle, styles.name]} accessibilityRole="header">
        {name}
      </Text>
      <DifficultyBadge level={difficulty} size="md" />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    columnGap: 10,
    rowGap: 8,
  },
  name: { flexShrink: 1 },
});
