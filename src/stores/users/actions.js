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
 * Add user
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addUser(payload = {}) {
  return {
    type: types.ADD_USER,
    payload
  };
}

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
 * @returns {{type: string, payload: *}}
 */
export function removeUser(id) {
  return {
    type: types.REMOVE_USER,
    payload: {id}
  };
}

/**
 * Fetch user initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchUserInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});
