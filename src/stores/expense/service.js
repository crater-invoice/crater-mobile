import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch expenses
 * @param q : queryString
 * @returns {*}
 */
export const fetchExpenses = q => {
  return Request.get({path: `expenses?${queryString.stringify(q)}`});
};

/**
 * Fetch single expense
 * @param id : expense id
 * @returns {*}
 */
export const fetchSingleExpense = id => {
  return Request.get({path: `expenses/${id}`});
};

/**
 * Add expense
 * @param body : params
 * @returns {*}
 */
export const addExpense = body => {
  return Request.post({path: `expenses`, body, withMultipartFormData: false});
};

/**
 * Update expense
 * @param id : expense id
 * @param body : params
 * @returns {*}
 */
export const updateExpense = (id, body) => {
  return Request.put({
    path: `expenses/${id}`,
    body,
    withMultipartFormData: false
  });
};

/**
 * Upload attachment receipt
 * @param id : expense id
 * @param attachmentReceipt : receipt attachment
 * @param type : create or edit type of request
 * @returns {*}
 */
export const uploadAttachmentReceipt = (id, attachmentReceipt, type) => {
  return Request.post({
    path: `expenses/${id}/upload/receipts`,
    image: attachmentReceipt,
    type,
    imageName: 'attachment_receipt'
  });
};

/**
 * Remove expense
 * @param id : expense id
 * @param body : Array of expense ids
 * @returns {*}
 */
export const removeExpense = id => {
  return Request.post({path: `expenses/delete`, body: {ids: [id]}});
};
