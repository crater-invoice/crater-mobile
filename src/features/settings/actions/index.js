import {SET_SETTINGS} from '@/constants';
import * as TYPES from '../constants';

export const settingsTriggerSpinner = payload => ({
  type: TYPES.SETTINGS_TRIGGER_SPINNER,
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

// Notes
// -------------------------------------------------
export const getNotes = payload => ({
  type: TYPES.GET_NOTES,
  payload
});

export const setNotes = payload => ({
  type: TYPES.SET_NOTES,
  payload
});

export const getCreateNote = payload => ({
  type: TYPES.GET_CREATE_NOTE,
  payload
});

export const createNote = payload => ({
  type: TYPES.CREATE_NOTE,
  payload
});

export const removeNote = payload => ({
  type: TYPES.REMOVE_NOTE,
  payload
});

export const getNoteDetail = payload => ({
  type: TYPES.GET_NOTE_DETAIL,
  payload
});

export const updateNote = payload => ({
  type: TYPES.UPDATE_NOTE,
  payload
});

export const createFromNotes = payload => ({
  type: TYPES.CREATE_FROM_NOTES,
  payload
});

export const removeFromNotes = payload => ({
  type: TYPES.REMOVE_FROM_NOTES,
  payload
});

export const updateFromNotes = payload => ({
  type: TYPES.UPDATE_FROM_NOTES,
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

export const createFromCustomFields = (payload = {}) => ({
  type: TYPES.CREATE_FROM_CUSTOM_FIELDS,
  payload
});

export const updateFromCustomFields = (payload = {}) => ({
  type: TYPES.UPDATE_FROM_CUSTOM_FIELDS,
  payload
});

export const removeFromCustomFields = (payload = {}) => ({
  type: TYPES.REMOVE_FROM_CUSTOM_FIELDS,
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
});

export const getSettingInfo = (payload = {}) => ({
  type: TYPES.GET_SETTING_INFO,
  payload
});

// Biometry Auth
export const setBiometryAuthType = (payload = {}) => ({
  type: TYPES.SET_BIOMETRY_AUTH_TYPE,
  payload
});
