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
 * Fetch invoice initial details.
 */
export function fetchInvoiceInitialDetails(payload) {
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
 * Fetch invoices.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchInvoices(payload = {}) {
  return {
    type: types.FETCH_INVOICES,
    payload
  };
}

/**
 * Fetch single invoice.
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleInvoice(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_INVOICE,
    payload: {id, onSuccess}
  };
}

/**
 * Add invoice.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addInvoice(payload = {}) {
  return {
    type: types.ADD_INVOICE,
    payload
  };
}

/**
 * Update invoice.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateInvoice(payload = {}) {
  return {
    type: types.UPDATE_INVOICE,
    payload
  };
}

/**
 * Update invoice status.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateInvoiceStatus(payload = {}) {
  return {
    type: types.UPDATE_INVOICE_STATUS,
    payload
  };
}

/**
 * Remove invoice.
 * @param id
 * @param navigation
 * @param onFail
 * @returns {{type: string, payload: *}}
 */
export function removeInvoice(id, navigation, onFail) {
  return {
    type: types.REMOVE_INVOICE,
    payload: {id, navigation, onFail}
  };
}

/**
 * Add invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addInvoiceItem = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM,
  payload
});

/**
 * Edit invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateItem = (payload = {}) => ({
  type: types.EDIT_ITEM,
  payload
});

/**
 * Set invoice items.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setInvoiceItems = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM_SUCCESS,
  payload
});

/**
 * Remove invoice item.
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_INVOICE_ITEM,
  payload
});
