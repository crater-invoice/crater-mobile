import * as types from './constants';

/**
 * Spinner
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function spinner(payload) {
    return {
        type: types.SPINNER,
        payload:
            typeof payload === 'object' ? payload : { userLoading: payload }
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
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleUser(payload = {}) {
    return {
        type: types.FETCH_SINGLE_USER,
        payload
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
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function removeUser(payload = {}) {
    return {
        type: types.REMOVE_USER,
        payload
    };
}
