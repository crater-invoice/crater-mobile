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

// Custom Fields
// -------------------------------------------------
export const getCustomFields = (payload = {}) => ({
  type: TYPES.GET_CUSTOM_FIELDS,
  payload
});

export const setCustomFields = (payload = {}) => ({
  type: TYPES.SET_CUSTOM_FIELDS,
  payload
});

export const createCustomField = (payload = {}) => ({
  type: TYPES.CREATE_CUSTOM_FIELD,
  payload
});

export const getCustomField = (payload = {}) => ({
  type: TYPES.GET_CUSTOM_FIELD,
  payload
});

export const editCustomField = (payload = {}) => ({
  type: TYPES.EDIT_CUSTOM_FIELD,
  payload
});

export const removeCustomField = (payload = {}) => ({
  type: TYPES.REMOVE_CUSTOM_FIELD,
  payload
});

export const createFromCustomFields = (payload = {}) => ({
  type: TYPES.CREATE_FROM_CUSTOM_FIELDS,
  payload
});

export const updateFromCustomFields = (payload = {}) => ({
  type: TYPES.UPDATE_FROM_CUSTOM_FIELDS,
  payload
});

export const removeFromCustomFields = (payload = {}) => ({
  type: TYPES.REMOVE_FROM_CUSTOM_FIELDS,
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
