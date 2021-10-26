import * as types from './types';

/**
 * Login
 * @param params
 * @param onResult
 * @returns {{type: string, payload: *}}
 */
export function login(params, onResult) {
  return {
    type: types.LOGIN,
    payload: {params, onResult}
  };
}

/**
 * Biometry login
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function biometryAuthLogin(payload) {
  return {
    type: types.BIOMETRY_AUTH_LOGIN,
    payload
  };
}

/**
 * Login success
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function loginSuccess() {
  return {
    type: types.LOGIN_SUCCESS,
    payload: null
  };
}

/**
 * Logout success
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function logoutSuccess() {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: null
  };
}

/**
 * Save user id token
 * @param token
 * @returns {{type: string, payload: *}}
 */
export function saveIdToken(token) {
  return {
    type: types.SAVE_ID_TOKEN,
    payload: token
  };
}

/**
 * Send forgot password mail
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function sendForgotPasswordMail(payload = {}) {
  return {
    type: types.SEND_FORGOT_PASSWORD_MAIL,
    payload
  };
}
