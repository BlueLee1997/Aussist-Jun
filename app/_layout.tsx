import * as React from 'react';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Animated, View, StyleSheet, Platform } from 'react-native';
import CustomSplash from './components/CustomSplash';
import { TranslationProvider } from '../app/context/TranslationContext';
import { Ionicons } from '@expo/vector-icons';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'home/home',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    ...Ionicons.font,
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Promise.all([
          // Add any other async tasks here
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  if (!isReady || !fontsLoaded) {
    return null;
  }

  return (
    <TranslationProvider>
      <Stack>
        <Stack.Screen
          name="home/home"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="banking/banking"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="housing/housing"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="legal/legal"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="english/english"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="jobs/jobs"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="favourite/favourite"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="emergency/emergency"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile/profile"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </TranslationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    flex: 1,
  },
});
