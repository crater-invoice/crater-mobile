import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch taxes
 * @param q : queryString
 * @returns {*}
 */
export const fetchTaxes = q => {
  return Request.get(`/tax-types?${queryString.stringify(q)}`);
};

/**
 * Fetch single tax
 * @param id : tax id
 * @returns {*}
 */
export const fetchSingleTax = id => {
  return Request.get(`/tax-types/${id}`);
};

/**
 * Add tax
 * @param data
 * @returns {*}
 */
export const addTax = data => {
  return Request.post(`/tax-types`, data);
};

/**
 * Update tax
 * @param id : tax id
 * @param data
 * @returns {*}
 */
export const updateTax = (id, data) => {
  return Request.put(`/tax-types/${id}`, data);
};

/**
 * Remove tax
 * @param id : tax id
 * @returns {*}
 */
export const removeTax = id => {
  return Request.delete(`/tax-types/${id}`);
};
