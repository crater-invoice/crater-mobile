import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch expenses
 * @param q : queryString
 * @returns {*}
 */
export const fetchExpenses = q => {
  return Request.get(`/expenses?${queryString.stringify(q)}`);
};

/**
 * Fetch single expense
 * @param id : expense id
 * @returns {*}
 */
export const fetchSingleExpense = id => {
  return Request.get(`/expenses/${id}`);
};

/**
 * Add expense
 * @param data
 * @returns {*}
 */
export const addExpense = data => {
  return Request.post(`/expenses`, data, {withMultipartFormData: false});
};

/**
 * Update expense
 * @param id : expense id
 * @param data
 * @returns {*}
 */
export const updateExpense = (id, data) => {
  return Request.put(`/expenses/${id}`, data, {withMultipartFormData: false});
};

/**
 * Upload attachment receipt
 * @param id : expense id
 * @param attachmentReceipt : receipt attachment
 * @param type : create or edit type of request
 * @returns {*}
 */
export const uploadAttachmentReceipt = (id, attachmentReceipt, type) => {
  return Request.post(
    `/expenses/${id}/upload/receipts`,
    {},
    {image: attachmentReceipt, type, imageName: 'attachment_receipt'}
  );
};

/**
 * Remove expense
 * @param id : expense id
 * @param data : Array of expense ids
 * @returns {*}
 */
export const removeExpense = id => {
  return Request.post(`/expenses/delete`, {ids: [id]});
};
