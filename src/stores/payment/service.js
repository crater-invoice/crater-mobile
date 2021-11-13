import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch payments
 * @param q : queryString
 * @returns {*}
 */
export const fetchPayments = q => {
  return Request.get({path: `payments?${queryString.stringify(q)}`});
};

/**
 * Fetch single payment
 * @param id : payment id
 * @returns {*}
 */
export const fetchSinglePayment = id => {
  return Request.get({path: `payments/${id}`});
};

/**
 * Add payment
 * @param body : params
 * @returns {*}
 */
export const addPayment = body => {
  return Request.post({path: `payments`, body});
};

/**
 * Update payment
 * @param id : payment id
 * @param body : params
 * @returns {*}
 */
export const updatePayment = (id, body) => {
  return Request.put({path: `payments/${id}`, body});
};

/**
 * Remove payment
 * @param id : payment id
 * @returns {*}
 */
export const removePayment = id => {
  return Request.post({path: `payments/delete`, body: {ids: [id]}});
};

/**
 * Send payment receipt
 * @param id : payment id
 * @param body : params
 * @returns {*}
 */
export const sendPaymentReceipt = (id, body) => {
  return Request.post({path: `payments/${id}/send`, body});
};

/**
 * Fetch unpaid invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchUnpaidInvoices = q => {
  return Request.get({path: `invoices?${queryString.stringify(q)}`});
};

/**
 * Fetch next payment number
 * @returns {*}
 */
export const fetchNextPaymentNumber = () => {
  return Request.get({path: `next-number?key=payment`});
};
