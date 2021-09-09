import * as TYPES from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const spinner = payload => ({
  type: TYPES.SPINNER,
  payload
});

/**
 * fetch item-units list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchItemUnits = (payload = {}) => ({
  type: TYPES.FETCH_ITEM_UNITS,
  payload
});

/**
 * Add item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addItemUnit = (payload = {}) => ({
  type: TYPES.ADD_ITEM_UNIT,
  payload
});

/**
 * update item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateItemUnit = (payload = {}) => ({
  type: TYPES.UPDATE_ITEM_UNIT,
  payload
});

/**
 * delete item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const removeItemUnit = (payload = {}) => ({
  type: TYPES.REMOVE_ITEM_UNIT,
  payload
});
