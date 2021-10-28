import t from 'locales/use-translation';

//  Forms
// -----------------------------------------
export const ESTIMATES_FORM = 'estimates/ESTIMATES_FORM';
export const CREATE_ESTIMATE_FORM = 'estimates/CREATE_ESTIMATE_FORM';

// Actions
// -----------------------------------------

export const FETCH_INITIAL_DETAILS = 'estimates/FETCH_INITIAL_DETAILS';
export const FETCH_ESTIMATE_DATA_SUCCESS =
  'estimates/FETCH_ESTIMATE_DATA_SUCCESS';

export const SPINNER = 'estimates/SPINNER';

export const FETCH_ESTIMATES = 'estimates/FETCH_ESTIMATES';
export const FETCH_ESTIMATES_SUCCESS = 'estimates/FETCH_ESTIMATES_SUCCESS';

export const FETCH_SINGLE_ESTIMATE = 'estimates/FETCH_SINGLE_ESTIMATE';

export const ADD_ESTIMATE = 'estimates/ADD_ESTIMATE';
export const ADD_ESTIMATE_SUCCESS = 'estimates/ADD_ESTIMATE_SUCCESS';

export const UPDATE_ESTIMATE = 'estimates/UPDATE_ESTIMATE';
export const UPDATE_ESTIMATE_SUCCESS = 'estimates/UPDATE_ESTIMATE_SUCCESS';

export const REMOVE_ESTIMATE = 'estimates/REMOVE_ESTIMATE';
export const REMOVE_ESTIMATE_SUCCESS = 'estimates/REMOVE_ESTIMATE_SUCCESS';

export const ADD_ESTIMATE_ITEM = 'estimates/ADD_ESTIMATE_ITEM';
export const ADD_ESTIMATE_ITEM_SUCCESS = 'estimates/ADD_ESTIMATE_ITEM_SUCCESS';

export const REMOVE_ESTIMATE_ITEM = 'estimates/REMOVE_ESTIMATE_ITEM';
export const REMOVE_ESTIMATE_ITEM_SUCCESS =
  'estimates/REMOVE_ESTIMATE_ITEM_SUCCESS';

export const CONVERT_TO_INVOICE = 'estimates/CONVERT_TO_INVOICE';
export const CHANGE_ESTIMATE_STATUS = 'estimates/CHANGE_ESTIMATE_STATUS';

export const CLEAR_ESTIMATE = 'estimates/CLEAR_ESTIMATE';

// Tabs
// -----------------------------------------
export const ESTIMATES_TABS = {
  DRAFT: 'DRAFT',
  SENT: 'SENT',
  ALL: 'ALL'
};

export const TAB_NAME = {
  DRAFT: t(`estimates.tabs.draft`),
  SENT: t(`estimates.tabs.sent`),
  ALL: t(`estimates.tabs.all`)
};

// Filter Estimate Mode
// -----------------------------------------
export const FILTER_ESTIMATE_STATUS = [
  {label: 'DRAFT', value: 'DRAFT'},
  {label: 'SENT', value: 'SENT'},
  {label: 'VIEWED', value: 'VIEWED'},
  {label: 'EXPIRED', value: 'EXPIRED'},
  {label: 'ACCEPTED', value: 'ACCEPTED'},
  {label: 'REJECTED', value: 'REJECTED'}
];

// ActionSheet Actions
// -----------------------------------------

export const ESTIMATE_ACTIONS = {
  SEND: 'send',
  DELETE: 'delete',
  EDIT: 'edit',
  CONVERT_TO_INVOICE: 'convertToInvoice',
  MARK_AS_SENT: 'markAsSent',
  MARK_AS_ACCEPTED: 'markAsAccepted',
  MARK_AS_REJECTED: 'markAsRejected'
};

export const MARK_AS_SENT = 'SENT';
export const MARK_AS_ACCEPT = 'ACCEPTED';
export const MARK_AS_REJECT = 'REJECTED';
