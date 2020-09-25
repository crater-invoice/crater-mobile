import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const SET_ENDPOINT_API = 'settingsForm/SET_ENDPOINT_API';
export const EDIT_ACCOUNT = 'accountForm/EDIT_ACCOUNT';
export const EDIT_COMPANY = 'accountForm/EDIT_COMPANY';
export const EDIT_LANGUAGE_AND_CURRENCY = 'accountForm/EDIT_LANGUAGE_AND_CURRENCY';
export const NOTIFICATION = 'notification/NOTIFICATION';

export const SEARCH_TAX = 'taxForm/SEARCH_TAX';
export const TAX_FORM = 'taxForm/TAX_FORM';


export const CATEGORY_SEARCH = 'categories/CATEGORY_SEARCH';
export const CATEGORY_FORM = 'categories/CATEGORY_FORM';

export const CUSTOMIZE_FORM = 'customize/CUSTOMIZE_FORM';

// Type
// -----------------------------------------
export const CATEGORY_ADD = 'category/CATEGORY_ADD';
export const CATEGORY_EDIT = 'category/CATEGORY_EDIT';
export const EDIT_TAX = 'taxType/EDIT_TAX';
export const ADD_TAX = 'taxType/ADD_TAX';

// Actions
// -----------------------------------------
export const SETTINGS_SEARCH = 'settings/SETTINGS_SEARCH';
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';
export const LOGOUT = 'settings/LOGOUT';

// Preferences
export const GET_PREFERENCES = 'preferences/GET_PREFERENCES';
export const EDIT_PREFERENCES = 'preferences/EDIT_PREFERENCES';
export const SET_PREFERENCES = 'preferences/SET_PREFERENCES';
export const CLEAR_PREFERENCES = 'preferences/CLEAR_PREFERENCES';

// Setting
export const GET_SETTING_ITEM = 'settings/GET_SETTING_ITEM';
export const EDIT_SETTING_ITEM = 'settings/EDIT_SETTING_ITEM';

// Company
export const GET_COMPANY_INFO = 'accountForm/GET_COMPANY_INFO';
export const SET_COMPANY_INFO = 'accountForm/SET_COMPANY_INFO';
export const EDIT_COMPANY_INFO = 'accountForm/EDIT_COMPANY_INFO';

// Account
export const GET_ACCOUNT_INFO = 'accountForm/GET_ACCOUNT_INFO';
export const SET_ACCOUNT_INFO = 'accountForm/SET_ACCOUNT_INFO';
export const EDIT_ACCOUNT_INFO = 'accountForm/EDIT_ACCOUNT_INFO';

// Categories
export const GET_EXPENSE_CATEGORIES = 'categories/GET_EXPENSE_CATEGORIES';
export const GET_CREATE_EXPENSE_CATEGORY = 'categories/GET_CREATE_EXPENSE_CATEGORY';

// Customize Settings
export const GET_CUSTOMIZE_SETTINGS = 'customize/GET_CUSTOMIZE_SETTINGS';
export const SET_CUSTOMIZE_SETTINGS = 'customize/SET_CUSTOMIZE_SETTINGS';
export const EDIT_CUSTOMIZE_SETTINGS = 'categories/EDIT_CUSTOMIZE_SETTINGS';

// Payment Methods
export const GET_PAYMENT_MODES = 'payments/GET_PAYMENT_MODES';
export const SET_PAYMENT_MODES = 'payments/SET_PAYMENT_MODES';
export const SET_PAYMENT_MODE = 'payments/SET_PAYMENT_MODE';
export const CREATE_PAYMENT_MODE = 'payments/CREATE_PAYMENT_MODE';
export const EDIT_PAYMENT_MODE = 'payments/EDIT_PAYMENT_MODE';
export const REMOVE_PAYMENT_MODE = 'payments/REMOVE_PAYMENT_MODE';

// Item Unit
export const GET_ITEM_UNITS = 'units/GET_ITEM_UNITS';
export const SET_ITEM_UNITS = 'units/SET_ITEM_UNITS';
export const SET_ITEM_UNIT = 'units/SET_ITEM_UNIT';
export const CREATE_ITEM_UNIT = 'units/CREATE_ITEM_UNIT';
export const EDIT_ITEM_UNIT = 'units/EDIT_ITEM_UNIT';
export const REMOVE_ITEM_UNIT = 'units/REMOVE_ITEM_UNIT';

