import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value}
});

/**
 * Fetch invoice initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchInvoiceInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Fetch next invoice number
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchNextInvoiceNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_INVOICE_NUMBER,
  payload
});

/**
 * Fetch invoices
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchInvoices = (payload = {}) => ({
  type: types.FETCH_INVOICES,
  payload
});

/**
 * Fetch single invoice
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchSingleInvoice = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_INVOICE,
  payload: {id, onSuccess}
});

/**
 * Add invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addInvoice = (payload = {}) => ({
  type: types.ADD_INVOICE,
  payload
});

/**
 * Update invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateInvoice = (payload = {}) => ({
  type: types.UPDATE_INVOICE,
  payload
});

/**
 * Update invoice status
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const changeInvoiceStatus = (payload = {}) => ({
  type: types.CHANGE_INVOICE_STATUS,
  payload
});

/**
 * Remove invoice
 * @param id
 * @param navigation
 * @returns {{type: string, payload: *}}
 */
export const removeInvoice = (id, navigation) => ({
  type: types.REMOVE_INVOICE,
  payload: {id, navigation}
});

/**
 * Add invoice item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addInvoiceItem = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM,
  payload
});

/**
 * Set invoice items
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setInvoiceItems = (payload = {}) => ({
  type: types.ADD_INVOICE_ITEM_SUCCESS,
  payload
});

/**
 * Remove invoice item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_INVOICE_ITEM,
  payload
});

/**
 * Send invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const sendInvoice = (payload = {}) => ({
  type: types.SEND_INVOICE,
  payload
});
