import * as TYPES from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const spinner = payload => ({
  type: TYPES.SPINNER,
  payload
});

/**
 * get customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchCustomizeSettings = (payload = {}) => ({
  type: TYPES.FETCH_CUSTOMIZE_SETTINGS,
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
export const updateCustomizeSettings = (payload = {}) => ({
  type: TYPES.UPDATE_CUSTOMIZE_SETTINGS,
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
