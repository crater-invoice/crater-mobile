import {PercentageIcon} from '@/icons';
import {routes} from '@/navigation';
import {PermissionService} from '@/services';
import t from 'locales/use-translation';

// Forms
// -----------------------------------------
export const NOTIFICATION = 'notification/NOTIFICATION';

export const SEARCH_TAX = 'taxForm/SEARCH_TAX';
export const TAX_FORM = 'taxForm/TAX_FORM';

export const CUSTOM_FIELDS_FORM = 'custom-field/CUSTOM_FIELDS_FORM';
export const CUSTOM_FIELD_FORM = 'custom-field/CUSTOM_FIELD_FORM';

export const TOUCH_FACE_ID_FORM = 'biometry/TOUCH_FACE_ID_FORM';

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

// Menus
// -----------------------------------------
export const SETTINGS_MENU = () => {
  return [
    {
      title: t('settings.account_settings'),
      leftIcon: 'user-circle',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.ACCOUNT_INFO},
      show: true
    },
    {
      title: t('settings.company_information'),
      leftIcon: 'building',
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.CREATE_COMPANY},
      show: PermissionService.isAllowToManage(routes.CREATE_COMPANY)
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
      title: t('settings.taxes'),
      leftIconSvg: PercentageIcon,
      leftIconSolid: true,
      iconSize: 17,
      fullItem: {route: routes.TAXES},
      show: PermissionService.isAllowToView(routes.TAXES)
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
      title: t('settings.notes'),
      leftIcon: 'clipboard-check',
      leftIconSolid: true,
      iconSize: 20,
      fullItem: {route: routes.NOTES},
      show: PermissionService.isAllowToManage(routes.NOTES)
    },
    {
      title: t('header.roles'),
      leftIcon: 'users',
      iconSize: 20,
      fullItem: {route: routes.ROLES},
      show: PermissionService.isAllowToView(routes.ROLES)
    },
    {
      title: t('settings.touch_or_Face_id'),
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
