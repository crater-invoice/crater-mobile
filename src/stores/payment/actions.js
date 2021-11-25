import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value}
  };
}

/**
 * Fetch payments
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchPayments(payload = {}) {
  return {
    type: types.FETCH_PAYMENTS,
    payload
  };
}

/**
 * Fetch next payment number
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchNextPaymentNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_PAYMENT_NUMBER,
  payload
});

/**
 * Fetch single payment
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSinglePayment(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_PAYMENT,
    payload: {id, onSuccess}
  };
}

/**
 * Fetch payment initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchPaymentInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Add payment
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addPayment(payload = {}) {
  return {
    type: types.ADD_PAYMENT,
    payload
  };
}

/**
 * Update payment
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updatePayment(payload = {}) {
  return {
    type: types.UPDATE_PAYMENT,
    payload
  };
}

/**
 * Remove payment
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removePayment(id) {
  return {
    type: types.REMOVE_PAYMENT,
    payload: {id}
  };
}

/**
 * Send payment receipt
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function sendPaymentReceipt(payload = {}) {
  return {
    type: types.SEND_PAYMENT_RECEIPT,
    payload
  };
}

/**
 * Fetch payment invoices
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchPaymentInvoices(payload = {}) {
  return {
    type: types.FETCH_PAYMENT_INVOICES,
    payload
  };
}
