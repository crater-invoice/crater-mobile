import t from 'locales/use-translation';

export const ESTIMATES_FORM = 'estimate/ESTIMATES_FORM';
export const CREATE_ESTIMATE_FORM = 'estimate/CREATE_ESTIMATE_FORM';

export const FETCH_INITIAL_DETAILS = 'estimate/FETCH_INITIAL_DETAILS';

export const SPINNER = 'estimate/SPINNER';

export const FETCH_ESTIMATES = 'estimate/FETCH_ESTIMATES';
export const FETCH_ESTIMATES_SUCCESS = 'estimate/FETCH_ESTIMATES_SUCCESS';

export const FETCH_SINGLE_ESTIMATE = 'estimate/FETCH_SINGLE_ESTIMATE';
export const FETCH_NEXT_ESTIMATE_NUMBER = 'estimate/FETCH_NEXT_ESTIMATE_NUMBER';

export const ADD_ESTIMATE = 'estimate/ADD_ESTIMATE';
export const ADD_ESTIMATE_SUCCESS = 'estimate/ADD_ESTIMATE_SUCCESS';

export const UPDATE_ESTIMATE = 'estimate/UPDATE_ESTIMATE';
export const UPDATE_ESTIMATE_SUCCESS = 'estimate/UPDATE_ESTIMATE_SUCCESS';

export const REMOVE_ESTIMATE = 'estimate/REMOVE_ESTIMATE';
export const REMOVE_ESTIMATE_SUCCESS = 'estimate/REMOVE_ESTIMATE_SUCCESS';

export const ADD_ESTIMATE_ITEM = 'estimate/ADD_ESTIMATE_ITEM';
export const ADD_ESTIMATE_ITEM_SUCCESS = 'estimate/ADD_ESTIMATE_ITEM_SUCCESS';

export const REMOVE_ESTIMATE_ITEM = 'estimate/REMOVE_ESTIMATE_ITEM';
export const REMOVE_ESTIMATE_ITEM_SUCCESS =
  'estimate/REMOVE_ESTIMATE_ITEM_SUCCESS';

export const CONVERT_TO_INVOICE = 'estimate/CONVERT_TO_INVOICE';
export const CHANGE_ESTIMATE_STATUS = 'estimate/CHANGE_ESTIMATE_STATUS';

export const CLEAR_ESTIMATE = 'estimate/CLEAR_ESTIMATE';

export const FETCH_ESTIMATE_TEMPLATES_SUCCESS =
  'estimate/FETCH_ESTIMATE_TEMPLATES_SUCCESS';

export const SEND_ESTIMATE = 'estimate/SEND_ESTIMATE';

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

export const FILTER_ESTIMATE_STATUS = [
  {label: 'DRAFT', value: 'DRAFT'},
  {label: 'SENT', value: 'SENT'},
  {label: 'VIEWED', value: 'VIEWED'},
  {label: 'EXPIRED', value: 'EXPIRED'},
  {label: 'ACCEPTED', value: 'ACCEPTED'},
  {label: 'REJECTED', value: 'REJECTED'}
];

export const ESTIMATE_ACTIONS = {
  SEND: 'send',
  DELETE: 'delete',
  EDIT: 'edit',
  CONVERT_TO_INVOICE: 'convert_to_invoice',
  MARK_AS_SENT: 'mark_as_sent',
  MARK_AS_ACCEPTED: 'mark_as_accepted',
  MARK_AS_REJECTED: 'mark_as_rejected'
};

export const MARK_AS_SENT = 'SENT';
export const MARK_AS_ACCEPT = 'ACCEPTED';
export const MARK_AS_REJECT = 'REJECTED';
