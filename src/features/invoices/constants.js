import queryString from 'query-string';
import t from 'locales/use-translation';
import {PermissionService} from '@/services';
import {routes} from '@/navigation';

// Invoice Refs
// -----------------------------------------
export let invoiceRefs = {};
export const setInvoiceRefs = refs => (invoiceRefs = refs);

//  Forms
// -----------------------------------------
export const INVOICE_SEARCH = 'invoiceForm/INVOICE_SEARCH';
export const RECURRING_INVOICES_FORM = 'recurringInvoice/RECURRING_INVOICES';
export const RECURRING_FORM = 'recurringInvoice/RECURRING_FORM';
export const INVOICE_FORM = 'invoiceForm/INVOICE_FORM';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const RECURRING_ADD = 'recurringInvoice/RECURRING_ADD';
export const RECURRING_EDIT = 'recurringInvoice/RECURRING_EDIT';

// Actions
// -----------------------------------------
export const INVOICES_TRIGGER_SPINNER = 'invoice/INVOICES_TRIGGER_SPINNER';
export const GET_INVOICES = 'invoice/GET_INVOICES';
export const SET_INVOICES = 'invoice/SET_INVOICES';

export const CLEAR_INVOICE = 'invoice/CLEAR_INVOICE';
export const GET_CREATE_INVOICE = 'invoice/GET_CREATE_INVOICE';
export const GET_EDIT_INVOICE = 'invoice/GET_EDIT_INVOICE';
export const SET_INVOICE = 'invoice/SET_INVOICE';
export const SET_EDIT_INVOICE = 'invoice/SET_EDIT_INVOICE';
export const CREATE_INVOICE = 'invoice/CREATE_INVOICE';
export const EDIT_INVOICE = 'invoice/EDIT_INVOICE';
export const REMOVE_INVOICE = 'invoice/REMOVE_INVOICE';
export const REMOVE_FROM_INVOICES = 'invoice/REMOVE_FROM_INVOICES';
export const CHANGE_INVOICE_STATUS = 'invoice/CHANGE_INVOICE_STATUS';
export const GET_INVOICE_TEMPLATE = 'invoice/GET_INVOICE_TEMPLATE';
export const UPDATE_FROM_INVOICES = 'invoices/UPDATE_FROM_INVOICES';

export const GET_RECURRING_INVOICES = 'recurring/GET_RECURRING_INVOICES';
export const SET_RECURRING_INVOICES = 'recurring/SET_RECURRING_INVOICES';
export const CREATE_RECURRING_INVOICE = 'recurring/CREATE_RECURRING_INVOICE';
export const EDIT_RECURRING_INVOICE = 'recurring/EDIT_RECURRING_INVOICE';
export const REMOVE_RECURRING_INVOICE = 'recurring/REMOVE_RECURRING_INVOICE';

// Items
// -----------------------------------------
export const SET_EDIT_INVOICE_ITEMS = 'invoice/SET_EDIT_INVOICE_ITEMS';
export const REMOVE_INVOICE_ITEM = 'invoice/REMOVE_INVOICE_ITEM';
export const REMOVE_INVOICE_ITEMS = 'invoice/REMOVE_INVOICE_ITEMS';
export const ADD_ITEM = 'invoice/ADD_ITEM';
export const EDIT_ITEM = 'invoice/EDIT_ITEM';
export const GET_ITEMS = 'invoice/GET_ITEMS';
export const SET_ITEMS = 'invoice/SET_ITEMS';
export const SET_INVOICE_ITEMS = 'invoice/SET_INVOICE_ITEMS';
export const REMOVE_ITEM = 'invoice/REMOVE_ITEM';
export const ITEM_ADD = 'invoice/ITEM_ADD';
export const ITEM_EDIT = 'invoice/ITEM_EDIT';

export const ITEM_DISCOUNT_OPTION = [
  {
    key: 'none',
    label: 'None'
  },
  {
    key: 'fixed',
    label: 'Fixed'
  },
  {
    key: 'percentage',
    label: 'Percentage'
  }
];

export const INVOICE_DISCOUNT_OPTION = [
  {
    value: 'percentage',
    label: 'Percentage',
    displayLabel: '%'
  }
];

export const INVOICES_TABS = {
  DUE: 'DUE',
  DRAFT: 'DRAFT',
  ALL: 'ALL'
};

