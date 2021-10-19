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
 * Fetch Next-Invoice-At.
 * @param id
 * @param onSuccess
 */
export function fetchNextInvoiceAt({params, onSuccess}) {
  return {
    type: types.FETCH_NEXT_INVOICE_AT,
    payload: {params, onSuccess}
  };
}

/**
 * Fetch recurring invoice initial details.
 *
 */
export function fetchRecurringInvoiceInitialDetails(payload) {
  return {
    type: types.FETCH_INITIAL_DETAILS,
    payload
  };
}

/**
 * Fetch items.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchItems(onSuccess) {
  return {
    type: types.FETCH_ITEMS,
    payload: {onSuccess}
  };
}

/**
 * Fetch recurring-invoices.
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
 * Fetch single recurring-invoice.
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
 * Add recurring-invoice.
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
 * Update recurring-invoice.
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
 * Remove recurring-invoice.
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

/**
 * Add recurring-invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addRecurringInvoiceItem = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM,
  payload
});

/**
 * Edit recurring-invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateItem = (payload = {}) => ({
  type: types.EDIT_ITEM,
  payload
});

/**
 * Set recurring-invoice items.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setRecurringInvoiceItems = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
  payload
});

/**
 * Remove recurring-invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeRecurringInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_RECURRING_INVOICE_ITEM,
  payload
});

/**
 * Remove recurring-invoice items.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeRecurringInvoiceItems = () => ({
  type: types.REMOVE_RECURRING_INVOICE_ITEMS
});
