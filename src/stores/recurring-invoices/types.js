import t from 'locales/use-translation';

export const SPINNER = 'recurringInvoices/SPINNER';

export const FETCH_INITIAL_DETAILS = 'recurringInvoices/FETCH_INITIAL_DETAILS';
export const FETCH_INVOICE_TEMPLATES_SUCCESS =
  'recurringInvoices/FETCH_INVOICE_TEMPLATES_SUCCESS';
export const FETCH_NEXT_INVOICE_AT = 'recurringInvoices/FETCH_NEXT_INVOICE_AT';

export const CLEAR_RECURRING_INVOICE =
  'recurringInvoices/CLEAR_RECURRING_INVOICE';

export const CREATE_RECURRING_INVOICE_FORM =
  'recurringInvoices/CREATE_RECURRING_INVOICE_FORM';
export const RECURRING_INVOICE_SEARCH =
  'recurringInvoiceForm/RECURRING_INVOICE_SEARCH';

export const FETCH_RECURRING_INVOICES =
  'recurringInvoices/FETCH_RECURRING_INVOICES';
export const FETCH_RECURRING_INVOICES_SUCCESS =
  'recurringInvoices/FETCH_RECURRING_INVOICES_SUCCESS';

export const FETCH_SINGLE_RECURRING_INVOICE =
  'recurringInvoices/FETCH_SINGLE_RECURRING_INVOICE';

export const ADD_RECURRING_INVOICE = 'recurringInvoices/ADD_RECURRING_INVOICE';
export const ADD_RECURRING_INVOICE_SUCCESS =
  'recurringInvoices/ADD_RECURRING_INVOICE_SUCCESS';

export const UPDATE_RECURRING_INVOICE =
  'recurringInvoices/UPDATE_RECURRING_INVOICE';
export const UPDATE_RECURRING_INVOICE_SUCCESS =
  'recurringInvoices/UPDATE_RECURRING_INVOICE_SUCCESS';

export const REMOVE_RECURRING_INVOICE =
  'recurringInvoices/REMOVE_RECURRING_INVOICE';
export const REMOVE_RECURRING_INVOICE_SUCCESS =
  'recurringInvoices/REMOVE_RECURRING_INVOICE_SUCCESS';

export const FETCH_ITEMS = 'recurringInvoices/FETCH_ITEMS';

export const ADD_RECURRING_INVOICE_ITEM =
  'recurringInvoices/ADD_RECURRING_INVOICE_ITEM';
export const ADD_RECURRING_INVOICE_ITEM_SUCCESS =
  'recurringInvoices/ADD_RECURRING_INVOICE_ITEM_SUCCESS';

export const UPDATE_RECURRING_INVOICE_ITEM =
  'recurringInvoices/UPDATE_RECURRING_INVOICE_ITEM';
export const UPDATE_RECURRING_INVOICE_ITEM_SUCCESS =
  'recurringInvoices/UPDATE_RECURRING_INVOICE_ITEM_SUCCESS';

export const REMOVE_RECURRING_INVOICE_ITEM =
  'recurringInvoices/REMOVE_RECURRING_INVOICE_ITEM';
export const REMOVE_RECURRING_INVOICE_ITEM_SUCCESS =
  'recurringInvoices/REMOVE_RECURRING_INVOICE_ITEM_SUCCESS';

export const RECURRING_INVOICES_TABS = {
  ACTIVE: 'ACTIVE',
  ON_HOLD: 'ON HOLD',
  ALL: 'ALL'
};

export const TAB_NAME = {
  active: t(`recurring_invoices.tabs.active`),
  on_hold: t(`recurring_invoices.tabs.on_hold`),
  all: t(`recurring_invoices.tabs.all`)
};

export const RECURRING_INVOICES_ACTIONS = {
  EDIT: 'EDIT',
  DELETE: 'DELETE'
};

export const RECURRING_INVOICE_DROPDOWN = [
  {
    label: t('recurring_invoices.dropdown.edit'),
    value: RECURRING_INVOICES_ACTIONS.EDIT
  },
  {
    label: t('recurring_invoices.dropdown.delete'),
    value: RECURRING_INVOICES_ACTIONS.DELETE
  }
];
