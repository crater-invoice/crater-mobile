import { SET_SETTINGS } from '@/constants';
import * as TYPES from '../constants';

export const settingsTriggerSpinner = payload => ({
    type: TYPES.SETTINGS_TRIGGER_SPINNER,
    payload
});

export const logout = payload => ({
    type: TYPES.LOGOUT,
    payload
});

// company
// -------------------------------------------------
export const getCompanyInformation = payload => ({
    type: TYPES.GET_COMPANY_INFO,
    payload
});

export const setCompanyInformation = payload => ({
    type: TYPES.SET_COMPANY_INFO,
    payload
});

export const editCompanyInformation = payload => ({
    type: TYPES.EDIT_COMPANY_INFO,
    payload
});

// account
// -------------------------------------------------
export const getAccountInformation = payload => ({
    type: TYPES.GET_ACCOUNT_INFO,
    payload
});

export const setAccountInformation = payload => ({
    type: TYPES.SET_ACCOUNT_INFO,
    payload
});

export const editAccountInformation = payload => ({
    type: TYPES.EDIT_ACCOUNT_INFO,
    payload
});

// preferences
// -------------------------------------------------
export const getPreferences = payload => ({
    type: TYPES.GET_PREFERENCES,
    payload
});

export const setPreferences = payload => ({
    type: TYPES.SET_PREFERENCES,
    payload
});

export const clearPreferences = payload => ({
    type: TYPES.CLEAR_PREFERENCES,
    payload
});

export const editPreferences = payload => ({
    type: TYPES.EDIT_PREFERENCES,
    payload
});

// Settings
// -------------------------------------------------
export const getSettingItem = payload => ({
    type: TYPES.GET_SETTING_ITEM,
    payload
});

export const editSettingItem = payload => ({
    type: TYPES.EDIT_SETTING_ITEM,
    payload
});

export const setSettings = payload => ({
    type: SET_SETTINGS,
    payload
});

// Expense Categories
// -------------------------------------------------
export const getExpenseCategories = payload => ({
    type: TYPES.GET_EXPENSE_CATEGORIES,
    payload
});

export const setExpenseCategories = payload => ({
    type: TYPES.SET_EXPENSE_CATEGORIES,
    payload
});

export const setCreateExpenseCategories = payload => ({
    type: TYPES.SET_CREATE_EXPENSE_CATEGORIES,
    payload
});

export const setEditExpenseCategories = payload => ({
    type: TYPES.SET_EDI_EXPENSE_CATEGORIES,
    payload
});

export const setRemoveExpenseCategories = payload => ({
    type: TYPES.SET_REMOVE_EXPENSE_CATEGORIES,
    payload
});

export const createExpenseCategory = (payload = {}) => ({
    type: TYPES.CREATE_EXPENSE_CATEGORY,
    payload
});

export const getEditExpenseCategory = (payload = {}) => ({
    type: TYPES.GET_CREATE_EXPENSE_CATEGORY,
    payload
});

export const removeExpenseCategory = (payload = {}) => ({
    type: TYPES.REMOVE_EXPENSE_CATEGORY,
    payload
});

export const editExpenseCategory = (payload = {}) => ({
    type: TYPES.EDIT_EXPENSE_CATEGORY,
    payload
});

//  Taxes
// -------------------------------------------------
export const getTaxes = payload => ({
    type: TYPES.GET_TAXES,
    payload
});

export const setTaxes = payload => ({
    type: TYPES.SET_TAXES,
    payload
});

export const addTax = payload => ({
    type: TYPES.TAX_ADD,
    payload
});

export const editTax = payload => ({
    type: TYPES.TAX_EDIT,
    payload
});

export const removeTax = payload => ({
    type: TYPES.REMOVE_TAX,
    payload
});

export const setTax = payload => ({
    type: TYPES.SET_TAX,
    payload
});

export const setEditTax = payload => ({
    type: TYPES.SET_EDIT_TAX,
    payload
});

export const setRemoveTax = payload => ({
    type: TYPES.SET_REMOVE_TAX,
    payload
});

