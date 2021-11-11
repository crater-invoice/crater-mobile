import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value}
  };
}

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
