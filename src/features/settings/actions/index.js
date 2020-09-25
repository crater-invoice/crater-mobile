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
    GET_CUSTOMIZE_SETTINGS,
    SET_CUSTOMIZE_SETTINGS,
    EDIT_CUSTOMIZE_SETTINGS,
    GET_PAYMENT_MODES,
    SET_PAYMENT_MODES,
    CREATE_PAYMENT_MODE,
    EDIT_PAYMENT_MODE,
    REMOVE_PAYMENT_MODE,
    SET_PAYMENT_MODE,
    GET_ITEM_UNITS,
    SET_ITEM_UNITS,
    SET_ITEM_UNIT,
    CREATE_ITEM_UNIT,
    EDIT_ITEM_UNIT,
    REMOVE_ITEM_UNIT,
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
