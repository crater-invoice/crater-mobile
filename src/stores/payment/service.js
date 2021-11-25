import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch payments
 * @param q : queryString
 * @returns {*}
 */
export const fetchPayments = q => {
  return Request.get(`/payments?${queryString.stringify(q)}`);
};

/**
 * Fetch single payment
 * @param id : payment id
 * @returns {*}
 */
export const fetchSinglePayment = id => {
  return Request.get(`/payments/${id}`);
};

/**
 * Add payment
 * @param data
 * @returns {*}
 */
export const addPayment = data => {
  return Request.post(`/payments`, data);
};

/**
 * Update payment
 * @param id : payment id
 * @param data
 * @returns {*}
 */
export const updatePayment = (id, data) => {
  return Request.put(`/payments/${id}`, data);
};

/**
 * Remove payment
 * @param id : payment id
 * @returns {*}
 */
export const removePayment = id => {
  return Request.post(`/payments/delete`, {ids: [id]});
};

/**
 * Send payment receipt
 * @param id : payment id
 * @param data
 * @returns {*}
 */
export const sendPaymentReceipt = (id, data) => {
  return Request.post(`/payments/${id}/send`, data);
};

/**
 * Fetch payment invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchPaymentInvoices = q => {
  return Request.get(`/invoices?${queryString.stringify(q)}`);
};

/**
 * Fetch next payment number
 * @param q : queryString
 * @returns {*}
 */
export const fetchNextPaymentNumber = q => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};
