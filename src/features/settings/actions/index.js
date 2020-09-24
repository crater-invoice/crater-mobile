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
