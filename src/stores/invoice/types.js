import t from 'locales/use-translation';

//  Forms
// -----------------------------------------
export const INVOICES_FORM = 'invoices/INVOICES_FORM';
export const CREATE_INVOICE_FORM = 'invoices/CREATE_INVOICE_FORM';

// Actions
// -----------------------------------------

export const FETCH_INITIAL_DETAILS = 'invoices/FETCH_INITIAL_DETAILS';
export const FETCH_INVOICE_DATA_SUCCESS = 'invoices/FETCH_INVOICE_DATA_SUCCESS';

export const SPINNER = 'invoices/SPINNER';

export const FETCH_INVOICES = 'invoices/FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'invoices/FETCH_INVOICES_SUCCESS';

export const FETCH_SINGLE_INVOICE = 'invoices/FETCH_SINGLE_INVOICE';

export const ADD_INVOICE = 'invoices/ADD_INVOICE';
export const ADD_INVOICE_SUCCESS = 'invoices/ADD_INVOICE_SUCCESS';

export const UPDATE_INVOICE = 'invoices/UPDATE_INVOICE';
export const UPDATE_INVOICE_SUCCESS = 'invoices/UPDATE_INVOICE_SUCCESS';

export const REMOVE_INVOICE = 'invoices/REMOVE_INVOICE';
export const REMOVE_INVOICE_SUCCESS = 'invoices/REMOVE_INVOICE_SUCCESS';

export const ADD_INVOICE_ITEM = 'invoices/ADD_INVOICE_ITEM';
export const ADD_INVOICE_ITEM_SUCCESS = 'invoices/ADD_INVOICE_ITEM_SUCCESS';

export const REMOVE_INVOICE_ITEM = 'invoices/REMOVE_INVOICE_ITEM';
export const REMOVE_INVOICE_ITEM_SUCCESS =
  'invoices/REMOVE_INVOICE_ITEM_SUCCESS';

export const CHANGE_INVOICE_STATUS = 'invoices/CHANGE_INVOICE_STATUS';

export const CLEAR_INVOICE = 'invoices/CLEAR_INVOICE';

export const INVOICES_TABS = {
  DUE: 'DUE',
  DRAFT: 'DRAFT',
  ALL: 'ALL'
};

export const TAB_NAME = {
  due: t(`invoices.tabs.due`),
  draft: t(`invoices.tabs.draft`),
  all: t(`invoices.tabs.all`)
};

// Filter Invoice Mode
// -----------------------------------------
export const FILTER_INVOICE_STATUS = [
  {label: 'DRAFT', value: 'DRAFT'},
  {label: 'SENT', value: 'SENT'},
  {label: 'VIEWED', value: 'VIEWED'},
  {label: 'OVERDUE', value: 'DUE'},
  {label: 'COMPLETED', value: 'COMPLETED'}
];

export const FILTER_INVOICE_PAID_STATUS = [
  {label: 'UNPAID', value: 'UNPAID'},
  {label: 'PAID', value: 'PAID'},
  {label: 'PARTIALLY PAID', value: 'PARTIALLY_PAID'}
];

// ActionSheet Actions
// -----------------------------------------

export const INVOICE_ACTIONS = {
  SEND: 'send',
  EDIT: 'edit',
  DELETE: 'delete',
  RECORD_PAYMENT: 'record_payment',
  MARK_AS_SENT: 'mark_as_sent',
  CLONE: 'clone'
};
