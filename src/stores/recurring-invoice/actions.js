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
 * Fetch Next-Invoice-At
 * @param id
 * @param onSuccess
 */
export const fetchNextInvoiceAt = ({params, onSuccess}) => ({
  type: types.FETCH_NEXT_INVOICE_AT,
  payload: {params, onSuccess}
});

/**
 * Fetch recurring invoice initial details
 *
 */
export const fetchRecurringInvoiceInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Fetch recurring-invoices
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchRecurringInvoices = (payload = {}) => ({
  type: types.FETCH_RECURRING_INVOICES,
  payload
});

/**
 * Fetch single recurring-invoice
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchSingleRecurringInvoice = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_RECURRING_INVOICE,
  payload: {id, onSuccess}
});

/**
 * Add recurring-invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addRecurringInvoice = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE,
  payload
});

/**
 * Update recurring-invoice
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateRecurringInvoice = (payload = {}) => ({
  type: types.UPDATE_RECURRING_INVOICE,
  payload
});

/**
 * Remove recurring-invoice
 * @param id
 * @returns {{type: string, payload: *}}
 */
export const removeRecurringInvoice = id => ({
  type: types.REMOVE_RECURRING_INVOICE,
  payload: {id}
});

/**
 * Add recurring-invoice item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addRecurringInvoiceItem = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM,
  payload
});

/**
 * Set recurring-invoice items
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setRecurringInvoiceItems = (payload = {}) => ({
  type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
  payload
});

/**
 * Remove recurring-invoice item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeRecurringInvoiceItem = (payload = {}) => ({
  type: types.REMOVE_RECURRING_INVOICE_ITEM,
  payload
});
