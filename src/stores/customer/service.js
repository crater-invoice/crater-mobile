import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch customers
 * @param q : queryString
 * @returns {*}
 */
export const fetchCustomers = q => {
  return Request.get(`/customers?${queryString.stringify(q)}`);
};

/**
 * Fetch single customer
 * @param id : customer id
 * @returns {*}
 */
export const fetchSingleCustomer = id => {
  return Request.get(`/customers/${id}`);
};

/**
 * Add customer
 * @param data
 * @returns {*}
 */
export const addCustomer = data => {
  return Request.post(`/customers`, data);
};

/**
 * Update customer
 * @param id : customer id
 * @param data
 * @returns {*}
 */
export const updateCustomer = (id, data) => {
  return Request.put(`/customers/${id}`, data);
};

/**
 * Remove customer
 * @param id : customer id
 * @returns {*}
 */
export const removeCustomer = id => {
  return Request.post(`/customers/delete`, {ids: [id]});
};
