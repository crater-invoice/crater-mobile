import { ROUTES } from '@/navigation';
import { PercentageIcon } from '@/icons';

// Forms
// -----------------------------------------
export const SET_ENDPOINT_API = 'settingsForm/SET_ENDPOINT_API';
export const EDIT_ACCOUNT = 'accountForm/EDIT_ACCOUNT';
export const EDIT_COMPANY = 'accountForm/EDIT_COMPANY';
export const EDIT_LANGUAGE_AND_CURRENCY =
    'accountForm/EDIT_LANGUAGE_AND_CURRENCY';
export const NOTIFICATION = 'notification/NOTIFICATION';

export const SEARCH_TAX = 'taxForm/SEARCH_TAX';
export const TAX_FORM = 'taxForm/TAX_FORM';

export const CATEGORY_SEARCH = 'categories/CATEGORY_SEARCH';
export const CATEGORY_FORM = 'categories/CATEGORY_FORM';

export const CUSTOMIZE_FORM = 'customize/CUSTOMIZE_FORM';

export const CURRENCIES_FORM = 'currencies/CURRENCIES_FORM';
export const CURRENCY_FORM = 'currencies/CURRENCY_FORM';

export const CUSTOM_FIELDS_FORM = 'custom-field/CUSTOM_FIELDS_FORM';
export const CUSTOM_FIELD_FORM = 'custom-field/CUSTOM_FIELD_FORM';

export const NOTES_SEARCH = 'notes/NOTES_SEARCH';
export const NOTE_FORM = 'notes/NOTE_FORM';
export const TOUCH_FACE_ID_FORM = 'biometry/TOUCH_FACE_ID_FORM';

// Types
// -----------------------------------------
export const CATEGORY_ADD = 'category/CATEGORY_ADD';
export const CATEGORY_EDIT = 'category/CATEGORY_EDIT';
export const EDIT_TAX = 'taxType/EDIT_TAX';
export const ADD_TAX = 'taxType/ADD_TAX';
export const CREATE_CURRENCY_TYPE = 'currencies/CREATE_CURRENCY_TYPE';
export const EDIT_CURRENCY_TYPE = 'currencies/EDIT_CURRENCY_TYPE';
export const CREATE_CUSTOM_FIELD_TYPE = 'custom-field/CREATE_CUSTOM_FIELD_TYPE';
export const EDIT_CUSTOM_FIELD_TYPE = 'custom-field/EDIT_CUSTOM_FIELD_TYPE';
export const NOTES_ADD = 'notes/NOTES_ADD';
export const NOTES_EDIT = 'notes/NOTES_EDIT';

// -----------------------------------------
export const SETTINGS_SEARCH = 'settings/SETTINGS_SEARCH';
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';
export const LOGOUT = 'settings/LOGOUT';

// Next Number
export const GET_NEXT_NUMBER = 'general/GET_NEXT_NUMBER';

// General Settings
export const GET_GENERAL_SETTING = 'GET_GENERAL_SETTING';
export const GET_SETTING_INFO = 'GET_SETTING_INFO';

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
export const GET_CREATE_EXPENSE_CATEGORY =
    'categories/GET_CREATE_EXPENSE_CATEGORY';

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

// Notes
export const GET_NOTES = 'notes/GET_NOTES';
export const SET_NOTES = 'notes/SET_NOTES';
export const GET_CREATE_NOTE = 'notes/GET_CREATE_NOTE';
export const CREATE_NOTE = 'notes/CREATE_NOTE';
export const REMOVE_NOTE = 'notes/REMOVE_NOTE';
export const UPDATE_NOTE = 'notes/UPDATE_NOTE';
export const GET_NOTE_DETAIL = 'notes/GET_NOTE_DETAIL';
export const GET_UPDATE_NOTES = 'notes/GET_UPDATE_NOTES';
export const SAVE_NOTES = 'notes/SAVE_NOTES';
export const CREATE_FROM_NOTES = 'notes/CREATE_FROM_NOTES';
export const REMOVE_FROM_NOTES = 'notes/REMOVE_FROM_NOTES';
export const UPDATE_FROM_NOTES = 'notes/UPDATE_FROM_NOTES';

