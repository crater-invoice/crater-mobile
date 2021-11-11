// Forms
// -----------------------------------------
export const NOTIFICATION = 'notification/NOTIFICATION';

export const TOUCH_FACE_ID_FORM = 'biometry/TOUCH_FACE_ID_FORM';

// -----------------------------------------
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';

// Next Number
export const GET_NEXT_NUMBER = 'general/GET_NEXT_NUMBER';

// General Settings
export const GET_GENERAL_SETTING = 'GET_GENERAL_SETTING';
export const GET_SETTING_INFO = 'GET_SETTING_INFO';

// Setting
export const GET_SETTING_ITEM = 'settings/GET_SETTING_ITEM';
export const EDIT_SETTING_ITEM = 'settings/EDIT_SETTING_ITEM';

// Biometry Auth
export const SET_BIOMETRY_AUTH_TYPE = 'authType/SET_BIOMETRY_AUTH_TYPE';

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
