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
 * Fetch currencies
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
 * Fetch languages
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
 * Fetch time-zones
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
 * Fetch date-formats
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
 * Fetch fiscal-years
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