// Item Unit
export const GET_ITEM_UNITS = 'units/GET_ITEM_UNITS';
export const SET_ITEM_UNITS = 'units/SET_ITEM_UNITS';
export const SET_ITEM_UNIT = 'units/SET_ITEM_UNIT';
export const CREATE_ITEM_UNIT = 'units/CREATE_ITEM_UNIT';
export const EDIT_ITEM_UNIT = 'units/EDIT_ITEM_UNIT';
export const REMOVE_ITEM_UNIT = 'units/REMOVE_ITEM_UNIT';

// Currencies
export const SET_CURRENCIES = 'currencies/SET_CURRENCIES';
export const SET_GLOBAL_CURRENCIES = 'currencies/SET_GLOBAL_CURRENCIES';
export const CREATE_CURRENCY = 'currencies/CREATE_CURRENCY';
export const EDIT_CURRENCY = 'currencies/EDIT_CURRENCY';
export const REMOVE_CURRENCY = 'currencies/REMOVE_CURRENCY';

// Languages
export const SET_LANGUAGES = 'languages/SET_LANGUAGES';

// Custom Fields
export const GET_CUSTOM_FIELDS = 'custom-field/GET_CUSTOM_FIELDS';
export const SET_CUSTOM_FIELDS = 'custom-field/SET_CUSTOM_FIELDS';
export const CREATE_CUSTOM_FIELD = 'custom-field/CREATE_CUSTOM_FIELD';
export const GET_CUSTOM_FIELD = 'custom-field/GET_CUSTOM_FIELD';
export const EDIT_CUSTOM_FIELD = 'custom-field/EDIT_CUSTOM_FIELD';
export const REMOVE_CUSTOM_FIELD = 'custom-field/REMOVE_CUSTOM_FIELD';

export const CREATE_FROM_CUSTOM_FIELDS =
    'custom-field/CREATE_FROM_CUSTOM_FIELDS';
export const REMOVE_FROM_CUSTOM_FIELDS =
    'custom-field/REMOVE_FROM_CUSTOM_FIELDS';
export const UPDATE_FROM_CUSTOM_FIELDS =
    'custom-field/UPDATE_FROM_CUSTOM_FIELDS';

// Taxes
export const GET_TAXES = 'taxes/GET_TAXES';
export const SET_TAXES = 'taxes/SET_TAXES';
export const SET_TAX = 'taxes/SET_TAX';
export const SET_EDIT_TAX = 'taxes/SET_EDIT_TAX';
export const SET_REMOVE_TAX = 'taxes/SET_REMOVE_TAX';
export const TAX_EDIT = 'taxes/TAX_EDIT';
export const TAX_ADD = 'taxes/TAX_ADD';
export const REMOVE_TAX = 'taxes/REMOVE_TAX';

// Biometry Auth
export const SET_BIOMETRY_AUTH_TYPE = 'authType/SET_BIOMETRY_AUTH_TYPE';

export const CREATE_EXPENSE_CATEGORY = 'categories/CREATE_EXPENSE_CATEGORY';
export const EDIT_EXPENSE_CATEGORY = 'categories/EDIT_EXPENSE_CATEGORY';
export const REMOVE_EXPENSE_CATEGORY = 'categories/REMOVE_EXPENSE_CATEGORY';

export const SET_EXPENSE_CATEGORIES = 'categories/SET_EXPENSE_CATEGORIES';
export const SET_CREATE_EXPENSE_CATEGORIES =
    'categories/SET_CREATE_EXPENSE_CATEGORIES';
export const SET_EDI_EXPENSE_CATEGORIES =
    'categories/SET_EDI_EXPENSE_CATEGORIES';
export const SET_REMOVE_EXPENSE_CATEGORIES =
    'categories/SET_REMOVE_EXPENSE_CATEGORIES';

// CustomField Form Fields
// -----------------------------------------
export const CUSTOM_FIELDS = {
    FIELD: 'field', // root object

    NAME: 'name',
    MODAL_TYPE: 'model_type',
    IS_REQUIRED: 'is_required',
    TYPE: 'type',
    LABEL: 'label',
    DEFAULT_VALUE: 'default_answer',
    PLACEHOLDER: 'placeholder',
    OPTIONS: 'options',
    ORDER: 'order'
};

