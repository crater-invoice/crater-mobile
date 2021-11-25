import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value}
});

/**
 * Fetch estimate initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchEstimateInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Fetch next estimate number
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchNextEstimateNumber = (payload = {}) => ({
  type: types.FETCH_NEXT_ESTIMATE_NUMBER,
  payload
});

/**
 * Fetch estimates
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchEstimates = (payload = {}) => ({
  type: types.FETCH_ESTIMATES,
  payload
});

/**
 * Fetch single estimate
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchSingleEstimate = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_ESTIMATE,
  payload: {id, onSuccess}
});

/**
 * Add estimate
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addEstimate = (payload = {}) => ({
  type: types.ADD_ESTIMATE,
  payload
});

/**
 * Update estimate
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateEstimate = (payload = {}) => ({
  type: types.UPDATE_ESTIMATE,
  payload
});

/**
 * Remove estimate
 * @param id
 * @param navigation
 * @returns {{type: string, payload: *}}
 */
export const removeEstimate = (id, navigation) => ({
  type: types.REMOVE_ESTIMATE,
  payload: {id, navigation}
});

/**
 * Add estimate item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addEstimateItem = (payload = {}) => ({
  type: types.ADD_ESTIMATE_ITEM,
  payload
});

/**
 * Set estimate items
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setEstimateItems = (payload = {}) => ({
  type: types.ADD_ESTIMATE_ITEM_SUCCESS,
  payload
});

/**
 * Remove estimate item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeEstimateItem = (payload = {}) => ({
  type: types.REMOVE_ESTIMATE_ITEM,
  payload
});

/**
 * Convert to invoice
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const convertToInvoice = (id, onSuccess) => ({
  type: types.CONVERT_TO_INVOICE,
  payload: {id, onSuccess}
});

/**
 * Change estimate status
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const changeEstimateStatus = (payload = {}) => ({
  type: types.CHANGE_ESTIMATE_STATUS,
  payload
});

/**
 * Send estimate
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const sendEstimate = (payload = {}) => ({
  type: types.SEND_ESTIMATE,
  payload
});
