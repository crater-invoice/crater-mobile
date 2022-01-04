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
 * Fetch sales tax rate
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchSalesTaxRate(payload = {}) {
  return {
    type: types.FETCH_SALES_TAX_RATE,
    payload
  };
}
