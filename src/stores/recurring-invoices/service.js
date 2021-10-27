import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Add recurring-invoices item
 * @param body : params
 * @returns {*}
 */
export const addRecurringInvoiceItem = item => {
  const {price, name, description, taxes, unit_id} = item;
  const body = {name, description, price, unit_id, taxes};
  return Request.post({path: `items`, body});
};

/**
 * Fetch Next-Invoice-At
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
export const removeRecurringInvoice = id => {
  return Request.post({path: `recurring-invoices/delete`, body: {ids: [id]}});
};
