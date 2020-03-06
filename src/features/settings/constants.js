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
    ADDRESSES: 'customize/ADDRESSES',
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
            title: Lng.t("header.addresses", { locale: language }),
            fullItem: {
                route: ROUTES.CUSTOMIZE,
                type: CUSTOMIZE_TYPE.ADDRESSES
            }
        },
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

// Customize Action
// -----------------------------------------
export const CUSTOMIZE_ADDRESSES_ACTION = {
    BILLING: "billing_address_format",
    SHIPPING: "shipping_address_format",
    COMPANY: "company_address_format",
    CUSTOMER: "customer_format",
    TERMS_AND_CONDITION: "terms_and_conditions",
}

// Customize Addresses
// -----------------------------------------
export const CUSTOMIZE_ADDRESSES = () => {
    return [
        {
            label: "customizes.addresses.billing",
            value: CUSTOMIZE_ADDRESSES_ACTION.BILLING
        },
        {
            label: "customizes.addresses.shipping",
            value: CUSTOMIZE_ADDRESSES_ACTION.SHIPPING
        },
        {
            label: "customizes.addresses.company",
            value: CUSTOMIZE_ADDRESSES_ACTION.COMPANY
        }
    ]
}

// Customize Contact Fields
// -----------------------------------------
export const FORMAT_CONTACT_FIELDS = () => {
    return [
        {
            label: "customers.displayName",
            value: "CONATCT_DISPLAY_NAME"
        },
        {
            label: "customers.contactName",
            value: "PRIMARY_CONTACT_NAME"
        },
        {
            label: "customers.email",
            value: "CONATCT_EMAIL"
        },
        {
            label: "customers.phone",
            value: "CONATCT_PHONE"
        },
        {
            label: "customers.website",
            value: "CONATCT_WEBSITE"
        }
    ]
}

// Customize Address Fields
// -----------------------------------------
export const FORMAT_ADDRESS_FIELDS = (type = '') => {
    let isCompany = (type === CUSTOMIZE_ADDRESSES_ACTION.COMPANY)
    let isShipping = (type === CUSTOMIZE_ADDRESSES_ACTION.SHIPPING)

    return [
        {
            label: isCompany ?
                "settings.company.name" : "customers.name",
            value: isCompany ? "COMPANY_NAME"
                : isShipping ? "SHIPPING_ADDRESS_NAME" : "BILLING_ADDRESS_NAME"
        },
        {
            label: "customers.address.country",
            value: isCompany ? "COMPANY_COUNTRY"
                : isShipping ? "SHIPPING_COUNTRY" : "BILLING_COUNTRY"
        },
        {
            label: "customers.address.state",
            value: isCompany ? "COMPANY_STATE"
                : isShipping ? "SHIPPING_STATE" : "BILLING_STATE"
        },
        {
            label: "customers.address.city",
            value: isCompany ? "COMPANY_CITY"
                : isShipping ? "SHIPPING_CITY" : "BILLING_CITY"
        },
        {
            label: "customers.address.addressStreet1",
            value: isCompany ? "COMPANY_ADDRESS_STREET_1"
                : isShipping ? "SHIPPING_ADDRESS_STREET_1" : "BILLING_ADDRESS_STREET_1"
        },
        {
            label: "customers.address.addressStreet2",
            value: isCompany ? "COMPANY_ADDRESS_STREET_2"
                : isShipping ? "SHIPPING_ADDRESS_STREET_2" : "BILLING_ADDRESS_STREET_2"
        },
        {
            label: "customers.address.phone",
            value: isCompany ? "COMPANY_PHONE"
                : isShipping ? "SHIPPING_PHONE" : "BILLING_PHONE"
        },
        {
            label: "customers.address.zipcode",
            value: isCompany ? "COMPANY_ZIP_CODE"
                : isShipping ? "SHIPPING_ZIP_CODE" : "BILLING_ZIP_CODE"
        }
    ]
}

// Customize Address Fields View Container
// -----------------------------------------
export const addressFields = [
    {
        label: 'customers.customer',
        fields: FORMAT_CONTACT_FIELDS(),
        type: CUSTOMIZE_ADDRESSES_ACTION.CUSTOMER
    },
    {
        label: 'customers.billingAddress',
        fields: FORMAT_ADDRESS_FIELDS(CUSTOMIZE_ADDRESSES_ACTION.BILLING),
        type: CUSTOMIZE_ADDRESSES_ACTION.BILLING
    },
    {
        label: 'customers.shippingAddress',
        fields: FORMAT_ADDRESS_FIELDS(CUSTOMIZE_ADDRESSES_ACTION.SHIPPING),
        type: CUSTOMIZE_ADDRESSES_ACTION.SHIPPING
    },
    {
        label: 'customers.company',
        fields: FORMAT_ADDRESS_FIELDS(CUSTOMIZE_ADDRESSES_ACTION.COMPANY),
        type: CUSTOMIZE_ADDRESSES_ACTION.COMPANY
    }
]

// Term & Condition Field
// -----------------------------------------
export const TERMS_CONDITION_INSERT_FIELDS = (fieldName) => [{
    label: "termsCondition.title",
    value: fieldName
}]

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
