import * as types from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const settingsTriggerSpinner = payload => ({
  type: types.SETTINGS_TRIGGER_SPINNER,
  payload
});

/**
 * get payment-modes list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getPaymentModes = (payload = {}) => ({
  type: types.GET_PAYMENT_MODES,
  payload
});

/**
 * set payment-modes list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setPaymentModes = (payload = {}) => ({
  type: types.SET_PAYMENT_MODES,
  payload
});

/**
 * set single payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setPaymentMode = (payload = {}) => ({
  type: types.SET_PAYMENT_MODE,
  payload
});

/**
 * create payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const createPaymentMode = (payload = {}) => ({
  type: types.CREATE_PAYMENT_MODE,
  payload
});

/**
 * update payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const editPaymentMode = (payload = {}) => ({
  type: types.EDIT_PAYMENT_MODE,
  payload
});

/**
 * remove payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removePaymentMode = (payload = {}) => ({
  type: types.REMOVE_PAYMENT_MODE,
  payload
});
