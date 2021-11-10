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
 * Fetch items
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchItems = (payload = {}) => ({
  type: types.FETCH_ITEMS,
  payload
});

/**
 * Add item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addItem = (payload = {}) => ({
  type: types.ADD_ITEM,
  payload
});

/**
 * Update item
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateItem = (payload = {}) => ({
  type: types.UPDATE_ITEM,
  payload
});

/**
 * Remove item
 * @param id
 * @param navigation
 * @param onFail
 * @returns {{type: string, payload: *}}
 */
export const removeItem = (id, navigation, onFail) => ({
  type: types.REMOVE_ITEM,
  payload: {id, navigation, onFail}
});
