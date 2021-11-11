import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch custom-fields
 * @param q : queryString
 * @returns {*}
 */
export const fetchCustomFields = q => {
  return Request.get({path: `custom-fields?${queryString.stringify(q)}`});
};

/**
 * Fetch single custom-field
 * @param id : custom-field id
 * @returns {*}
 */
export const fetchSingleCustomField = id => {
  return Request.get({path: `custom-fields/${id}`});
};

/**
 * Add custom-field
 * @param body : params
 * @returns {*}
 */
export const addCustomField = body => {
  return Request.post({path: `custom-fields`, body});
};

/**
 * Update custom-field
 * @param id : custom-field id
 * @param body : params
 * @returns {*}
 */
export const updateCustomField = (id, body) => {
  return Request.put({path: `custom-fields/${id}`, body});
};

/**
 * Remove custom-field
 * @param id : custom-field id
 * @returns {*}
 */
export const removeCustomField = id => {
  return Request.delete({path: `custom-fields/${id}`});
};
