import {
    EXPENSES_TRIGGER_SPINNER,
    GET_EXPENSES,
    SET_EXPENSES,
    CREATE_EXPENSE,
    GET_EXPENSE_DETAIL,
    UPDATE_EXPENSE,
    REMOVE_EXPENSE
} from '../constants';

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

export const getExpenseDetail = payload => ({
    type: GET_EXPENSE_DETAIL,
    payload
});

export const updateExpense = payload => ({
    type: UPDATE_EXPENSE,
    payload
});

export const removeExpense = (payload = {}) => ({
    type: REMOVE_EXPENSE,
    payload
});
