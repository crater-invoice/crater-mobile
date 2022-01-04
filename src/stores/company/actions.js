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
 * Update company
 * @param params
 * @param logo
 * @returns {{type: string, payload: *}}
 */
export function updateCompany(params, logo = null) {
  return {
    type: types.UPDATE_COMPANY,
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
 * @param isCreateScreen
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchCompanyInitialDetails = (isCreateScreen, onSuccess) => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload: {isCreateScreen, onSuccess}
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

/**
 * Set company setting
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setCompanySetting = (payload = {}) => ({
  type: types.SET_COMPANY_SETTING,
  payload
});

/**
 * fetch company settings
 * @param keys
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchCompanySettings = (keys = null, onSuccess = null) => ({
  type: types.FETCH_COMPANY_SETTINGS,
  payload: {keys, onSuccess}
});

/**
 * update company settings
 * @param params
 * @param navigation
 * @returns {{type: string, payload: *}}
 */
export const updateCompanySettings = (params, navigation = null) => ({
  type: types.UPDATE_COMPANY_SETTINGS,
  payload: {params, navigation}
});
