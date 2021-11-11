import * as TYPES from '../constants';

export const settingsTriggerSpinner = payload => ({
  type: TYPES.SETTINGS_TRIGGER_SPINNER,
  payload
});

// Settings
// -------------------------------------------------
export const getSettingItem = payload => ({
  type: TYPES.GET_SETTING_ITEM,
  payload
});

export const editSettingItem = payload => ({
  type: TYPES.EDIT_SETTING_ITEM,
  payload
});

// General Settings

export const getGeneralSetting = (payload = {}) => ({
  type: TYPES.GET_GENERAL_SETTING,
  payload
});

// Next Number
export const getNextNumber = (payload = {}) => ({
  type: TYPES.GET_NEXT_NUMBER,
  payload
});

export const getSettingInfo = (payload = {}) => ({
  type: TYPES.GET_SETTING_INFO,
  payload
});

// Biometry Auth
export const setBiometryAuthType = (payload = {}) => ({
  type: TYPES.SET_BIOMETRY_AUTH_TYPE,
  payload
});