export const TAB_NAME = name => {
  return t(`invoices.tabs.${name}`);
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

export const EDIT_INVOICE_ACTIONS = (
  sentStatus = false,
  completeStatus = false,
  isAllowToDelete
) => {
  let options = [];

  !sentStatus &&
    !completeStatus &&
    options.push(
      {
        label: t('invoices.actions.sendInvoice'),
        value: INVOICE_ACTIONS.SEND
      },
      {
        label: t('invoices.actions.markAsSent'),
        value: INVOICE_ACTIONS.MARK_AS_SENT
      }
    );

  sentStatus &&
    options.push({
      label: t('invoices.actions.reSendInvoice'),
      value: INVOICE_ACTIONS.SEND
    });

  options.push({
    label: t('invoices.actions.clone'),
    value: INVOICE_ACTIONS.CLONE
  });

  (sentStatus || (!sentStatus && !completeStatus)) &&
    options.push({
      label: t('invoices.actions.recordPayment'),
      value: INVOICE_ACTIONS.RECORD_PAYMENT
    });

  isAllowToDelete &&
    options.push({
      label: t('invoices.actions.delete'),
      value: INVOICE_ACTIONS.DELETE
    });

  if (!PermissionService.isAllowToSend(routes.INVOICE)) {
    options = options.filter(o => o.value !== INVOICE_ACTIONS.SEND);
  }

  return options;
};

export const REPEAT_RECURRING_INVOICE_OPTION_VALUE = {
  WEEK: 'week',
  WEEK2: 'week2',
  MONTH: 'month',
  MONTH2: 'month2',
  MONTH3: 'month3',
  MONTH6: 'month6',
  YEAR: 'year',
  YEAR2: 'year2',
  YEAR3: 'year3',
  CUSTOM: 'custom'
};

export const CUSTOM_REPEAT_RECURRING_OPTION_VALUE = {
  DAYS: 'days',
  WEEKS: 'weeks',
  MONTHS: 'months',
  YEARS: 'years'
};
// Custom Repeat Recurring Invoice
// -----------------------------------------
export const CUSTOM_REPEAT_RECURRING_OPTION = () => {
  const VALUE = CUSTOM_REPEAT_RECURRING_OPTION_VALUE;

  return [
    {
      label: t('invoices.customRepeatRecurring.days'),
      value: VALUE.DAYS
    },
    {
      label: t('invoices.customRepeatRecurring.weeks'),
      value: VALUE.WEEKS
    },
    {
      label: t('invoices.customRepeatRecurring.months'),
      value: VALUE.MONTHS
    },
    {
      label: t('invoices.customRepeatRecurring.years'),
      value: VALUE.YEARS
    }
  ];
};
// Repeat Recurring Invoice
// -----------------------------------------
export const REPEAT_RECURRING_INVOICE_OPTION = () => {
  const VALUE = REPEAT_RECURRING_INVOICE_OPTION_VALUE;

  return [
    {
      label: t('invoices.repeatRecurring.week'),
      value: VALUE.WEEK
    },
    {
      label: t('invoices.repeatRecurring.weeks', {
        week: 2
      }),
      value: VALUE.WEEK2
    },
    {
      label: t('invoices.repeatRecurring.month'),
      value: VALUE.MONTH
    },
    {
      label: t('invoices.repeatRecurring.months', {
        month: 2
      }),
      value: VALUE.MONTH2
    },
    {
      label: t('invoices.repeatRecurring.months', {
        month: 3
      }),
      value: VALUE.MONTH3
    },
    {
      label: t('invoices.repeatRecurring.months', {
        month: 6
      }),
      value: VALUE.MONTH6
    },

    {
      label: t('invoices.repeatRecurring.year'),
      value: VALUE.YEAR
    },
    {
      label: t('invoices.repeatRecurring.years', {
        year: 2
      }),
      value: VALUE.YEAR2
    },
    {
      label: t('invoices.repeatRecurring.years', {
        year: 3
      }),
      value: VALUE.YEAR3
    },
    {
      label: t('invoices.repeatRecurring.custom', {
        year: 3
      }),
      value: VALUE.CUSTOM
    }
  ];
};
// Endpoint Api URL
// -----------------------------------------
export const GET_RECURRING_INVOICES_URL = (type, param) =>
  `invoices?status=${type}&${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
  })}`;
export const CREATE_RECURRING_INVOICE_URL = () => `invoices`;
export const EDIT_RECURRING_INVOICE_URL = invoice => `invoices/${invoice.id}`;
