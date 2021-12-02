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
 * fetch payment-modes list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchPaymentModes = (payload = {}) => ({
  type: types.FETCH_PAYMENT_MODES,
  payload
});

/**
 * add payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addPaymentMode = (payload = {}) => ({
  type: types.ADD_PAYMENT_MODE,
  payload
});

/**
 * update payment-mode
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updatePaymentMode = (payload = {}) => ({
  type: types.UPDATE_PAYMENT_MODE,
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
