import t from 'locales/use-translation';

export const INVOICES_FORM = 'invoice/INVOICES_FORM';
export const CREATE_INVOICE_FORM = 'invoice/CREATE_INVOICE_FORM';

export const FETCH_INITIAL_DETAILS = 'invoice/FETCH_INITIAL_DETAILS';

export const SPINNER = 'invoice/SPINNER';

export const FETCH_INVOICES = 'invoice/FETCH_INVOICES';
export const FETCH_INVOICES_SUCCESS = 'invoice/FETCH_INVOICES_SUCCESS';

export const FETCH_SINGLE_INVOICE = 'invoice/FETCH_SINGLE_INVOICE';
export const FETCH_NEXT_INVOICE_NUMBER = 'invoice/FETCH_NEXT_INVOICE_NUMBER';

export const ADD_INVOICE = 'invoice/ADD_INVOICE';
export const ADD_INVOICE_SUCCESS = 'invoice/ADD_INVOICE_SUCCESS';

export const UPDATE_INVOICE = 'invoice/UPDATE_INVOICE';
export const UPDATE_INVOICE_SUCCESS = 'invoice/UPDATE_INVOICE_SUCCESS';

export const REMOVE_INVOICE = 'invoice/REMOVE_INVOICE';
export const REMOVE_INVOICE_SUCCESS = 'invoice/REMOVE_INVOICE_SUCCESS';

export const ADD_INVOICE_ITEM = 'invoice/ADD_INVOICE_ITEM';
export const ADD_INVOICE_ITEM_SUCCESS = 'invoice/ADD_INVOICE_ITEM_SUCCESS';

export const REMOVE_INVOICE_ITEM = 'invoice/REMOVE_INVOICE_ITEM';
export const REMOVE_INVOICE_ITEM_SUCCESS =
  'invoice/REMOVE_INVOICE_ITEM_SUCCESS';

export const CHANGE_INVOICE_STATUS = 'invoice/CHANGE_INVOICE_STATUS';

export const CLEAR_INVOICE = 'invoice/CLEAR_INVOICE';

export const FETCH_INVOICE_TEMPLATES_SUCCESS =
  'invoice/FETCH_INVOICE_TEMPLATES_SUCCESS';

export const SEND_INVOICE = 'invoice/SEND_INVOICE';

export const INVOICES_TABS = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ALL: 'ALL'
};

export const TAB_NAME = {
  draft: t(`invoices.tabs.draft`),
  sent: t(`invoices.tabs.sent`),
  all: t(`invoices.tabs.all`)
};

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

export const INVOICE_ACTIONS = {
  SEND: 'send',
  EDIT: 'edit',
  DELETE: 'delete',
  RECORD_PAYMENT: 'record_payment',
  MARK_AS_SENT: 'mark_as_sent',
  CLONE: 'clone'
};
