import {
    GET_CATEGORIES,
    SET_CATEGORIES,
    EXPENSES_TRIGGER_SPINNER,
    GET_EXPENSES,
    SET_EXPENSES,
    CREATE_EXPENSE,
    CLEAR_EXPENSE,
    GET_EDIT_EXPENSE,
    SET_EXPENSE,
    GET_CREATE_EXPENSE,
    EDIT_EXPENSE,
    REMOVE_EXPENSE,
    GET_RECEIPT,
    DOWNLOAD_RECEIPT
} from '../constants';

export const getCategories = (payload = {}) => ({
    type: GET_CATEGORIES,
    payload
});

export const setCategories = (payload = {}) => ({
    type: SET_CATEGORIES,
    payload
});

export const getExpenses = (payload = {}) => ({
    type: GET_EXPENSES,
    payload
});

export const setExpenses = (payload = {}) => ({
    type: SET_EXPENSES,
    payload
});

export const createExpense = (payload = {}) => ({
    type: CREATE_EXPENSE,
    payload
});

export const expenseTriggerSpinner = payload => ({
    type: EXPENSES_TRIGGER_SPINNER,
    payload
});

export const clearExpense = payload => ({
    type: CLEAR_EXPENSE,
    payload
});

export const getCreateExpense = payload => ({
    type: GET_CREATE_EXPENSE,
    payload
});

export const getEditExpense = payload => ({
    type: GET_EDIT_EXPENSE,
    payload
});

export const editExpense = payload => ({
    type: EDIT_EXPENSE,
    payload
});

export const setExpense = payload => ({
    type: SET_EXPENSE,
    payload
});

export const removeExpense = (payload = {}) => ({
    type: REMOVE_EXPENSE,
    payload
});

export const getReceipt = (payload = {}) => ({
    type: GET_RECEIPT,
    payload
});

export const downloadReceipt = (payload = {}) => ({
    type: DOWNLOAD_RECEIPT,
    payload
});
