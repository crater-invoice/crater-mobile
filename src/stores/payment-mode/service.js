import Request from 'utils/request';
import * as queryString from 'query-string';
/**
 * fetch payment-modes
 * @param q : queryString
 * @returns {*}
 */
export const fetchPaymentModes = q => {
  return Request.get(`/payment-methods?${queryString.stringify(q)}`);
};

/**
 * Add payment-mode
 * @param data
 * @returns {*}
 */
export const addPaymentMode = data => {
  return Request.post(`/payment-methods`, data);
};

/**
 * Update payment-mode
 * @param id : payment-mode id
 * @param data
 * @returns {*}
 */
export const updatePaymentMode = data => {
  return Request.put(`/payment-methods/${data.id}`, data);
};

/**
 * Remove payment-mode
 * @param id : payment-mode id
 * @returns {*}
 */
export const removePaymentMode = id => {
  return Request.delete(`/payment-methods/${id}`);
};
