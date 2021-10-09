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
 * Fetch recurring-invoices
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchRecurringInvoices(payload = {}) {
  return {
    type: types.FETCH_RECURRING_INVOICES,
    payload
  };
}

/**
 * Fetch single recurring-invoice
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleRecurringInvoice(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_RECURRING_INVOICE,
    payload: {id, onSuccess}
  };
}

/**
 * Add recurring-invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addRecurringInvoice(payload = {}) {
  return {
    type: types.ADD_RECURRING_INVOICE,
    payload
  };
}

/**
 * Update recurring-invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateRecurringInvoice(payload = {}) {
  return {
    type: types.UPDATE_RECURRING_INVOICE,
    payload
  };
}

/**
 * Remove recurring-invoice
 * @param id
 * @param navigation
 * @param onFail
 * @returns {{type: string, payload: *}}
 */
export function removeRecurringInvoice(id, navigation, onFail) {
  return {
    type: types.REMOVE_RECURRING_INVOICE,
    payload: {id, navigation, onFail}
  };
}
