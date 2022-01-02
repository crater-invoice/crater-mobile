export const SPINNER = 'preference/SPINNER';

export const PREFERENCES_FORM = 'preference/PREFERENCES_FORM';
export const CREATE_COMPANY_FORM = 'company/CREATE_COMPANY_FORM';
export const COMPANY_ADDRESS_FORM = 'company/COMPANY_ADDRESS_FORM';

export const FETCH_PREFERENCES = 'preference/FETCH_PREFERENCES';

export const FETCH_COMPANIES = 'company/FETCH_COMPANIES';
export const FETCH_COMPANIES_SUCCESS = 'company/FETCH_COMPANIES_SUCCESS';

export const UPDATE_COMPANY = 'company/UPDATE_COMPANY';
export const UPDATE_COMPANY_SUCCESS = 'company/UPDATE_COMPANY_SUCCESS';

export const FETCH_INITIAL_DETAILS = 'company/FETCH_COMPANY_INITIAL_DETAILS';

export const ADD_COMPANY = 'company/ADD_COMPANY';
export const SET_SELECTED_COMPANY = 'company/SET_SELECTED_COMPANY';
export const SET_COMPANY_SETTING = 'company/SET_COMPANY_SETTING';

export const FETCH_CURRENCIES_SUCCESS = 'preference/FETCH_CURRENCIES_SUCCESS';
export const FETCH_TIMEZONES_SUCCESS = 'preference/FETCH_TIMEZONES_SUCCESS';
export const FETCH_DATE_FORMATS_SUCCESS =
  'preference/FETCH_DATE_FORMATS_SUCCESS';

export const UPDATE_PREFERENCES = 'preference/UPDATE_PREFERENCES';
export const UPDATE_PREFERENCES_SUCCESS =
  'preference/UPDATE_PREFERENCES_SUCCESS';

export const FETCH_COMPANY_SETTINGS = 'company/FETCH_COMPANY_SETTINGS';
export const FETCH_COMPANY_SETTINGS_SUCCESS =
  'company/FETCH_COMPANY_SETTINGS_SUCCESS';

export const UPDATE_COMPANY_SETTINGS = 'company/UPDATE_COMPANY_SETTINGS';

export const PREFERENCES_SETTING_KEYS = [
  'currency',
  'time_zone',
  'language',
  'fiscal_year',
  'carbon_date_format',
  'moment_date_format',
  'discount_per_item',
  'tax_per_item',
  'retrospective_edits'
];

export const COMPANY_SETTING_KEYS = [
  'invoice_mail_body',
  'estimate_mail_body',
  'payment_mail_body',
  'invoice_company_address_format',
  'invoice_shipping_address_format',
  'invoice_billing_address_format',
  'estimate_company_address_format',
  'estimate_shipping_address_format',
  'estimate_billing_address_format',
  'payment_company_address_format',
  'payment_from_customer_address_format',
  'currency',
  'time_zone',
  'language',
  'fiscal_year',
  'carbon_date_format',
  'moment_date_format',
  'notification_email',
  'notify_invoice_viewed',
  'notify_estimate_viewed',
  'tax_per_item',
  'discount_per_item',
  'invoice_email_attachment',
  'estimate_email_attachment',
  'payment_auto_generate',
  'payment_email_attachment',
  'retrospective_edits',
  'invoice_number_format',
  'estimate_number_format',
  'payment_number_format',
  'estimate_set_expiry_date_automatically',
  'estimate_expiry_date_days',
  'invoice_set_due_date_automatically',
  'invoice_due_date_days'
];