// Custom Field Data Type Option Values
// -----------------------------------------
export const DATA_TYPE_OPTION_VALUE = {
    INPUT: 'Input',
    TEXTAREA: 'TextArea',
    PHONE: 'Phone',
    URL: 'Url',
    NUMBER: 'Number',
    DROPDOWN: 'Dropdown',
    SWITCH: 'Switch',
    DATE: 'Date',
    TIME: 'Time',
    DATE_TIME: 'DateTime'
};

// Custom Field Data Type Options
// -----------------------------------------
const VALUE = DATA_TYPE_OPTION_VALUE;

export const CUSTOM_FIELD_DATA_TYPE_LIST = [
    { label: 'Text', value: VALUE.INPUT },
    { label: 'Textarea', value: VALUE.TEXTAREA },
    { label: 'Phone', value: VALUE.PHONE },
    { label: 'URL', value: VALUE.URL },
    { label: 'Number', value: VALUE.NUMBER },
    { label: 'Select Field', value: VALUE.DROPDOWN },
    { label: 'Switch Toggle', value: VALUE.SWITCH },
    { label: 'Date', value: VALUE.DATE },
    { label: 'Time', value: VALUE.TIME },
    { label: 'Date & Time', value: VALUE.DATE_TIME }
];

// Custom Field Modal Type Values
// -----------------------------------------
export const MODAL_TYPE_VALUE = {
    CUSTOMER: 'Customer',
    INVOICE: 'Invoice',
    ESTIMATE: 'Estimate',
    EXPENSE: 'Expense',
    PAYMENT: 'Payment'
};

// Custom Field Type
// -----------------------------------------
export const CUSTOM_FIELD_TYPES = MODAL_TYPE_VALUE;
export const CUSTOM_FIELD_DATA_TYPES = DATA_TYPE_OPTION_VALUE;

// Custom Field Modal
// -----------------------------------------
export const CUSTOM_FIELD_MODAL_TYPES = [
    { label: 'Customer', value: MODAL_TYPE_VALUE.CUSTOMER },
    { label: 'Invoice', value: MODAL_TYPE_VALUE.INVOICE },
    { label: 'Estimate', value: MODAL_TYPE_VALUE.ESTIMATE },
    { label: 'Expense', value: MODAL_TYPE_VALUE.EXPENSE },
    { label: 'Payment', value: MODAL_TYPE_VALUE.PAYMENT }
];

// Notes Field Modal
// -----------------------------------------

export const NOTES_TYPE_VALUE = {
    INVOICE: 'Invoice',
    ESTIMATE: 'Estimate',
    PAYMENT: 'Payment'
};

export const NOTES_FIELD_MODAL_TYPES = [
    { label: 'Invoice', value: NOTES_TYPE_VALUE.INVOICE },
    { label: 'Estimate', value: NOTES_TYPE_VALUE.ESTIMATE },
    { label: 'Payment', value: NOTES_TYPE_VALUE.PAYMENT }
];

