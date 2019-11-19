import {
    SETTINGS_TRIGGER_SPINNER,
    LOGOUT,
    GET_COMPANY_INFO,
    EDIT_COMPANY_INFO,
    GET_ACCOUNT_INFO,
    EDIT_ACCOUNT_INFO,
    SET_COMPANY_INFO,
    SET_ACCOUNT_INFO,
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    SET_PREFERENCES,
    CLEAR_PREFERENCES,
    GET_SETTING_ITEM,
    EDIT_SETTING_ITEM,
    GET_EXPENSE_CATEGORIES,
    GET_CREATE_EXPENSE_CATEGORY,
    CREATE_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    REMOVE_EXPENSE_CATEGORY,
    SET_EXPENSE_CATEGORIES,
    SET_CREATE_EXPENSE_CATEGORIES,
    SET_EDI_EXPENSE_CATEGORIES,
    SET_REMOVE_EXPENSE_CATEGORIES,
    GET_TAXES,
    SET_TAXES,
    REMOVE_TAX,
    SET_TAX,
    TAX_ADD,
    TAX_EDIT,
    SET_EDIT_TAX,
    SET_REMOVE_TAX,
} from "../constants";

import { SET_SETTINGS } from "../../../api/consts";

export const settingsTriggerSpinner = (payload) => ({
    type: SETTINGS_TRIGGER_SPINNER,
    payload,
});

export const logout = (payload) => ({
    type: LOGOUT,
    payload,
});

// company
export const getCompanyInformation = (payload) => ({
    type: GET_COMPANY_INFO,
    payload,
});

export const setCompanyInformation = (payload) => ({
    type: SET_COMPANY_INFO,
    payload,
});

export const editCompanyInformation = (payload) => ({
    type: EDIT_COMPANY_INFO,
    payload,
});

// account
export const getAccountInformation = (payload) => ({
    type: GET_ACCOUNT_INFO,
    payload,
});

export const setAccountInformation = (payload) => ({
    type: SET_ACCOUNT_INFO,
    payload,
});

export const editAccountInformation = (payload) => ({
    type: EDIT_ACCOUNT_INFO,
    payload,
});

// preferences
export const getPreferences = (payload) => ({
    type: GET_PREFERENCES,
    payload,
});

export const setPreferences = (payload) => ({
    type: SET_PREFERENCES,
    payload,
});

export const clearPreferences = (payload) => ({
    type: CLEAR_PREFERENCES,
    payload,
});

export const editPreferences = (payload) => ({
    type: EDIT_PREFERENCES,
    payload,
});

// Settings

export const getSettingItem = (payload) => ({
    type: GET_SETTING_ITEM,
    payload,
});

export const editSettingItem = (payload) => ({
    type: EDIT_SETTING_ITEM,
    payload,
});

export const setSettings = (payload) => ({
    type: SET_SETTINGS,
    payload,
});

// Expense Categories
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

//  Taxes
export const getTaxes = (payload) => ({
    type: GET_TAXES,
    payload,
});

export const setTaxes = (payload) => ({
    type: SET_TAXES,
    payload,
});

export const addTax = (payload) => ({
    type: TAX_ADD,
    payload,
});

export const editTax = (payload) => ({
    type: TAX_EDIT,
    payload,
});

export const removeTax = (payload) => ({
    type: REMOVE_TAX,
    payload,
});

export const setTax = (payload) => ({
    type: SET_TAX,
    payload,
});

export const setEditTax = (payload) => ({
    type: SET_EDIT_TAX,
    payload,
});

export const setRemoveTax = (payload) => ({
    type: SET_REMOVE_TAX,
    payload,
});