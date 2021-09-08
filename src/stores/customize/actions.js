import * as TYPES from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const settingsTriggerSpinner = payload => ({
  type: TYPES.SETTINGS_TRIGGER_SPINNER,
  payload
});

/**
 * get customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getCustomizeSettings = (payload = {}) => ({
  type: TYPES.GET_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * set customizes settings
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setCustomizeSettings = (payload = {}) => ({
  type: TYPES.SET_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * edit customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const editCustomizeSettings = (payload = {}) => ({
  type: TYPES.EDIT_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * edit setting data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const editSettingItem = payload => ({
  type: TYPES.EDIT_SETTING_ITEM,
  payload
});
