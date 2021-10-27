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
 * Fetch companies
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCompanies(payload = {}) {
  return {
    type: types.FETCH_COMPANIES,
    payload
  };
}

/**
 * Fetch single company
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleCompany(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_COMPANY,
    payload: {id, onSuccess}
  };
}

/**
 * Add company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addCompany(payload = {}) {
  return {
    type: types.ADD_COMPANY,
    payload
  };
}

/**
 * Update company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateCompany(payload = {}) {
  return {
    type: types.UPDATE_COMPANY,
    payload
  };
}

/**
 * Remove company
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeCompany(id) {
  return {
    type: types.REMOVE_COMPANY,
    payload: {id}
  };
}

/**
 * Fetch preferences
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchPreferences(onSuccess) {
  return {
    type: types.FETCH_PREFERENCES,
    payload: {onSuccess}
  };
}

/**
 * Update preferences
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updatePreferences = payload => ({
  type: types.UPDATE_PREFERENCES,
  payload
});
