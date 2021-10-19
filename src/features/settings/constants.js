import {routes} from '@/navigation';
import {PercentageIcon} from '@/icons';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

// Forms
// -----------------------------------------
export const SET_ENDPOINT_API = 'settingsForm/SET_ENDPOINT_API';
export const EDIT_ACCOUNT = 'accountForm/EDIT_ACCOUNT';
export const EDIT_COMPANY = 'accountForm/EDIT_COMPANY';
export const NOTIFICATION = 'notification/NOTIFICATION';

export const SEARCH_TAX = 'taxForm/SEARCH_TAX';
export const TAX_FORM = 'taxForm/TAX_FORM';

export const CATEGORY_SEARCH = 'categories/CATEGORY_SEARCH';
export const CATEGORY_FORM = 'categories/CATEGORY_FORM';

export const CURRENCIES_FORM = 'currencies/CURRENCIES_FORM';
export const CURRENCY_FORM = 'currencies/CURRENCY_FORM';

export const CUSTOM_FIELDS_FORM = 'custom-field/CUSTOM_FIELDS_FORM';
export const CUSTOM_FIELD_FORM = 'custom-field/CUSTOM_FIELD_FORM';

export const NOTES_SEARCH = 'notes/NOTES_SEARCH';
export const NOTE_FORM = 'notes/NOTE_FORM';
export const TOUCH_FACE_ID_FORM = 'biometry/TOUCH_FACE_ID_FORM';

// Types
// -----------------------------------------
export const CREATE_CURRENCY_TYPE = 'currencies/CREATE_CURRENCY_TYPE';
export const EDIT_CURRENCY_TYPE = 'currencies/EDIT_CURRENCY_TYPE';

// -----------------------------------------
export const SETTINGS_SEARCH = 'settings/SETTINGS_SEARCH';
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';

// Next Number
export const GET_NEXT_NUMBER = 'general/GET_NEXT_NUMBER';

// General Settings
export const GET_GENERAL_SETTING = 'GET_GENERAL_SETTING';
export const GET_SETTING_INFO = 'GET_SETTING_INFO';

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
  {label: 'Text', value: VALUE.INPUT},
  {label: 'Textarea', value: VALUE.TEXTAREA},
  {label: 'Phone', value: VALUE.PHONE},
  {label: 'URL', value: VALUE.URL},
  {label: 'Number', value: VALUE.NUMBER},
  {label: 'Select Field', value: VALUE.DROPDOWN},
  {label: 'Switch Toggle', value: VALUE.SWITCH},
  {label: 'Date', value: VALUE.DATE},
  {label: 'Time', value: VALUE.TIME},
  {label: 'Date & Time', value: VALUE.DATE_TIME}
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
  {label: 'Customer', value: MODAL_TYPE_VALUE.CUSTOMER},
  {label: 'Invoice', value: MODAL_TYPE_VALUE.INVOICE},
  {label: 'Estimate', value: MODAL_TYPE_VALUE.ESTIMATE},
  {label: 'Expense', value: MODAL_TYPE_VALUE.EXPENSE},
  {label: 'Payment', value: MODAL_TYPE_VALUE.PAYMENT}
];

// Notes Field Modal
// -----------------------------------------

export const NOTES_TYPE_VALUE = {
  INVOICE: 'Invoice',
  RECURRING_INVOICE: 'RecurringInvoices',
  ESTIMATE: 'Estimate',
  PAYMENT: 'Payment'
};

export const NOTES_FIELD_MODAL_TYPES = [
  {label: 'Invoice', value: NOTES_TYPE_VALUE.INVOICE},
  {label: 'Recurring Invoices', value: NOTES_TYPE_VALUE.RECURRING_INVOICE},
  {label: 'Estimate', value: NOTES_TYPE_VALUE.ESTIMATE},
  {label: 'Payment', value: NOTES_TYPE_VALUE.PAYMENT}
];

// Menus
// -----------------------------------------
export const SETTINGS_MENU = () => {
  return [
    {
      title: t('settings.accountSettings'),
      leftIcon: 'user-circle',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.ACCOUNT_INFO},
      show: true
    },
    {
      title: t('settings.companyInformation'),
      leftIcon: 'building',
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.COMPANY_INFO},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.preference'),
      leftIcon: 'sun',
      leftIconSolid: true,
      iconSize: 21,
      fullItem: {route: routes.PREFERENCES},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.customize'),
      leftIcon: 'pen-square',
      leftIconSolid: true,
      iconSize: 21,
      fullItem: {
        route: routes.CUSTOMIZE_LIST
      },
      show:
        PermissionService.isAllowToView(routes.MAIN_PAYMENTS) ||
        PermissionService.isAllowToView(routes.GLOBAL_ITEMS)
    },
    {
      title: t('header.companies'),
      leftIcon: 'building',
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.COMPANIES},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.notification'),
      leftIcon: 'bell',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.NOTIFICATIONS},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('settings.taxes'),
      leftIconSvg: PercentageIcon,
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.TAXES},
      show: PermissionService.isAllowToView(routes.TAXES)
    },
    {
      title: t('header.customFields'),
      leftIcon: 'cube',
      iconSize: 20,
      fullItem: {route: routes.CUSTOM_FIELDS},
      show: PermissionService.isAllowToView(routes.CUSTOM_FIELDS)
    },
    {
      title: t('settings.notes'),
      leftIcon: 'clipboard-check',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.NOTES},
      show: true
    },
    {
      title: t('settings.expenseCategory'),
      leftIcon: 'clipboard-list',
      iconSize: 20,
      fullItem: {route: routes.CATEGORIES},
      show: PermissionService.isAllowToView(routes.MAIN_EXPENSES)
    },
    {
      title: t('settings.touchOrFaceId'),
      leftIcon: 'key',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.TOUCH_OR_FACE_ID},
      show: true
    },
    {
      title: t('settings.endpoint'),
      leftIcon: 'link',
      iconSize: 20,
      fullItem: {route: routes.ENDPOINTS_SETTINGS},
      show: PermissionService.isSuperAdmin()
    },
    {
      title: t('header.roles'),
      leftIcon: 'users',
      iconSize: 20,
      fullItem: {route: routes.ROLES},
      show: PermissionService.isAllowToView(routes.ROLES)
    }
  ];
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

// Notification
export const NOTIFICATION_MAIL_TYPE = [
  'notify_invoice_viewed',
  'notify_estimate_viewed',
  'notification_email'
];
