import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch Next-Invoice-At
 * @param data
 * @returns {*}
 */
export const fetchNextInvoiceAt = data => {
  return Request.get(
    `/recurring-invoice-frequency?${queryString.stringify(data)}`
  );
};

/**
 * Fetch Invoice Templates
 * @returns {*}
 */
export const fetchInvoiceTemplates = () => {
  return Request.get(`/invoices/templates`);
};

/**
 * Fetch recurring-invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchRecurringInvoices = q => {
  return Request.get(`/recurring-invoices?${queryString.stringify(q)}`);
};

/**
 * Fetch single recurring-invoice
 * @param id : recurring-invoice id
 * @returns {*}
 */
export const fetchSingleRecurringInvoice = id => {
  return Request.get(`/recurring-invoices/${id}`);
};

/**
 * Add recurring-invoice
 * @param data
 * @returns {*}
 */
export const addRecurringInvoice = data => {
  return Request.post(`/recurring-invoices`, data);
};

/**
 * Update recurring-invoice
 * @param id : recurring-invoice id
 * @param data
 * @returns {*}
 */
export const updateRecurringInvoice = (id, data) => {
  return Request.put(`/recurring-invoices/${id}`, data);
};

/**
 * Remove recurring-invoice
 * @param id : recurring-invoice id
 * @returns {*}
 */
export const removeRecurringInvoice = id => {
  return Request.post(`/recurring-invoices/delete`, {ids: [id]});
};