// Customize Settings
// -------------------------------------------------
export const getCustomizeSettings = (payload = {}) => ({
    type: TYPES.GET_CUSTOMIZE_SETTINGS,
    payload
});

export const setCustomizeSettings = (payload = {}) => ({
    type: TYPES.SET_CUSTOMIZE_SETTINGS,
    payload
});

export const editCustomizeSettings = (payload = {}) => ({
    type: TYPES.EDIT_CUSTOMIZE_SETTINGS,
    payload
});

// Payment methods
// -------------------------------------------------
export const getPaymentModes = (payload = {}) => ({
    type: TYPES.GET_PAYMENT_MODES,
    payload
});

export const setPaymentModes = (payload = {}) => ({
    type: TYPES.SET_PAYMENT_MODES,
    payload
});

export const setPaymentMode = (payload = {}) => ({
    type: TYPES.SET_PAYMENT_MODE,
    payload
});

export const createPaymentMode = (payload = {}) => ({
    type: TYPES.CREATE_PAYMENT_MODE,
    payload
});

export const editPaymentMode = (payload = {}) => ({
    type: TYPES.EDIT_PAYMENT_MODE,
    payload
});

export const removePaymentMode = (payload = {}) => ({
    type: TYPES.REMOVE_PAYMENT_MODE,
    payload
});

// Item Units
// -------------------------------------------------
export const getItemUnits = (payload = {}) => ({
    type: TYPES.GET_ITEM_UNITS,
    payload
});

export const setItemUnits = (payload = {}) => ({
    type: TYPES.SET_ITEM_UNITS,
    payload
});

export const setItemUnit = (payload = {}) => ({
    type: TYPES.SET_ITEM_UNIT,
    payload
});

export const createItemUnit = (payload = {}) => ({
    type: TYPES.CREATE_ITEM_UNIT,
    payload
});

export const editItemUnit = (payload = {}) => ({
    type: TYPES.EDIT_ITEM_UNIT,
    payload
});

export const removeItemUnit = (payload = {}) => ({
    type: TYPES.REMOVE_ITEM_UNIT,
    payload
});

// Currencies

export const setCurrencies = (payload = {}) => ({
    type: TYPES.SET_CURRENCIES,
    payload
});

export const setGlobalCurrencies = (payload = {}) => ({
    type: TYPES.SET_GLOBAL_CURRENCIES,
    payload
});

export const createCurrency = (payload = {}) => ({
    type: TYPES.CREATE_CURRENCY,
    payload
});

export const editCurrency = (payload = {}) => ({
    type: TYPES.EDIT_CURRENCY,
    payload
});

export const removeCurrency = (payload = {}) => ({
    type: TYPES.REMOVE_CURRENCY,
    payload
});

// Custom Fields
// -------------------------------------------------
export const getCustomFields = (payload = {}) => ({
    type: TYPES.GET_CUSTOM_FIELDS,
    payload
});

export const setCustomFields = (payload = {}) => ({
    type: TYPES.SET_CUSTOM_FIELDS,
    payload
});

export const createCustomField = (payload = {}) => ({
    type: TYPES.CREATE_CUSTOM_FIELD,
    payload
});

export const getCustomField = (payload = {}) => ({
    type: TYPES.GET_CUSTOM_FIELD,
    payload
});

export const editCustomField = (payload = {}) => ({
    type: TYPES.EDIT_CUSTOM_FIELD,
    payload
});

export const removeCustomField = (payload = {}) => ({
    type: TYPES.REMOVE_CUSTOM_FIELD,
    payload
});

export const resetCustomFields = (payload = {}) => ({
    type: TYPES.RESET_CUSTOM_FIELDS,
    payload
});

// General Settings

export const getGeneralSetting = (payload = {}) => ({
    type: TYPES.GET_GENERAL_SETTING,
    payload
});

// Next Number

export const getNextNumber = (payload = {}) => ({
    type: TYPES.GET_NEXT_NUMBER,
    payload
})
