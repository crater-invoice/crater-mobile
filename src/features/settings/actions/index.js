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

//  Taxes
// -------------------------------------------------
export const getTaxes = payload => ({
  type: TYPES.GET_TAXES,
  payload
});

export const setTaxes = payload => ({
  type: TYPES.SET_TAXES,
  payload
});

export const addTax = payload => ({
  type: TYPES.TAX_ADD,
  payload
});

export const editTax = payload => ({
  type: TYPES.TAX_EDIT,
  payload
});

export const removeTax = payload => ({
  type: TYPES.REMOVE_TAX,
  payload
});

export const setTax = payload => ({
  type: TYPES.SET_TAX,
  payload
});

export const setEditTax = payload => ({
  type: TYPES.SET_EDIT_TAX,
  payload
});

export const setRemoveTax = payload => ({
  type: TYPES.SET_REMOVE_TAX,
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
