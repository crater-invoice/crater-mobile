import Request from 'utils/request';
import * as queryString from 'query-string';
/**
 * fetch customization
 *  * @param types : setting types
 * @returns {*}
 */
export const fetchCustomizeSettings = types => {
  return Request.get({
    path: `company/settings`,
    axiosProps: {
      params: {settings: types}
    }
  });
};

/**
 * Update customization
 * @param body : params
 * @returns {*}
 */
export const updateCustomizeSettings = body => {
  return Request.post({path: `company/settings`, body});
};

/**
 * fetch Next-Number
 * @param body : params
 * @returns {*}
 */
export const fetchNextNumber = body => {
  return Request.get({path: `next-number?${queryString.stringify(body)}`});
};
