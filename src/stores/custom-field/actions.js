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
 * Fetch custom-fields
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCustomFields(payload = {}) {
  return {
    type: types.FETCH_CUSTOM_FIELDS,
    payload
  };
}

/**
 * Fetch single custom-field
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleCustomField(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CUSTOM_FIELD,
    payload: {id, onSuccess}
  };
}

/**
 * Add custom-field
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addCustomField(payload = {}) {
  return {
    type: types.ADD_CUSTOM_FIELD,
    payload
  };
}

/**
 * Update custom-field
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateCustomField(payload = {}) {
  return {
    type: types.UPDATE_CUSTOM_FIELD,
    payload
  };
}

/**
 * Remove custom-field
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeCustomField(id) {
  return {
    type: types.REMOVE_CUSTOM_FIELD,
    payload: {id}
  };
}
