import * as types from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function spinner(payload) {
  return {
    type: types.SPINNER,
    payload
  };
}

/**
 * Fetch Currencies
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCurrencies(payload = {}) {
  return {
    type: types.FETCH_CURRENCIES,
    payload
  };
}

/**
 * Fetch Languages
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchLanguages(payload = {}) {
  return {
    type: types.FETCH_LANGUAGES,
    payload
  };
}

/**
 * Fetch Time-zones
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchTimezones(payload = {}) {
  return {
    type: types.FETCH_TIMEZONES,
    payload
  };
}

/**
 * Fetch Date-Formats
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchDateFormats(payload = {}) {
  return {
    type: types.FETCH_DATE_FORMATS,
    payload
  };
}

/**
 * Fetch Fiscal-Years
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchFiscalYears(payload = {}) {
  return {
    type: types.FETCH_FISCAL_YEARS,
    payload
  };
}

/**
 * Fetch Retrospective-Edits
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchRetrospectives(payload = {}) {
  return {
    type: types.FETCH_RETROSPECTIVES,
    payload
  };
}

/**
 * Fetch preferences
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchPreferences(payload = {}) {
  return {
    type: types.FETCH_PREFERENCES,
    payload
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
