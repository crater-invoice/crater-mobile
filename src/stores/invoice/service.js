import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch Invoice Templates
 * @returns {*}
 */
export const fetchInvoiceTemplates = () => {
  return Request.get({path: `invoices/templates`});
};

/**
 * Fetch invoices
 * @param q : queryString
 * @returns {*}
 */
export const fetchInvoices = q => {
  return Request.get({path: `invoices?${queryString.stringify(q)}`});
};

/**
 * Fetch single invoice
 * @param id : invoice id
 * @returns {*}
 */
export const fetchSingleInvoice = id => {
  return Request.get({path: `invoices/${id}`});
};

/**
 * Add invoice
 * @param body : params
 * @returns {*}
 */
export const addInvoice = body => {
  return Request.post({path: `invoices`, body});
};

/**
 * Update invoice
 * @param id : invoice id
 * @param body : params
 * @returns {*}
 */
export const updateInvoice = (id, body) => {
  return Request.put({path: `invoices/${id}`, body});
};

/**
 * Update invoice status
 * @param action : update action
 * @param body : params
 * @returns {*}
 */
export const changeInvoiceStatus = (action, body) => {
  return Request.post({path: `invoices/${action}`, body});
};

/**
 * Remove invoice
 * @param id : invoice id
 * @returns {*}
 */
export const removeInvoice = id => {
  return Request.post({path: `invoices/delete`, body: {ids: [id]}});
};

/**
 * Fetch next invoice number
 * @returns {*}
 */
export const fetchNextInvoiceNumber = () => {
  return Request.get({path: `next-number?key=invoice`});
};

class Services {
  isFirstInvoiceCreated: boolean;

  constructor() {
    this.isFirstInvoiceCreated = false;
  }

  toggleIsFirstInvoiceCreated = status => (this.isFirstInvoiceCreated = status);
}

export const InvoiceServices = new Services();
