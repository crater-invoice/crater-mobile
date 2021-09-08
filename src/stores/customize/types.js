export const CUSTOMIZE_INVOICE_FORM = 'customize/CUSTOMIZE_INVOICE_FORM';
export const CUSTOMIZE_ESTIMATE_FORM = 'customize/CUSTOMIZE_ESTIMATE_FORM';
export const CUSTOMIZE_PAYMENT_FORM = 'customize/CUSTOMIZE_PAYMENT_FORM';

export const GET_CUSTOMIZE_SETTINGS = 'customize/GET_CUSTOMIZE_SETTINGS';
export const SET_CUSTOMIZE_SETTINGS = 'customize/SET_CUSTOMIZE_SETTINGS';
export const EDIT_CUSTOMIZE_SETTINGS = 'customize/EDIT_CUSTOMIZE_SETTINGS';

export const EDIT_SETTING_ITEM = 'settings/EDIT_SETTING_ITEM';
export const SETTINGS_TRIGGER_SPINNER = 'settings/SETTINGS_TRIGGER_SPINNER';

export const PAYMENT_TABS = {
  MODE: 'MODE',
  PREFIX: 'PREFIX'
};

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
