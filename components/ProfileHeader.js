import { useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, sizes, type } from '../constants/theme';
import { formatHikedCount } from '../utils/format';
import { toSource } from './TrailImage';

function initialsOf(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

/** Props: name, avatarUrl (URL | require() | null), trailsHikedCount */
export default function ProfileHeader({ name, avatarUrl, trailsHikedCount }) {
  const [failed, setFailed] = useState(false);
  const source = toSource(avatarUrl);

  return (
    <View style={styles.wrap}>
      <View style={styles.avatar} accessible accessibilityRole="image" accessibilityLabel={`Profile photo of ${name}`}>
        {source && !failed ? (
          <Image source={source} style={styles.image} onError={() => setFailed(true)} />
        ) : (
          <Text style={styles.initials}>{initialsOf(name)}</Text>
        )}
      </View>
      <Text style={[type.profileName, styles.name]} accessibilityRole="header" numberOfLines={2}>
        {name}
      </Text>
      <Text style={styles.count}>{formatHikedCount(trailsHikedCount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingTop: 24, paddingBottom: 24, paddingHorizontal: 16 },
  avatar: {
    width: sizes.avatar,
    height: sizes.avatar,
    borderRadius: sizes.avatar / 2,
    overflow: 'hidden',
    backgroundColor: colors.imageFallback,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { width: '100%', height: '100%' },
  initials: { fontSize: 40, fontWeight: '700', color: colors.primary },
  name: { marginTop: 16, textAlign: 'center' },
  count: { marginTop: 6, fontSize: 17, color: colors.textSecondary },
});