// Menus
// -----------------------------------------
export const SETTINGS_MENU = (language, Lng) => {
    return [
        {
            title: Lng.t("settings.accountSettings", { locale: language }),
            leftIcon: 'user',
            iconSize: 24,
            fullItem: {
                route: ROUTES.ACCOUNT_INFO
            }
        },
        {
            title: Lng.t("settings.companyInformation", { locale: language }),
            leftIcon: 'building',
            iconSize: 24,
            fullItem: {
                route: ROUTES.COMPANY_INFO
            }
        },
        {
            title: Lng.t("settings.preference", { locale: language }),
            leftIcon: 'sun',
            leftIconSolid: true,
            fullItem: {
                route: ROUTES.PREFERENCES
            }
        },
        {
            title: Lng.t("settings.notification", { locale: language }),
            leftIcon: 'bell',
            iconSize: 25,
            fullItem: {
                route: ROUTES.NOTIFICATIONS
            }
        },
        {
            title: Lng.t("settings.LanguageAndCurrency", { locale: language }),
            leftIcon: 'language',
            iconSize: 21,
            fullItem: {
                route: ROUTES.LANGUAGE_AND_CURRENCY
            }
        },
        {
            title: Lng.t("settings.customize", { locale: language }),
            leftIcon: 'edit',
            iconSize: 22,
            fullItem: {
                route: ROUTES.CUSTOMIZES
            }
        },
        {
            title: Lng.t("settings.taxes", { locale: language }),
            leftIcon: 'percent',
            fullItem: {
                route: ROUTES.TAXES
            }
        },
        {
            title: Lng.t("settings.expenseCategory", { locale: language }),
            leftIcon: 'clipboard-list',
            iconSize: 24,
            fullItem: {
                route: ROUTES.CATEGORIES
            }
        },
        {
            title: Lng.t("settings.endpoint", { locale: language }),
            leftIcon: 'link',
            fullItem: {
                route: ROUTES.ENDPOINTS_SETTINGS
            }
        },
    ]
}

// Customize Type
// -----------------------------------------
export const CUSTOMIZE_TYPE = {
    INVOICES: 'customize/Invoices',
    ESTIMATES: 'customize/ESTIMATES',
    PAYMENTS: 'customize/PAYMENTS',
    ITEMS: 'customize/ITEMS',
}

// Customize Menu
// -----------------------------------------
export const CUSTOMIZES_MENU = (language, Lng) => {
    return [
        {
            title: Lng.t("header.invoices", { locale: language }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.INVOICES
            }
        },
        {
            title: Lng.t("header.estimates", { locale: language }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.ESTIMATES
            }
        },
        {
            title: Lng.t("header.payments", { locale: language }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.PAYMENTS
            }
        },
        {
            title: Lng.t("header.items", { locale: language }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.ITEMS
            }
        }
    ]
}

export const PAYMENT_TABS = {
    MODE: 'MODE',
    PREFIX: 'PREFIX',
};

// Endpoint Api URL
// -----------------------------------------
export const GET_COMPANY_URL = () => `settings/company`
export const EDIT_COMPANY_URL = () => `settings/company`

export const GET_ACCOUNT_URL = () => `settings/profile`
export const EDIT_ACCOUNT_URL = () => `settings/profile`
export const EDIT_ACCOUNT_AVATAR_URL = () => `settings/profile/upload-avatar`

export const GET_PREFERENCES_URL = () => `settings/general`
export const EDIT_PREFERENCES_URL = () => `settings/general`

export const GET_GENERAL_SETTING_URL = (key) => `settings/get-setting?key=${key}`
export const EDIT_GENERAL_SETTING_URL = () => `settings/update-setting`

export const UPLOAD_LOGO_URL = () => `settings/company/upload-logo`

// Customize Settings
export const GET_CUSTOMIZE_SETTINGS_URL = () => `settings/get-customize-setting`
export const EDIT_CUSTOMIZE_SETTINGS_URL = () => `settings/update-customize-setting`

// Payment Methods
export const GET_PAYMENT_MODES_URL = () => `payment-methods`
export const CREATE_PAYMENT_MODE_URL = () => `payment-methods`
export const EDIT_PAYMENT_MODE_URL = (id) => `payment-methods/${id}`
export const REMOVE_PAYMENT_MODE_URL = (id) => `payment-methods/${id}`

// Item Unit
export const GET_ITEM_UNITS_URL = () => `units`
export const CREATE_ITEM_UNIT_URL = () => `units`
export const EDIT_ITEM_UNIT_URL = (id) => `units/${id}`
export const REMOVE_ITEM_UNIT_URL = (id) => `units/${id}`
