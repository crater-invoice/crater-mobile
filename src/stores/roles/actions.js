import * as types from './types';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function spinner(payload) {
  return {
    type: types.SPINNER,
    payload: typeof payload === 'object' ? payload : {roleLoading: payload}
  };
}

/**
 * Fetch roles
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchRoles(payload = {}) {
  return {
    type: types.FETCH_ROLES,
    payload
  };
}

/**
 * Fetch single role
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleRole(payload = {}) {
  return {
    type: types.FETCH_SINGLE_ROLE,
    payload
  };
}

/**
 * Fetch permissions
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchPermissions(payload = {}) {
  return {
    type: types.FETCH_PERMISSIONS,
    payload
  };
}

/**
 * Add role
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addRole(payload = {}) {
  return {
    type: types.ADD_ROLE,
    payload
  };
}

/**
 * Update role
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateRole(payload = {}) {
  return {
    type: types.UPDATE_ROLE,
    payload
  };
}

/**
 * Remove role
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function removeRole(payload = {}) {
  return {
    type: types.REMOVE_ROLE,
    payload
  };
}

/**
 * Update permission
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updatePermission(payload = {}) {
  return {
    type: types.UPDATE_PERMISSION,
    payload
  };
}
