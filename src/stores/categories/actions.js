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
 * Fetch categories
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCategories(payload = {}) {
  return {
    type: types.FETCH_CATEGORIES,
    payload
  };
}

/**
 * Fetch single category
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleCategory(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CATEGORY,
    payload: {id, onSuccess}
  };
}

/**
 * Add category
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addCategory(payload = {}) {
  return {
    type: types.ADD_CATEGORY,
    payload
  };
}

/**
 * Update category
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateCategory(payload = {}) {
  return {
    type: types.UPDATE_CATEGORY,
    payload
  };
}

/**
 * Remove category
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeCategory(id) {
  return {
    type: types.REMOVE_CATEGORY,
    payload: {id}
  };
}
