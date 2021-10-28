import Request from '@/utils/request';
import * as queryString from 'query-string';

/**
 * Add estimate item
 * @param item : item data
 * @returns {*}
 */
export const addEstimateItem = item => {
  const {price, name, description, taxes, unit_id} = item;
  const body = {
    name,
    description,
    price,
    unit_id,
    taxes
  };
  return Request.post({path: `items`, body});
};

/**
 * Fetch Estimate Templates
 * @returns {*}
 */
export const fetchEstimateTemplates = () => {
  return Request.get({path: `estimates/templates`});
};

/**
 * Fetch estimates
 * @param q : queryString
 * @returns {*}
 */
export const fetchEstimates = q => {
  return Request.get({path: `estimates?${queryString.stringify(q)}`});
};

/**
 * Fetch single estimate
 * @param id : estimate id
 * @returns {*}
 */
export const fetchSingleEstimate = id => {
  return Request.get({path: `estimates/${id}`});
};

/**
 * Add estimate
 * @param body : params
 * @returns {*}
 */
export const addEstimate = body => {
  return Request.post({path: `estimates`, body});
};

/**
 * Update estimate
 * @param id : estimate id
 * @param body : params
 * @returns {*}
 */
export const updateEstimate = (id, body) => {
  return Request.put({path: `estimates/${id}`, body});
};

/**
 * change estimate status
 * @param action : update action
 * @param body : params
 * @returns {*}
 */
export const changeEstimateStatus = (action, body) => {
  return Request.post({path: `estimates/${action}`, body});
};

/**
 * Remove estimate
 * @param body : Array of estimate ids
 * @returns {*}
 */
export const removeEstimate = id => {
  return Request.post({path: `estimates/delete`, body: {ids: [id]}});
};

/**
 * Remove estimate
 * @param id : estimate id
 * @returns {*}
 */
export const convertToInvoice = id => {
  return Request.post({path: `estimates/${id}/convert-to-invoice`});
};
