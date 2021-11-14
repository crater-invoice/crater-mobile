import * as types from './types';

/**
 * Set biometry authentication
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setBiometryAuthType = payload => ({
  type: types.SET_BIOMETRY_AUTH_TYPE,
  payload
});

/**
 * Fetch mail configuration
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchMailConfig = payload => ({
  type: types.FETCH_MAIL_CONFIG,
  payload
});
