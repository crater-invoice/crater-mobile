import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export const spinner = (name, value) => ({
  type: types.SPINNER,
  payload: {name, value}
});

/**
 * Fetch expense initial details
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchExpenseInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Fetch expenses
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchExpenses = (payload = {}) => ({
  type: types.FETCH_EXPENSES,
  payload
});

/**
 * Fetch single expense
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export const fetchSingleExpense = (id, onSuccess) => ({
  type: types.FETCH_SINGLE_EXPENSE,
  payload: {id, onSuccess}
});

/**
 * Add expense
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const addExpense = (payload = {}) => ({
  type: types.ADD_EXPENSE,
  payload
});

/**
 * Update expense
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const updateExpense = (payload = {}) => ({
  type: types.UPDATE_EXPENSE,
  payload
});

/**
 * Remove expense
 * @param id
 * @param navigation
 * @returns {{type: string, payload: *}}
 */
export const removeExpense = (id, navigation) => ({
  type: types.REMOVE_EXPENSE,
  payload: {id, navigation}
});
