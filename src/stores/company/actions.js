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
 * Add company
 * @param params
 * @param logo
 * @returns {{type: string, payload: *}}
 */
export function addCompany(params, logo) {
  return {
    type: types.ADD_COMPANY,
    payload: {params, logo}
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

/**
 * Fetch company initial details
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchCompanyInitialDetails = payload => ({
  type: types.FETCH_COMPANY_INITIAL_DETAILS,
  payload
});

/**
 * Set selected company
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setSelectedCompany = payload => ({
  type: types.SET_SELECTED_COMPANY,
  payload
});
