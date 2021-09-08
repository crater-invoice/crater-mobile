import * as TYPES from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const settingsTriggerSpinner = payload => ({
  type: TYPES.SETTINGS_TRIGGER_SPINNER,
  payload
});

/**
 * get item-units list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const getItemUnits = (payload = {}) => ({
  type: TYPES.GET_ITEM_UNITS,
  payload
});

/**
 * set item-units list
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setItemUnits = (payload = {}) => ({
  type: TYPES.SET_ITEM_UNITS,
  payload
});

/**
 * set single item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const setItemUnit = (payload = {}) => ({
  type: TYPES.SET_ITEM_UNIT,
  payload
});

/**
 * create item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const createItemUnit = (payload = {}) => ({
  type: TYPES.CREATE_ITEM_UNIT,
  payload
});

/**
 * update item-unit
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const editItemUnit = (payload = {}) => ({
  type: TYPES.EDIT_ITEM_UNIT,
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
