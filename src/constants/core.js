export const BUTTON_COLOR = {
  PRIMARY: 'primary',
  PRIMARY_LIGHT: 'primaryLight',
  SUCCESS: 'success',
  SUCCESS_LIGHT: 'successLight',
  SUCCESS_DARK: 'successDark',
  INFO: 'info',
  DANGER: 'danger',
  DANGER_LIGHT: 'dangerLight',
  DANGER_DARK: 'dangerDark',
  WARNING: 'warning',
  WARNING_LIGHT: 'warningLight',
  WARNING_DARK: 'warningDark',
  DARK: 'dark',
  DARK2: 'dark2',
  DARK3: 'dark3',
  VERY_LIGHT_GRAY: 'veryLightGray',
  LIGHT_GRAY: 'lightGray',
  DARK_GRAY: 'darkGray',
  VERY_DARK_GRAY: 'veryDarkGray',
  PINK: 'pink',
  LIGHT_GREEN: 'lightGreen',
  WHITE: 'white'
};

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const TIME_FORMAT_MERIDIEM = 'hh:mm A';

export const SWITCH_THEME = 'SWITCH_THEME';
export const BIOMETRY_AUTH_TYPES = {
  FINGERPRINT: 'FINGERPRINT',
  FACE: 'FACE'
};

export const switchTheme = (payload = {}) => ({
  type: SWITCH_THEME,
  payload
});