// Menus
// -----------------------------------------
export const SETTINGS_MENU = (locale, Lng) => {
    return [
        {
            title: Lng.t('settings.accountSettings', { locale }),
            leftIcon: 'user-circle',
            leftIconSolid: true,
            iconSize: 20,
            fullItem: {
                route: ROUTES.ACCOUNT_INFO
            }
        },
        {
            title: Lng.t('settings.companyInformation', { locale }),
            leftIcon: 'building',
            leftIconSolid: true,
            iconSize: 17,
            fullItem: {
                route: ROUTES.COMPANY_INFO
            }
        },
        {
            title: Lng.t('settings.preference', { locale }),
            leftIcon: 'sun',
            leftIconSolid: true,
            iconSize: 21,
            fullItem: {
                route: ROUTES.PREFERENCES
            }
        },
        {
            title: Lng.t('settings.LanguageAndCurrency', { locale: locale }),
            leftIcon: 'language',
            iconSize: 20,
            fullItem: {
                route: ROUTES.LANGUAGE_AND_CURRENCY
            }
        },
        {
            title: Lng.t('settings.customize', { locale }),
            leftIcon: 'pen-square',
            leftIconSolid: true,
            iconSize: 21,
            fullItem: {
                route: ROUTES.CUSTOMIZES
            }
        },
        {
            title: Lng.t('settings.notification', { locale }),
            leftIcon: 'bell',
            leftIconSolid: true,
            iconSize: 20,
            fullItem: {
                route: ROUTES.NOTIFICATIONS
            }
        },
        {
            title: Lng.t('settings.taxes', { locale }),
            leftIconSvg: PercentageIcon,
            leftIconSolid: true,
            iconSize: 17,
            fullItem: {
                route: ROUTES.TAXES
            }
        },
        {
            title: Lng.t('header.customFields', { locale }),
            leftIcon: 'cube',
            iconSize: 20,
            fullItem: {
                route: ROUTES.CUSTOM_FIELDS
            }
        },
        {
            title: Lng.t('settings.notes', { locale }),
            leftIcon: 'clipboard-check',
            leftIconSolid: true,
            iconSize: 20,
            fullItem: {
                route: ROUTES.NOTES
            }
        },
        {
            title: Lng.t('settings.expenseCategory', { locale }),
            leftIcon: 'clipboard-list',
            iconSize: 20,
            fullItem: {
                route: ROUTES.CATEGORIES
            }
        },
        {
            title: Lng.t('settings.touchOrFaceId', { locale }),
            leftIcon: 'key',
            leftIconSolid: true,
            iconSize: 20,
            fullItem: {
                route: ROUTES.TOUCH_OR_FACE_ID
            }
        },
        {
            title: Lng.t('settings.endpoint', { locale }),
            leftIcon: 'link',
            iconSize: 20,
            fullItem: {
                route: ROUTES.ENDPOINTS_SETTINGS
            }
        }
    ];
};

// Customize Type
// -----------------------------------------
export const CUSTOMIZE_TYPE = {
    ADDRESSES: 'customize/ADDRESSES',
    INVOICES: 'customize/Invoices',
    ESTIMATES: 'customize/ESTIMATES',
    PAYMENTS: 'customize/PAYMENTS',
    ITEMS: 'customize/ITEMS',
    CURRENCIES: 'customize/CURRENCIES'
};

// Customize Menu
// -----------------------------------------
export const CUSTOMIZES_MENU = (locale, Lng) => {
    return [
        {
            title: Lng.t('header.invoices', { locale }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.INVOICES
            }
        },
        {
            title: Lng.t('header.estimates', { locale }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.ESTIMATES
            }
        },
        {
            title: Lng.t('header.payments', { locale }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.PAYMENTS
            }
        },
        {
            title: Lng.t('header.items', { locale }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.ITEMS
            }
        }
    ];
};

// Customize Address Fields
// -----------------------------------------

export const PAYMENT_TABS = {
    MODE: 'MODE',
    PREFIX: 'PREFIX'
};

// Term & Condition Field
// -----------------------------------------
export const COMPANY_SETTINGS_TYPE = [
    'payment_auto_generate',
    'payment_prefix',
    'invoice_auto_generate',
    'invoice_prefix',
    'invoice_mail_body',
    'estimate_auto_generate',
    'estimate_prefix',
    'estimate_mail_body',
    'invoice_billing_address_format',
    'invoice_shipping_address_format',
    'invoice_company_address_format',
    'payment_mail_body',
    'payment_company_address_format',
    'payment_from_customer_address_format',
    'estimate_company_address_format',
    'estimate_billing_address_format',
    'estimate_shipping_address_format'
];

export const PREFERENCES_SETTING_TYPE = [
    'currency',
    'time_zone',
    'language',
    'fiscal_year',
    'carbon_date_format',
    'moment_date_format',
    'discount_per_item',
    'tax_per_item'
];

// Notification
export const NOTIFICATION_MAIL_TYPE = [
    'notify_invoice_viewed',
    'notify_estimate_viewed',
    'notification_email'
];
