export const CUSTOMIZE_INVOICE_FORM = 'customize/CUSTOMIZE_INVOICE_FORM';
export const CUSTOMIZE_ESTIMATE_FORM = 'customize/CUSTOMIZE_ESTIMATE_FORM';
export const CUSTOMIZE_PAYMENT_FORM = 'customize/CUSTOMIZE_PAYMENT_FORM';

export const FETCH_CUSTOMIZE_SETTINGS = 'customize/FETCH_CUSTOMIZE_SETTINGS';
export const SET_CUSTOMIZE_SETTINGS = 'customize/SET_CUSTOMIZE_SETTINGS';
export const UPDATE_CUSTOMIZE_SETTINGS = 'customize/UPDATE_CUSTOMIZE_SETTINGS';

export const EDIT_SETTING_ITEM = 'settings/EDIT_SETTING_ITEM';
export const SPINNER = 'customize/SPINNER';

export const PAYMENT_TABS = {
  MODE: 'MODE',
  PREFIX: 'PREFIX'
};

export const COMPANY_SETTINGS_TYPE = [
  'invoice_auto_generate',
  'invoice_billing_address_format',
  'invoice_company_address_format',
  'invoice_email_attachment',
  'invoice_mail_body',
  'invoice_number_length',
  'invoice_number_scheme',
  'invoice_number_separator',
  'invoice_prefix',
  'invoice_shipping_address_format',

  'estimate_auto_generate',
  'estimate_billing_address_format',
  'estimate_company_address_format',
  'estimate_email_attachment',
  'estimate_mail_body',
  'estimate_number_length',
  'estimate_number_scheme',
  'estimate_number_separator',
  'estimate_prefix',
  'estimate_shipping_address_format',
  'set_expiry_date_automatically',

  'payment_auto_generate',
  'payment_company_address_format',
  'payment_email_attachment',
  'payment_from_customer_address_format',
  'payment_mail_body',
  'payment_number_length',
  'payment_number_scheme',
  'payment_number_separator',
  'payment_prefix'
];

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
