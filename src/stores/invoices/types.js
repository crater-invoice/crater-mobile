import t from 'locales/use-translation';

//  Forms
// -----------------------------------------
export const INVOICES_FORM = 'invoices/INVOICES_FORM';
export const CREATE_INVOICE_FORM = 'invoices/CREATE_INVOICE_FORM';

// Actions
// -----------------------------------------

export const FETCH_INITIAL_DETAILS = 'invoices/FETCH_INITIAL_DETAILS';
export const FETCH_INVOICE_TEMPLATES_SUCCESS =
  'invoices/FETCH_INVOICE_TEMPLATES_SUCCESS';

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

export const FETCH_ITEMS = 'invoices/FETCH_ITEMS';

export const ADD_INVOICE_ITEM ='invoices/ADD_INVOICE_ITEM';
export const ADD_INVOICE_ITEM_SUCCESS ='invoices/ADD_INVOICE_ITEM_SUCCESS';

export const UPDATE_INVOICE_ITEM ='invoices/UPDATE_INVOICE_ITEM';
export const UPDATE_INVOICE_ITEM_SUCCESS ='invoices/UPDATE_INVOICE_ITEM_SUCCESS';

export const REMOVE_INVOICE_ITEM ='invoices/REMOVE_INVOICE_ITEM';
export const REMOVE_INVOICE_ITEM_SUCCESS ='invoices/REMOVE_INVOICE_ITEM_SUCCESS';

export const CLEAR_INVOICE = 'invoices/CLEAR_INVOICE';

export const INVOICES_TABS = {
  DUE: 'DUE',
  DRAFT: 'DRAFT',
  ALL: 'ALL'
};

export const TAB_NAME = {
  due: t(`invoices.tabs.active`),
  draft: t(`invoices.tabs.on_hold`),
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

export const INVOICES_STATUS = {
  OVERDUE: 'danger',
  DRAFT: 'warning',
  PAID: 'success'
};

// ActionSheet Actions
// -----------------------------------------

export const INVOICE_ACTIONS = {
  VIEW: 'download',
  SEND: 'send',
  EDIT: 'edit',
  DELETE: 'delete',
  RECORD_PAYMENT: 'recordPayment',
  MARK_AS_SENT: 'markAsSent',
  CLONE: 'clone'
};


export const GET_CREATE_INVOICE = 'invoices/GET_CREATE_INVOICE';
export const GET_EDIT_INVOICE = 'invoices/GET_EDIT_INVOICE';
export const SET_INVOICE = 'invoices/SET_INVOICE';
export const SET_EDIT_INVOICE = 'invoices/SET_EDIT_INVOICE';
export const CREATE_INVOICE = 'invoices/CREATE_INVOICE';
export const EDIT_INVOICE = 'invoices/EDIT_INVOICE';
export const REMOVE_INVOICE = 'invoices/REMOVE_INVOICE';
export const REMOVE_FROM_INVOICES = 'invoices/REMOVE_FROM_INVOICES';
export const UPDATE_INVOICE_STATUS = 'invoices/UPDATE_INVOICE_STATUS';
export const GET_INVOICE_TEMPLATE = 'invoices/GET_INVOICE_TEMPLATE';
export const UPDATE_FROM_INVOICES = 'invoices/UPDATE_FROM_INVOICES';

export const GET_RECURRING_INVOICES = 'recurring/GET_RECURRING_INVOICES';
export const SET_RECURRING_INVOICES = 'recurring/SET_RECURRING_INVOICES';
export const CREATE_RECURRING_INVOICE = 'recurring/CREATE_RECURRING_INVOICE';
export const EDIT_RECURRING_INVOICE = 'recurring/EDIT_RECURRING_INVOICE';
export const REMOVE_RECURRING_INVOICE = 'recurring/REMOVE_RECURRING_INVOICE';

// Items
// -----------------------------------------
export const SET_EDIT_INVOICE_ITEMS = 'invoices/SET_EDIT_INVOICE_ITEMS';
export const REMOVE_INVOICE_ITEM = 'invoices/REMOVE_INVOICE_ITEM';
export const REMOVE_INVOICE_ITEMS = 'invoices/REMOVE_INVOICE_ITEMS';
export const ADD_ITEM = 'invoices/ADD_ITEM';
export const EDIT_ITEM = 'invoices/EDIT_ITEM';
export const SET_INVOICE_ITEMS = 'invoices/SET_INVOICE_ITEMS';
export const REMOVE_ITEM = 'invoices/REMOVE_ITEM';
export const ITEM_ADD = 'invoices/ITEM_ADD';
export const ITEM_EDIT = 'invoices/ITEM_EDIT';
