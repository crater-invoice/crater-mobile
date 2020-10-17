import queryString from 'query-string';

// Forms
// -----------------------------------------
export const PAYMENT_SEARCH = 'payments/PAYMENT_SEARCH';
export const PAYMENT_FORM = 'payments/PAYMENT_FORM';

// Type
// -----------------------------------------
export const PAYMENT_ADD = 'payments/PAYMENT_ADD';
export const PAYMENT_EDIT = 'payments/PAYMENT_EDIT';

// Actions
// -----------------------------------------
export const GET_PAYMENTS = 'payments/GET_PAYMENTS';
export const SET_PAYMENTS = 'payments/SET_PAYMENTS';
export const SET_FILTER_PAYMENTS = 'payments/SET_FILTER_PAYMENTS';

export const GET_CREATE_PAYMENT = 'payments/GET_CREATE_PAYMENT';
export const CREATE_PAYMENT = 'payments/CREATE_PAYMENT';
export const GET_UNPAID_INVOICES = 'payments/GET_UNPAID_INVOICES';
export const PAYMENTS_TRIGGER_SPINNER = 'payments/PAYMENTS_TRIGGER_SPINNER';
export const GET_EDIT_PAYMENT = 'payments/GET_EDIT_PAYMENT';
export const EDIT_PAYMENT = 'payments/EDIT_PAYMENT';
export const REMOVE_PAYMENT = 'payments/REMOVE_PAYMENT';
export const SEND_PAYMENT_RECEIPT = 'payments/SEND_PAYMENT_RECEIPT';

export const ACTIONS_VALUE = {
    SEND: "send",
    REMOVE: 'remove',
}

export const PAYMENT_ACTIONS = (Lng, locale) => {
    return [
        {
            label: Lng.t("payments.sendReceipt", { locale })
            ,
            value: ACTIONS_VALUE.SEND
        },
        {
            label: Lng.t("payments.removePayment", { locale })
            ,
            value: ACTIONS_VALUE.REMOVE
        }
    ];
}

// Endpoint Api URL
// -----------------------------------------

export const GET_PAYMENTS_URL = (param) => `payments?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const CREATE_PAYMENT_URL = () => `payments`
export const EDIT_PAYMENT_URL = (id) => `payments/${id}`
export const REMOVE_PAYMENT_URL = (id) => `payments/${id}`

export const GET_EDIT_PAYMENT_URL = (id) => `payments/${id}/edit`
export const GET_CREATE_PAYMENTS_URL = () => `payments/create`
export const GET_UNPAID_INVOICES_URL = (id) => `invoices/unpaid/${id}`

export const SEND_PAYMENT_RECEIPT_URL = () => `payments/send`
