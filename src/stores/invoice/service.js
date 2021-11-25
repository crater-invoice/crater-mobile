import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch Invoice Templates
 * @returns {*}
 */
export const fetchInvoiceTemplates = () => {
  return Request.get(`/invoices/templates`);
};

/**
 * Fetch invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchInvoices = q => {
  return Request.get(`/invoices?${queryString.stringify(q)}`);
};

/**
 * Fetch single invoice
 * @param id : invoice id
 * @returns {*}
 */
export const fetchSingleInvoice = id => {
  return Request.get(`/invoices/${id}`);
};

/**
 * Add invoice
 * @param data
 * @returns {*}
 */
export const addInvoice = data => {
  return Request.post(`/invoices`, data);
};

/**
 * Update invoice
 * @param id : invoice id
 * @param data
 * @returns {*}
 */
export const updateInvoice = (id, data) => {
  return Request.put(`/invoices/${id}`, data);
};

/**
 * Update invoice status
 * @param action : update action
 * @param data
 * @returns {*}
 */
export const changeInvoiceStatus = (action, data) => {
  return Request.post(`/invoices/${action}`, data);
};

/**
 * Remove invoice
 * @param id : invoice id
 * @returns {*}
 */
export const removeInvoice = id => {
  return Request.post(`/invoices/delete`, {ids: [id]});
};

/**
 * Fetch next invoice number
 * @param q : queryString
 * @returns {*}
 */
export const fetchNextInvoiceNumber = q => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};

/**
 * Send invoice
 * @param id : invoice id
 * @param data
 * @returns {*}
 */
export const sendInvoice = (id, data) => {
  return Request.post(`/invoices/${id}/send`, data);
};

class Services {
  isFirstInvoiceCreated: boolean;

  constructor() {
    this.isFirstInvoiceCreated = false;
  }

  toggleIsFirstInvoiceCreated = status => (this.isFirstInvoiceCreated = status);
}

export const InvoiceServices = new Services();
