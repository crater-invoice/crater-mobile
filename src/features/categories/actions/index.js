import {
    GET_EXPENSE_CATEGORIES,
    GET_CREATE_EXPENSE_CATEGORY,
    CREATE_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    REMOVE_EXPENSE_CATEGORY,
    SET_EXPENSE_CATEGORIES,
    SET_CREATE_EXPENSE_CATEGORIES,
    SET_EDI_EXPENSE_CATEGORIES,
    SET_REMOVE_EXPENSE_CATEGORIES,
} from "../constants";

// Expense Categories
// -------------------------------------------------
export const getExpenseCategories = (payload) => ({
    type: GET_EXPENSE_CATEGORIES,
    payload,
});

export const setExpenseCategories = (payload) => ({
    type: SET_EXPENSE_CATEGORIES,
    payload,
});

export const setCreateExpenseCategories = (payload) => ({
    type: SET_CREATE_EXPENSE_CATEGORIES,
    payload,
});

export const setEditExpenseCategories = (payload) => ({
    type: SET_EDI_EXPENSE_CATEGORIES,
    payload,
});

export const setRemoveExpenseCategories = (payload) => ({
    type: SET_REMOVE_EXPENSE_CATEGORIES,
    payload,
});

export const createExpenseCategory = (payload = {}) => ({
    type: CREATE_EXPENSE_CATEGORY,
    payload,
});

export const getEditExpenseCategory = (payload = {}) => ({
    type: GET_CREATE_EXPENSE_CATEGORY,
    payload,
});

export const removeExpenseCategory = (payload = {}) => ({
    type: REMOVE_EXPENSE_CATEGORY,
    payload,
});

export const editExpenseCategory = (payload = {}) => ({
    type: EDIT_EXPENSE_CATEGORY,
    payload,
});
