import * as types from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const spinner = payload => ({
  type: types.SPINNER,
  payload
});

/**
 * get customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchCustomizeSettings = (payload = {}) => ({
  type: types.FETCH_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * set customizes settings
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setCustomizeSettings = (payload = {}) => ({
  type: types.SET_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * edit customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateCustomizeSettings = (payload = {}) => ({
  type: types.UPDATE_CUSTOMIZE_SETTINGS,
  payload
});

/**
 * edit setting data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const editSettingItem = payload => ({
  type: types.EDIT_SETTING_ITEM,
  payload
});
