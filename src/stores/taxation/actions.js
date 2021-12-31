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
 * Fetch taxation
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchTaxation(onSuccess) {
  return {
    type: types.FETCH_TAXATION,
    payload: {onSuccess}
  };
}

/**
 * Update taxation
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateTaxationType(payload = {}) {
  return {
    type: types.UPDATE_TAXATION,
    payload
  };
}
