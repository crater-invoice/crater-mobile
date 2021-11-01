import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value}
  };
}

/**
 * Fetch current user
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCurrentUser(payload) {
  return {
    type: types.FETCH_CURRENT_USER,
    payload
  };
}

/**
 * Update current user
 * @param params
 * @param avatar
 * @returns {{type: string, payload: *}}
 */
export function updateCurrentUser(params, avatar) {
  return {
    type: types.UPDATE_CURRENT_USER,
    payload: {params, avatar}
  };
}

/**
 * Set current user
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setCurrentUser = payload => ({
  type: types.SET_CURRENT_USER,
  payload
});

/**
 * Set user setting
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setUserSetting = (payload = {}) => ({
  type: types.SET_USER_SETTING,
  payload
});
