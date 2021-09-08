import Request from '@/utils/request';
import * as queryString from 'query-string';
/**
 * get payment-modes
 * @param q : queryString
 * @returns {*}
 */
export const getPaymentModes = q => {
  return Request.get({path: `payment-methods?${queryString.stringify(q)}`});
};

/**
 * Add payment-mode
 * @param body : params
 * @returns {*}
 */
export const createPaymentMode = body => {
  return Request.post({path: `payment-methods`, body});
};

/**
 * Update payment-mode
 * @param id : payment-mode id
 * @param body : params
 * @returns {*}
 */
export const editPaymentMode = body => {
  return Request.put({path: `payment-methods/${body.id}`, body});
};

/**
 * Remove payment-mode
 * @param id : payment-mode id
 * @returns {*}
 */
export const removePaymentMode = id => {
  return Request.delete({path: `payment-methods/${id}`});
};
