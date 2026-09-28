import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './constants/theme';
import { UserProvider } from './context/UserContext';
import { ToastProvider } from './context/ToastContext';
import RootNavigator from './navigation/RootNavigator';

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.bgScreen,
    card: colors.bgCard,
    text: colors.textPrimary,
    border: colors.divider,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Later: <AuthProvider> goes here and passes the signed-in user to UserProvider */}
      <UserProvider>
        <NavigationContainer theme={navTheme}>
          <ToastProvider>
            <RootNavigator />
          </ToastProvider>
        </NavigationContainer>
      </UserProvider>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
