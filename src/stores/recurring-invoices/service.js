import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Add recurring-invoices item.
 * @param body : params
 * @returns {*}
 */
export const addRecurringInvoiceItem = body => {
  return Request.post({path: `items`, body});
};

/**
 * Update recurring-invoices item.
 * @param id : recurring-invoice item id
 * @param body : params
 * @returns {*}
 */
export const updateRecurringInvoiceItem = (id, body) => {
  return Request.put({path: `items/${id}`, body});
};

/**
 * Fetch Next-Invoice-At.
 * @param body : params
 * @returns {*}
 */
export const fetchNextInvoiceAt = body => {
  return Request.get({
    path: `recurring-invoice-frequency?${queryString.stringify(body)}`
  });
};

/**
 * Fetch Invoice Templates
 * @returns {*}
 */
export const fetchInvoiceTemplates = () => {
  return Request.get({path: `invoices/templates`});
};

/**
 * Fetch recurring-invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchRecurringInvoices = q => {
  return Request.get({path: `recurring-invoices?${queryString.stringify(q)}`});
};

/**
 * Fetch single recurring-invoice
 * @param id : recurring-invoice id
 * @returns {*}
 */
export const fetchSingleRecurringInvoice = id => {
  return Request.get({path: `recurring-invoices/${id}`});
};

/**
 * Add recurring-invoice
 * @param body : params
 * @returns {*}
 */
export const addRecurringInvoice = body => {
  return Request.post({path: `recurring-invoices`, body});
};

/**
 * Update recurring-invoice
 * @param id : recurring-invoice id
 * @param body : params
 * @returns {*}
 */
export const updateRecurringInvoice = (id, body) => {
  return Request.put({path: `recurring-invoices/${id}`, body});
};

/**
 * Remove recurring-invoice
 * @param id : recurring-invoice id
 * @returns {*}
 */
export const removeRecurringInvoice = body => {
  return Request.post({path: `recurring-invoices/delete`, body});
};
