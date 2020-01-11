import {
    SETTINGS_TRIGGER_SPINNER,
    LOGOUT,

    // company
    GET_COMPANY_INFO,
    EDIT_COMPANY_INFO,
    SET_COMPANY_INFO,

    // account
    GET_ACCOUNT_INFO,
    EDIT_ACCOUNT_INFO,
    SET_ACCOUNT_INFO,

    // preferences
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    SET_PREFERENCES,
    CLEAR_PREFERENCES,

    // Settings
    GET_SETTING_ITEM,
    EDIT_SETTING_ITEM,

    // Expense Categories
    GET_EXPENSE_CATEGORIES,
    GET_CREATE_EXPENSE_CATEGORY,
    CREATE_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    REMOVE_EXPENSE_CATEGORY,
    SET_EXPENSE_CATEGORIES,
    SET_CREATE_EXPENSE_CATEGORIES,
    SET_EDI_EXPENSE_CATEGORIES,
    SET_REMOVE_EXPENSE_CATEGORIES,

    //  Taxes
    GET_TAXES,
    SET_TAXES,
    REMOVE_TAX,
    SET_TAX,
    TAX_ADD,
    TAX_EDIT,
    SET_EDIT_TAX,
    SET_REMOVE_TAX,

    // Customize Settings
    GET_CUSTOMIZE_SETTINGS,
    SET_CUSTOMIZE_SETTINGS,
    EDIT_CUSTOMIZE_SETTINGS,

    // Payment methods
    GET_PAYMENT_MODES,
    SET_PAYMENT_MODES,
    CREATE_PAYMENT_MODE,
    EDIT_PAYMENT_MODE,
    REMOVE_PAYMENT_MODE,
    SET_PAYMENT_MODE,

    // Item Units
    GET_ITEM_UNITS,
    SET_ITEM_UNITS,
    SET_ITEM_UNIT,
    CREATE_ITEM_UNIT,
    EDIT_ITEM_UNIT,
    REMOVE_ITEM_UNIT,

    // Currencies
    GET_CURRENCIES,
    SET_CURRENCIES,
    CREATE_CURRENCY,
    EDIT_CURRENCY,
    REMOVE_CURRENCY,
    SET_GLOBAL_CURRENCIES,
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
// -------------------------------------------------
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
// -------------------------------------------------
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
// -------------------------------------------------
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
// -------------------------------------------------
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

//  Taxes
// -------------------------------------------------
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

// Customize Settings
// -------------------------------------------------
export const getCustomizeSettings = (payload = {}) => ({
    type: GET_CUSTOMIZE_SETTINGS,
    payload,
});

export const setCustomizeSettings = (payload = {}) => ({
    type: SET_CUSTOMIZE_SETTINGS,
    payload,
});

export const editCustomizeSettings = (payload = {}) => ({
    type: EDIT_CUSTOMIZE_SETTINGS,
    payload,
});

// Payment methods
// -------------------------------------------------
export const getPaymentModes = (payload = {}) => ({
    type: GET_PAYMENT_MODES,
    payload,
});

export const setPaymentModes = (payload = {}) => ({
    type: SET_PAYMENT_MODES,
    payload,
});

export const setPaymentMode = (payload = {}) => ({
    type: SET_PAYMENT_MODE,
    payload,
});

export const createPaymentMode = (payload = {}) => ({
    type: CREATE_PAYMENT_MODE,
    payload,
});

export const editPaymentMode = (payload = {}) => ({
    type: EDIT_PAYMENT_MODE,
    payload,
});

export const removePaymentMode = (payload = {}) => ({
    type: REMOVE_PAYMENT_MODE,
    payload,
});

// Item Units
// -------------------------------------------------
export const getItemUnits = (payload = {}) => ({
    type: GET_ITEM_UNITS,
    payload,
});

export const setItemUnits = (payload = {}) => ({
    type: SET_ITEM_UNITS,
    payload,
});

export const setItemUnit = (payload = {}) => ({
    type: SET_ITEM_UNIT,
    payload,
});

export const createItemUnit = (payload = {}) => ({
    type: CREATE_ITEM_UNIT,
    payload,
});

export const editItemUnit = (payload = {}) => ({
    type: EDIT_ITEM_UNIT,
    payload,
});

export const removeItemUnit = (payload = {}) => ({
    type: REMOVE_ITEM_UNIT,
    payload,
});


// Currencies
// -------------------------------------------------
export const getCurrencies = (payload = {}) => ({
    type: GET_CURRENCIES,
    payload,
});

export const setCurrencies = (payload = {}) => ({
    type: SET_CURRENCIES,
    payload,
});

export const setGlobalCurrencies = (payload = {}) => ({
    type: SET_GLOBAL_CURRENCIES,
    payload,
});

export const createCurrency = (payload = {}) => ({
    type: CREATE_CURRENCY,
    payload,
});

export const editCurrency = (payload = {}) => ({
    type: EDIT_CURRENCY,
    payload,
});

export const removeCurrency = (payload = {}) => ({
    type: REMOVE_CURRENCY,
    payload,
});
