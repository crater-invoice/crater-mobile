import * as types from './types';

/**
 *Fetch Tax And Discount Per item.
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
