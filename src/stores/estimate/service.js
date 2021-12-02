import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Fetch Estimate Templates
 * @returns {*}
 */
export const fetchEstimateTemplates = () => {
  return Request.get(`/estimates/templates`);
};

/**
 * Fetch estimates
 * @param q : queryString
 * @returns {*}
 */
export const fetchEstimates = q => {
  return Request.get(`/estimates?${queryString.stringify(q)}`);
};

/**
 * Fetch single estimate
 * @param id : estimate id
 * @returns {*}
 */
export const fetchSingleEstimate = id => {
  return Request.get(`/estimates/${id}`);
};

/**
 * Add estimate
 * @param data
 * @returns {*}
 */
export const addEstimate = data => {
  return Request.post(`/estimates`, data);
};

/**
 * Update estimate
 * @param id : estimate id
 * @param data
 * @returns {*}
 */
export const updateEstimate = (id, data) => {
  return Request.put(`/estimates/${id}`, data);
};

/**
 * change estimate status
 * @param action : update action
 * @param data
 * @returns {*}
 */
export const changeEstimateStatus = (action, data) => {
  return Request.post(`/estimates/${action}`, data);
};

/**
 * Remove estimate
 * @param data : Array of estimate ids
 * @returns {*}
 */
export const removeEstimate = id => {
  return Request.post(`/estimates/delete`, {ids: [id]});
};

/**
 * Remove estimate
 * @param id : estimate id
 * @returns {*}
 */
export const convertToInvoice = id => {
  return Request.post(`/estimates/${id}/convert-to-invoice`);
};

/**
 * Fetch next estimate number
 * @param q : queryString
 * @returns {*}
 */
export const fetchNextEstimateNumber = q => {
  return Request.get(`/next-number?${queryString.stringify(q)}`);
};

/**
 * Send estimate
 * @param id : estimate id
 * @param data
 * @returns {*}
 */
export const sendEstimate = (id, data) => {
  return Request.post(`/estimates/${id}/send`, data);
};
