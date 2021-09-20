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
 * fetch Next-Number
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchNextNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_NUMBER,
  payload
});

/**
 * fetch Customize-Settings
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchCustomizeSettings = (keys, onSuccess) => ({
  type: types.FETCH_CUSTOMIZE_SETTINGS,
  payload: {keys, onSuccess}
});

/**
 * update customizes data
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateCustomizeSettings = (payload = {}) => ({
  type: types.UPDATE_CUSTOMIZE_SETTINGS,
  payload
});
