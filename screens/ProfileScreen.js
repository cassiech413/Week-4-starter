import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileHeader, SettingsRow } from '../components';
import { colors, spacing } from '../constants/theme';
import { useToast } from '../context/ToastContext';
import { useUser } from '../context/UserContext';
import { confirmAsync } from '../utils/confirm';
import { unitsLabel } from '../utils/format';

export default function ProfileScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const { profile, settings, logOut } = useUser();
  const { showToast } = useToast();

  const anyNotificationsOn = Object.values(settings.notifications).some(Boolean);

  const handleLogOut = async () => {
    const ok = await confirmAsync({
      title: 'Log out?',
      message: 'This is a demo account, so your saved trails and settings will stay on this device.',
      confirmText: 'Log Out',
      destructive: true,
    });
    if (!ok) return;
    await logOut();
    navigation.navigate('Explore');
    showToast('Logged out (demo)');
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingTop: insets.top + 8, paddingBottom: 24 }}>
      <ProfileHeader name={profile.name} avatarUrl={profile.avatarUrl} trailsHikedCount={profile.trailsHikedCount} />
      <View style={styles.list}>
        <SettingsRow
          label="Notifications"
          value={anyNotificationsOn ? 'On' : 'Off'}
          onPress={() => navigation.navigate('Notifications')}
        />
        <SettingsRow label="Units" value={unitsLabel(settings.units)} onPress={() => navigation.navigate('Units')} />
        <SettingsRow label="About" onPress={() => navigation.navigate('About')} />
        <SettingsRow label="Log Out" variant="destructive" onPress={handleLogOut} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  list: {
    marginHorizontal: spacing.screen + 16,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
});
