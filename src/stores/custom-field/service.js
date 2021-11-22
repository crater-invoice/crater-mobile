import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch custom-fields
 * @param q : queryString
 * @returns {*}
 */
export const fetchCustomFields = q => {
  return Request.get(`/custom-fields?${queryString.stringify(q)}`);
};

/**
 * Fetch single custom-field
 * @param id : custom-field id
 * @returns {*}
 */
export const fetchSingleCustomField = id => {
  return Request.get(`/custom-fields/${id}`);
};

/**
 * Add custom-field
 * @param data
 * @returns {*}
 */
export const addCustomField = data => {
  return Request.post(`/custom-fields`, data);
};

/**
 * Update custom-field
 * @param id : custom-field id
 * @param data
 * @returns {*}
 */
export const updateCustomField = (id, data) => {
  return Request.put(`/custom-fields/${id}`, data);
};

/**
 * Remove custom-field
 * @param id : custom-field id
 * @returns {*}
 */
export const removeCustomField = id => {
  return Request.delete(`/custom-fields/${id}`);
};
