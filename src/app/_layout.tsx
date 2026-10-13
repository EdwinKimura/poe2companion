
import { DarkTheme, DefaultTheme, ThemeProvider } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';

import {
  Cinzel_400Regular,
  Cinzel_500Medium,
  Cinzel_600SemiBold,
  Cinzel_700Bold,
  Cinzel_800ExtraBold,
  Cinzel_900Black
} from "@expo-google-fonts/cinzel";

import {
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black
} from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import AppTabs from '@/components/app-tabs';

import { getDatabase, logDatabaseTables } from '../database/database';
import { syncAllData } from '../services/sync/syncAllData';

SplashScreen.preventAutoHideAsync();

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [fontLoaded, fontError] = useFonts({
    'Cinzel_400Regular':   Cinzel_400Regular,
    'Cinzel_500Medium':    Cinzel_500Medium,
    'Cinzel_600SemiBold':  Cinzel_600SemiBold,
    'Cinzel_700Bold':      Cinzel_700Bold,
    'Cinzel_800ExtraBold': Cinzel_800ExtraBold,
    'Cinzel_900Black':     Cinzel_900Black,
    'Inter_100Thin':       Inter_100Thin,
    'Inter_300Light':      Inter_300Light,
    'Inter_200ExtraLight': Inter_200ExtraLight,
    'Inter_400Regular':    Inter_400Regular,
    'Inter_500Medium':     Inter_500Medium,
    'Inter_600SemiBold':   Inter_600SemiBold,
    'Inter_700Bold':       Inter_700Bold,
    'Inter_800ExtraBold':  Inter_800ExtraBold,
    'Inter_900Blac':       Inter_900Black  
  })

  useEffect(() => {
    async function initializeItems() {
      try {
        await getDatabase();
        await logDatabaseTables();
        const result = await syncAllData();
        console.log('[Sync] Inicialização concluída:', result);
      } catch (error) {
        console.error('[Sync] Erro na sincronização inicial:', error);
      }
    }

    void initializeItems();
  }, []);

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <ThemeProvider
      value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <AnimatedSplashOverlay />
      <AppTabs />
    </ThemeProvider>
  );
}
