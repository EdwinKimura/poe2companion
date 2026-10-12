
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
import { getItemsCount } from '../database/repositories/ItemsRepository';
import ITEMS_SYNC from '../services/sync/configs/itemsSync';
import ITEM_STATS_SYNC from '../services/sync/configs/itemStatsSync';
import { syncData } from '../services/sync/syncData';

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
        const database = await getDatabase();

        const result = await database.getFirstAsync<{
          status: string;
        }>(
          `SELECT status
          FROM sync_state
          WHERE dataset = 'items'`,
        );

        await logDatabaseTables();

        const count = await getItemsCount(database);

        console.log('[SQLite] Registros existentes:', count);
        console.log('[Sync] Estado anterior:', result?.status ?? 'não iniciado');


        console.log(
          '[Sync] Sincronização inicial ou incompleta. Iniciando...',
        );

        await syncData(ITEMS_SYNC);
        await syncData(ITEM_STATS_SYNC);
      } catch (error) {
        console.error(
          '[Sync] Erro ao inicializar os itens:',
          error,
        );
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
