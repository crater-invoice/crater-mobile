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

// Taxes
export const GET_TAXES = 'taxes/GET_TAXES';
export const SET_TAXES = 'taxes/SET_TAXES';
export const SET_TAX = 'taxes/SET_TAX';
export const SET_EDIT_TAX = 'taxes/SET_EDIT_TAX';
export const SET_REMOVE_TAX = 'taxes/SET_REMOVE_TAX';
export const TAX_EDIT = 'taxes/TAX_EDIT';
export const TAX_ADD = 'taxes/TAX_ADD';
export const REMOVE_TAX = 'taxes/REMOVE_TAX';

export const CREATE_EXPENSE_CATEGORY = 'categories/CREATE_EXPENSE_CATEGORY';
export const EDIT_EXPENSE_CATEGORY = 'categories/EDIT_EXPENSE_CATEGORY';
export const REMOVE_EXPENSE_CATEGORY = 'categories/REMOVE_EXPENSE_CATEGORY';

export const SET_EXPENSE_CATEGORIES = 'categories/SET_EXPENSE_CATEGORIES';
export const SET_CREATE_EXPENSE_CATEGORIES = 'categories/SET_CREATE_EXPENSE_CATEGORIES';
export const SET_EDI_EXPENSE_CATEGORIES = 'categories/SET_EDI_EXPENSE_CATEGORIES';
export const SET_REMOVE_EXPENSE_CATEGORIES = 'categories/SET_REMOVE_EXPENSE_CATEGORIES';

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

// Expense Categories
export const GET_EXPENSE_CATEGORIES_URL = () => `categories`
export const GET_EDIT_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}/edit`

export const CREATE_EXPENSE_CATEGORIES_URL = () => `categories`
export const EDIT_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}`
export const REMOVE_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}`

// Tax Types
export const GET_SALES_TAXES_URL = () => `tax-types`

export const CREATE_SALES_TAX_URL = () => `tax-types`
export const EDIT_SALES_TAX_URL = (tax) => `tax-types/${tax.id}`
export const REMOVE_SALES_TAX_URL = (id) => `tax-types/${id}`