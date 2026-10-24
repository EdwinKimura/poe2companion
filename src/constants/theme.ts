/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const SVGColors = {
  text: '#F0E9DC',
  muted: '#A49A89',
  gold: '#C7A66A',
  green: '#91A77B',
  unique: 'rgb(175 96 37)',
  stats: '#858585',
  statsLink: '#04bdbde3',
  disabled: '#464646',
}

export const Colors = {
  light: {
    backgroundElement: '#F0F0F3',
    backgroundSelected: '#E0E1E6',
    textSecondary: '#60646C',
    background: '#10100F',
    surface: '#1B1A18',
    surfaceLight: '#26231F',
    border: '#383128',
    text: '#F0E9DC',
    muted: '#A49A89',
    gold: '#C7A66A',
    green: '#91A77B',
    unique: 'rgb(175 96 37)',
    stats: '#858585',
    statsLink: '#04bdbde3',
    disabled: '#464646',
  },
  dark: {
    backgroundElement: '#212225',
    backgroundSelected: '#2E3135',
    textSecondary: '#B0B4BA',
    background: '#10100F',
    surface: '#1B1A18',
    surfaceLight: '#26231F',
    border: '#383128',
    text: '#F0E9DC',
    muted: '#A49A89',
    gold: '#C7A66A',
    green: '#91A77B',
    unique: 'rgb(175 96 37)',
    stats: '#858585',
    statsLink: '#04bdbde3',
    disabled: '#464646',
    fire: '#b30505',
    cold: '#38d0ff',
    lightning: '#fffc43',
    chaos: '#d634ff',
    poison: '#12fa31',
    statsItem: '#6575d1'
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    cinzel: {
      regular: 'Cinzel_400Regular',
      medium: 'Cinzel_500Medium',
      semiBold: 'Cinzel_600SemiBold',
      bold: 'Cinzel_700Bold',
      extraBold: 'Cinzel_800ExtraBold',
      black: 'Cinzel_900Black'
    },
    inter: {
      thin: 'Inter_100Thin',
      extraLight: 'Inter_200ExtraLight',
      Light: 'Inter_300Light',
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
      extraBold: 'Inter_800ExtraBold',
      black: 'Inter_900Black',
    }
  },
  android: {
    cinzel: {
      regular: 'Cinzel_400Regular',
      medium: 'Cinzel_500Medium',
      semiBold: 'Cinzel_600SemiBold',
      bold: 'Cinzel_700Bold',
      extraBold: 'Cinzel_800ExtraBold',
      black: 'Cinzel_900Black'
    },
    inter: {
      thin: 'Inter_100Thin',
      extraLight: 'Inter_200ExtraLight',
      Light: 'Inter_300Light',
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
      extraBold: 'Inter_800ExtraBold',
      black: 'Inter_900Black',
    }
  },
  default: {
    cinzel: {
      regular: 'Cinzel_400Regular',
      medium: 'Cinzel_500Medium',
      semiBold: 'Cinzel_600SemiBold',
      bold: 'Cinzel_700Bold',
      extraBold: 'Cinzel_800ExtraBold',
      black: 'Cinzel_900Black'
    },
    inter: {
      thin: 'Inter_100Thin',
      extraLight: 'Inter_200ExtraLight',
      Light: 'Inter_300Light',
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
      extraBold: 'Inter_800ExtraBold',
      black: 'Inter_900Black',
    }
  },
  web: {
    cinzel: {
      regular: 'Cinzel_400Regular',
      medium: 'Cinzel_500Medium',
      semiBold: 'Cinzel_600SemiBold',
      bold: 'Cinzel_700Bold',
      extraBold: 'Cinzel_800ExtraBold',
      black: 'Cinzel_900Black'
    },
    inter: {
      thin: 'Inter_100Thin',
      extraLight: 'Inter_200ExtraLight',
      Light: 'Inter_300Light',
      regular: 'Inter_400Regular',
      medium: 'Inter_500Medium',
      semiBold: 'Inter_600SemiBold',
      bold: 'Inter_700Bold',
      extraBold: 'Inter_800ExtraBold',
      black: 'Inter_900Black',
    }
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
