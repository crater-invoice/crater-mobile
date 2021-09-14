import * as types from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const spinner = payload => ({
  type: types.SPINNER,
  payload
});

/**
 * fetch item-units list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchItemUnits = (payload = {}) => ({
  type: types.FETCH_ITEM_UNITS,
  payload
});

/**
 * Add item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addItemUnit = (payload = {}) => ({
  type: types.ADD_ITEM_UNIT,
  payload
});

/**
 * update item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateItemUnit = (payload = {}) => ({
  type: types.UPDATE_ITEM_UNIT,
  payload
});

/**
 * delete item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeItemUnit = (payload = {}) => ({
  type: types.REMOVE_ITEM_UNIT,
  payload
});
