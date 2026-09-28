// Navigation (React Navigation, per spec decision log):
//   Root stack
//   ├─ Tabs (bottom tab bar): Explore · Saved · Profile
//   ├─ TrailDetails  (full screen, tab bar hidden — matches mockup)
//   └─ Notifications · Units · About  (Profile sub-screens)
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';
import ExploreScreen from '../screens/ExploreScreen';
import SavedScreen from '../screens/SavedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TrailDetailsScreen from '../screens/TrailDetailsScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import UnitsScreen from '../screens/UnitsScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// One icon set everywhere (spec §8 #9–10): compass · star · person.
const TAB_ICONS = {
  Explore: ['compass', 'compass-outline'],
  Saved: ['star', 'star-outline'],
  Profile: ['person', 'person-outline'],
};

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: { backgroundColor: colors.bgCard, borderTopColor: colors.divider },
        tabBarIcon: ({ focused, color }) => {
          const [filled, outline] = TAB_ICONS[route.name];
          return <Ionicons name={focused ? filled : outline} size={26} color={color} />;
        },
        tabBarLabel: ({ focused, color }) => (
          <Text style={{ fontSize: 12, fontWeight: focused ? '700' : '500', color }}>{route.name}</Text>
        ),
      })}
    >
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Saved" component={SavedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const subScreenOptions = {
  headerShown: true,
  headerTintColor: colors.primary,
  headerTitleStyle: { color: colors.textPrimary, fontWeight: '600' },
  headerStyle: { backgroundColor: colors.bgScreen },
  headerShadowVisible: false,
  headerBackTitle: 'Profile',
};

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgScreen } }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="TrailDetails" component={TrailDetailsScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} options={subScreenOptions} />
      <Stack.Screen name="Units" component={UnitsScreen} options={subScreenOptions} />
      <Stack.Screen name="About" component={AboutScreen} options={subScreenOptions} />
    </Stack.Navigator>
  );
}
