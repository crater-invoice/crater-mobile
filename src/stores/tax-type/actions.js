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
 * Fetch taxes
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchTaxes(payload = {}) {
  return {
    type: types.FETCH_TAXES,
    payload
  };
}

/**
 * Fetch single tax
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleTax(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_TAX,
    payload: {id, onSuccess}
  };
}

/**
 * Add tax
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addTax(payload = {}) {
  return {
    type: types.ADD_TAX,
    payload
  };
}

/**
 * Update tax
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateTax(payload = {}) {
  return {
    type: types.UPDATE_TAX,
    payload
  };
}

/**
 * Remove tax
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeTax(id) {
  return {
    type: types.REMOVE_TAX,
    payload: {id}
  };
}
