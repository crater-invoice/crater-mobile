export const NAVIGATION_PERSIST_KEY = 'persist:root';

export const BUTTON_TYPE = {
  SOLID: 'solid',
  OUTLINE: 'outline',
  CLEAR: 'clear'
};

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

export const ENDPOINT_SETTINGS = 'common/ENDPOINT_SETTINGS';
export const ENDPOINT_INITIAL = 'common/ENDPOINT_INITIAL';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const TIME_FORMAT = 'HH:mm';
export const TIME_FORMAT_MERIDIEM = 'hh:mm A';

export const SET_GLOBAL_BOOTSTRAP = 'SET_GLOBAL_BOOTSTRAP';
export const SAVE_ENDPOINT_API = 'SAVE_ENDPOINT_API';
export const SET_SETTINGS = 'SET_SETTINGS';
export const GLOBAL_TRIGGER_SPINNER = 'GLOBAL_TRIGGER_SPINNER';
export const CHECK_OTA_UPDATE = 'CHECK_OTA_UPDATE';
export const SET_LAST_AUTO_UPDATE_DATE = 'SET_LAST_AUTO_UPDATE_DATE';
export const SET_MAIL_CONFIGURATION = 'SET_MAIL_CONFIGURATION';
export const SWITCH_THEME = 'SWITCH_THEME';
export const BIOMETRY_AUTH_TYPES = {
  FINGERPRINT: 'FINGERPRINT',
  FACE: 'FACE'
};

export const switchTheme = (payload = {}) => ({
  type: SWITCH_THEME,
  payload
});
