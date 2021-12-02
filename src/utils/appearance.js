import {Appearance} from 'react-native-appearance';
import {store} from '@/stores';

export const SYSTEM_APPEARANCE_COLOR = {
  LIGHT: 'light',
  DARK: 'dark',
  NO_PREFERENCE: 'no-preference'
};

export const isDarkMode = () => {
  try {
    const color = Appearance.getColorScheme();
    return color === SYSTEM_APPEARANCE_COLOR.DARK;
  } catch (e) {
    return false;
  }
};

export const STATUS_BAR_CONTENT = {
  light: 'dark-content',
  dark: 'light-content'
};

export const THEME = store?.getState?.()?.common?.theme;
