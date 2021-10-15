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
 * Fetch users
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchUsers(payload = {}) {
  return {
    type: types.FETCH_USERS,
    payload
  };
}

/**
 * Fetch single user
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleUser(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_USER,
    payload: {id, onSuccess}
  };
}

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
 * Update user
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateUser(payload = {}) {
  return {
    type: types.UPDATE_USER,
    payload
  };
}

/**
 * Remove user
 * @param id
 * @param navigation
 * @param onFail
 * @returns {{type: string, payload: *}}
 */
export function removeUser(id, navigation, onFail) {
  return {
    type: types.REMOVE_USER,
    payload: {id, navigation, onFail}
  };
}
