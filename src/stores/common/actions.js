import * as types from './types';

/**
 * Reset endpoint url
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function resetEndpointUrl(payload = {}) {
  return {
    type: types.RESET_ENDPOINT_URL,
    payload
  };
}
