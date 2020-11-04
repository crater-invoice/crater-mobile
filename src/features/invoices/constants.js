import queryString from 'query-string';
import Lng from '@/lang/i18n';
import { colors } from '@/styles';

// Invoice Refs
// -----------------------------------------
export let invoiceRefs = {};
export const setInvoiceRefs = refs => (invoiceRefs = refs);

//  Forms
// -----------------------------------------
export const INVOICE_SEARCH = 'invoiceForm/INVOICE_SEARCH';
export const RECURRING_INVOICES_FORM = 'recurringInvoice/RECURRING_INVOICES';
export const RECURRING_FORM = 'recurringInvoice/RECURRING_FORM';
export const INVOICE_FORM = 'invoiceForm/INVOICE_EDIT';
export const ITEM_FORM = 'item/ITEM_FORM';

// Type
// -----------------------------------------
export const INVOICE_ADD = 'invoiceForm/INVOICE_ADD';
export const INVOICE_EDIT = 'invoiceForm/INVOICE_EDIT';
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

export const getFilterStatusType = type => {
    if (type === INVOICES_TABS.DUE) {
        return 'UNPAID';
    }

    return type;
};
export const TAB_NAME = (name, locale) => {
    return Lng.t(`invoices.tabs.${name}`, { locale });
};

// Filter Invoice Mode
// -----------------------------------------
export const FILTER_INVOICE_STATUS = [
    { label: 'DRAFT', value: 'DRAFT' },
    { label: 'SENT', value: 'SENT' },
    { label: 'VIEWED', value: 'VIEWED' },
    { label: 'OVERDUE', value: 'DUE' },
    { label: 'COMPLETED', value: 'COMPLETED' }
];

export const FILTER_INVOICE_PAID_STATUS = [
    { label: 'UNPAID', value: 'UNPAID' },
    { label: 'PAID', value: 'PAID' },
    { label: 'PARTIALLY PAID', value: 'PARTIALLY_PAID' }
];

export const INVOICES_STATUS = {
    OVERDUE: 'danger',
    DRAFT: 'warning',
    PAID: 'success'
};

export const INVOICES_STATUS_BG_COLOR = {
    DRAFT: colors.warningLight,
    SENT: colors.warningLight2,
    VIEWED: colors.infoLight,
    OVERDUE: colors.dangerLight,
    COMPLETED: colors.successLight2,
    UNPAID: colors.warningLight,
    PAID: colors.successLight2,
    PARTIALLY_PAID: colors.infoLight
};

export const INVOICES_STATUS_TEXT_COLOR = {
    DRAFT: colors.warningDark,
    SENT: colors.warningDark2,
    VIEWED: colors.infoDark,
    OVERDUE: colors.dangerDark,
    COMPLETED: colors.successDark,
    UNPAID: colors.warningDark,
    PAID: colors.successDark,
    PARTIALLY_PAID: colors.infoDark
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
    locale,
    sentStatus = false,
    completeStatus = false
) => {
    const markActions = [
        {
            label: Lng.t('invoices.actions.sendInvoice', { locale }),
            value: INVOICE_ACTIONS.SEND
        },
        {
            label: Lng.t('invoices.actions.markAsSent', { locale }),
            value: INVOICE_ACTIONS.MARK_AS_SENT
        }
    ];

    const resendActions = [
        {
            label: Lng.t('invoices.actions.reSendInvoice', { locale }),
            value: INVOICE_ACTIONS.SEND
        }
    ];

    const paymentAction = [
        {
            label: Lng.t('invoices.actions.recordPayment', {
                locale
            }),
            value: INVOICE_ACTIONS.RECORD_PAYMENT
        }
    ];

    const deleteAction = [
        {
            label: Lng.t('invoices.actions.delete', { locale }),
            value: INVOICE_ACTIONS.DELETE
        }
    ];

    const cloneAction = [
        {
            label: Lng.t('invoices.actions.clone', { locale }),
            value: INVOICE_ACTIONS.CLONE
        }
    ];

    if (sentStatus) {
        return [
            ...resendActions,
            ...cloneAction,
            ...paymentAction,
            ...deleteAction
        ];
    } else if (completeStatus) {
        return [...cloneAction, ...deleteAction];
    } else {
        return [
            ...markActions,
            ...cloneAction,
            ...paymentAction,
            ...deleteAction
        ];
    }
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
export const CUSTOM_REPEAT_RECURRING_OPTION = (locale, Lng) => {
    const VALUE = CUSTOM_REPEAT_RECURRING_OPTION_VALUE;

    return [
        {
            label: Lng.t('invoices.customRepeatRecurring.days', {
                locale
            }),
            value: VALUE.DAYS
        },
        {
            label: Lng.t('invoices.customRepeatRecurring.weeks', {
                locale
            }),
            value: VALUE.WEEKS
        },
        {
            label: Lng.t('invoices.customRepeatRecurring.months', {
                locale
            }),
            value: VALUE.MONTHS
        },
        {
            label: Lng.t('invoices.customRepeatRecurring.years', {
                locale
            }),
            value: VALUE.YEARS
        }
    ];
};
// Repeat Recurring Invoice
// -----------------------------------------
export const REPEAT_RECURRING_INVOICE_OPTION = (locale, Lng) => {
    const VALUE = REPEAT_RECURRING_INVOICE_OPTION_VALUE;

    return [
        {
            label: Lng.t('invoices.repeatRecurring.week', { locale }),
            value: VALUE.WEEK
        },
        {
            label: Lng.t('invoices.repeatRecurring.weeks', {
                locale,
                week: 2
            }),
            value: VALUE.WEEK2
        },
        {
            label: Lng.t('invoices.repeatRecurring.month', {
                locale
            }),
            value: VALUE.MONTH
        },
        {
            label: Lng.t('invoices.repeatRecurring.months', {
                locale,
                month: 2
            }),
            value: VALUE.MONTH2
        },
        {
            label: Lng.t('invoices.repeatRecurring.months', {
                locale,
                month: 3
            }),
            value: VALUE.MONTH3
        },
        {
            label: Lng.t('invoices.repeatRecurring.months', {
                locale,
                month: 6
            }),
            value: VALUE.MONTH6
        },

        {
            label: Lng.t('invoices.repeatRecurring.year', { locale }),
            value: VALUE.YEAR
        },
        {
            label: Lng.t('invoices.repeatRecurring.years', {
                locale,
                year: 2
            }),
            value: VALUE.YEAR2
        },
        {
            label: Lng.t('invoices.repeatRecurring.years', {
                locale,
                year: 3
            }),
            value: VALUE.YEAR3
        },
        {
            label: Lng.t('invoices.repeatRecurring.custom', {
                locale,
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
