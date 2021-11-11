import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch taxes
 * @param q : queryString
 * @returns {*}
 */
export const fetchTaxes = q => {
  return Request.get({path: `tax-types?${queryString.stringify(q)}`});
};

/**
 * Fetch single tax
 * @param id : tax id
 * @returns {*}
 */
export const fetchSingleTax = id => {
  return Request.get({path: `tax-types/${id}`});
};

/**
 * Add tax
 * @param body : params
 * @returns {*}
 */
export const addTax = body => {
  return Request.post({path: `tax-types`, body});
};

/**
 * Update tax
 * @param id : tax id
 * @param body : params
 * @returns {*}
 */
export const updateTax = (id, body) => {
  return Request.put({path: `tax-types/${id}`, body});
};

/**
 * Remove tax
 * @param id : tax id
 * @returns {*}
 */
export const removeTax = id => {
  return Request.delete({path: `tax-types/${id}`});
};
