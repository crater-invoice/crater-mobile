import * as types from './types';

/**
 * Fetch Tax And Discount Per item.
 * @returns {{type: string, payload: *}}
 */
export function fetchTaxAndDiscountPerItem() {
  return {type: types.FETCH_TAX_AND_DISCOUNT_PER_ITEM};
}

/**
 * Save endpoint url
 * @param url
 * @param navigation
 * @param onResult
 * @returns {{type: string, payload: *}}
 */
export function saveEndpointURL(url, navigation, onResult) {
  return {
    type: types.SAVE_ENDPOINT_URL,
    payload: {url, navigation, onResult}
  };
}

/**
 * Fetch bootstrap
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchBootstrap(payload = null) {
  return {
    type: types.FETCH_BOOTSTRAP,
    payload: {onSuccess: payload}
  };
}

/**
 * Check OTA update
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function checkOTAUpdate(payload = {}) {
  return {
    type: types.CHECK_OTA_UPDATE,
    payload
  };
}

/**
 * Set last OTA check date
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function setLastOTACheckDate(payload = {}) {
  return {
    type: types.SET_LAST_OTA_CHECK_DATE,
    payload
  };
}

/**
 * Fetch countries
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCountries() {
  return {
    type: types.FETCH_COUNTRIES,
    payload: {}
  };
}

/**
 * Check exchange rate
 * @param id currency id
 * @param onSuccess callback when success
 * @param onFail callback when fail
 * @returns {{type: string, payload: *}}
 */
export function checkExchangeRate(id, onSuccess, onFail) {
  return {
    type: types.CHECK_EXCHANGE_RATE,
    payload: {id, onSuccess, onFail}
  };
}

/**
 * Check exchange rate provider
 * @param id currency id
 * @param onSuccess
 * @param onFail callback when fail
 * @returns {{type: string, payload: *}}
 */
export function checkExchangeRateProvider(id, onSuccess, onFail) {
  return {
    type: types.CHECK_EXCHANGE_RATE_PROVIDER,
    payload: {id, onSuccess, onFail}
  };
}
