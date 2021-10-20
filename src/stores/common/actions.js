import * as types from './types';

/**
 *Fetch Tax And Discount Per item.
 * @returns {{type: string, payload: *}}
 */
export function fetchTaxAndDiscountPerItem() {
  return {type: types.FETCH_TAX_AND_DISCOUNT_PER_ITEM};
}

/**
 * Reset endpoint url.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function resetEndpointUrl(payload = {}) {
  return {
    type: types.RESET_ENDPOINT_URL,
    payload
  };
}
