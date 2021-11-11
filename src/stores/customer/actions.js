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
 * Fetch customers
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchCustomers(payload = {}) {
  return {
    type: types.FETCH_CUSTOMERS,
    payload
  };
}

/**
 * Fetch single customer
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleCustomer(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_CUSTOMER,
    payload: {id, onSuccess}
  };
}

/**
 * Fetch customer initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchCustomerInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Add customer
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addCustomer(payload = {}) {
  return {
    type: types.ADD_CUSTOMER,
    payload
  };
}

/**
 * Update customer
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateCustomer(payload = {}) {
  return {
    type: types.UPDATE_CUSTOMER,
    payload
  };
}

/**
 * Remove customer
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeCustomer(id) {
  return {
    type: types.REMOVE_CUSTOMER,
    payload: {id}
  };
}
