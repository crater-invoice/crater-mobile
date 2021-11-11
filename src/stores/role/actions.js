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
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleRole(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_ROLE,
    payload: {id, onSuccess}
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
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeRole(id) {
  return {
    type: types.REMOVE_ROLE,
    payload: {id}
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

/**
 * Select all permissions
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function selectAllPermissions(payload = {}) {
  return {
    type: types.SELECT_ALL_PERMISSIONS,
    payload
  };
}

/**
 * Reset permissions
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function resetPermissions(payload = {}) {
  return {
    type: types.RESET_PERMISSIONS,
    payload
  };
}
