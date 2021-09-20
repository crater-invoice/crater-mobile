export const CUSTOMIZE_INVOICE_FORM = 'customize/CUSTOMIZE_INVOICE_FORM';
export const CUSTOMIZE_ESTIMATE_FORM = 'customize/CUSTOMIZE_ESTIMATE_FORM';
export const CUSTOMIZE_PAYMENT_FORM = 'customize/CUSTOMIZE_PAYMENT_FORM';

export const FETCH_NEXT_NUMBER = 'customize/FETCH_NEXT_NUMBER';

export const FETCH_CUSTOMIZE_SETTINGS = 'customize/FETCH_CUSTOMIZE_SETTINGS';
export const UPDATE_CUSTOMIZE_SETTINGS = 'customize/UPDATE_CUSTOMIZE_SETTINGS';
export const SPINNER = 'customize/SPINNER';

export const PAYMENT_TABS = {
  MODE: 'MODE',
  PREFIX: 'PREFIX'
};

export const INVOICE_SWITCH_FIELDS = [
  'set_due_date_automatically',
  'invoice_email_attachment',
  'invoice_auto_generate'
];

export const ESTIMATE_SWITCH_FIELDS = [
  'set_expiry_date_automatically',
  'estimate_email_attachment',
  'estimate_auto_generate'
];

export const PAYMENT_SWITCH_FIELDS = [
  'payment_auto_generate',
  'payment_email_attachment'
];

export const INVOICE_SETTINGS_TYPE = [
  'due_date_days',
  'set_due_date_automatically',
  'invoice_email_attachment',
  'invoice_auto_generate',
  'invoice_billing_address_format',
  'invoice_company_address_format',
  'invoice_mail_body',
  'invoice_number_length',
  'invoice_number_scheme',
  'invoice_number_separator',
  'invoice_prefix',
  'invoice_shipping_address_format'
];

export const ESTIMATE_SETTINGS_TYPE = [
  'expiry_date_days',
  'estimate_auto_generate',
  'estimate_email_attachment',
  'set_expiry_date_automatically',
  'estimate_billing_address_format',
  'estimate_company_address_format',
  'estimate_mail_body',
  'estimate_number_length',
  'estimate_number_scheme',
  'estimate_number_separator',
  'estimate_prefix',
  'estimate_shipping_address_format'
];

export const PAYMENT_SETTINGS_TYPE = [
  'payment_auto_generate',
  'payment_email_attachment',
  'payment_company_address_format',
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
