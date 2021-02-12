import { Appearance } from 'react-native-appearance';

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
