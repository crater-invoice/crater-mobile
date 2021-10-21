import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Add invoices item.
 * @param body : params
 * @returns {*}
 */
export const addInvoiceItem = body => {
  return Request.post({path: `items`, body});
};

/**
 * Update invoices item.
 * @param id : invoice item id
 * @param body : params
 * @returns {*}
 */
export const updateInvoiceItem = (id, body) => {
  return Request.put({path: `items/${id}`, body});
};

/**
 * Fetch Invoice Templates.
 * @returns {*}
 */
export const fetchInvoiceTemplates = () => {
  return Request.get({path: `invoices/templates`});
};

/**
 * Fetch invoices.
 * @param q : queryString
 * @returns {*}
 */
export const fetchInvoices = q => {
  return Request.get({path: `invoices?${queryString.stringify(q)}`});
};

/**
 * Fetch single invoice.
 * @param id : invoice id
 * @returns {*}
 */
export const fetchSingleInvoice = id => {
  return Request.get({path: `invoices/${id}`});
};

/**
 * Add invoice.
 * @param body : params
 * @returns {*}
 */
export const addInvoice = body => {
  return Request.post({path: `invoices`, body});
};

/**
 * Update invoice.
 * @param id : invoice id
 * @param body : params
 * @returns {*}
 */
export const updateInvoice = (id, body) => {
  return Request.put({path: `invoices/${id}`, body});
};

/**
 * Update invoice status.
 * @param action : update action
 * @param body : params
 * @returns {*}
 */
export const updateInvoiceStatus = (action, body) => {
  return Request.put({path: `invoices/${action}`, body});
};

/**
 * Remove invoice.
 * @param id : invoice id
 * @returns {*}
 */
export const removeInvoice = body => {
  return Request.post({path: `invoices/delete`, body});
};

class Services {
  isEmailSent: boolean;
  isFirstInvoiceCreated: boolean;

  constructor() {
    this.isEmailSent = false;
    this.isFirstInvoiceCreated = false;
  }

  toggleIsEmailSent = status => (this.isEmailSent = status);

  toggleIsFirstInvoiceCreated = status => (this.isFirstInvoiceCreated = status);
}

export const InvoiceServices = new Services();
