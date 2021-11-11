import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch customers
 * @param q : queryString
 * @returns {*}
 */
export const fetchCustomers = q => {
  return Request.get({path: `customers?${queryString.stringify(q)}`});
};

/**
 * Fetch single customer
 * @param id : customer id
 * @returns {*}
 */
export const fetchSingleCustomer = id => {
  return Request.get({path: `customers/${id}`});
};

/**
 * Add customer
 * @param body : params
 * @returns {*}
 */
export const addCustomer = body => {
  return Request.post({path: `customers`, body});
};

/**
 * Update customer
 * @param id : customer id
 * @param body : params
 * @returns {*}
 */
export const updateCustomer = (id, body) => {
  return Request.put({path: `customers/${id}`, body});
};

/**
 * Remove customer
 * @param id : customer id
 * @returns {*}
 */
export const removeCustomer = id => {
  return Request.post({path: `customers/delete`, body: {ids: [id]}});
};
