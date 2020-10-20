import {
    GET_PAYMENTS,
    SET_PAYMENTS,
    PAYMENTS_TRIGGER_SPINNER,
    GET_CREATE_PAYMENT,
    CREATE_PAYMENT,
    GET_UNPAID_INVOICES,
    GET_EDIT_PAYMENT,
    EDIT_PAYMENT,
    SET_FILTER_PAYMENTS,
    REMOVE_PAYMENT,
    SEND_PAYMENT_RECEIPT
} from '../constants';

export const getPayments = (payload = {}) => ({
    type: GET_PAYMENTS,
    payload
});

export const setPayments = (payload = {}) => ({
    type: SET_PAYMENTS,
    payload
});

export const getCreatePayment = (payload = {}) => ({
    type: GET_CREATE_PAYMENT,
    payload
});

export const createPayment = (payload = {}) => ({
    type: CREATE_PAYMENT,
    payload
});

export const getUnpaidInvoices = (payload = {}) => ({
    type: GET_UNPAID_INVOICES,
    payload
});

export const paymentTriggerSpinner = payload => ({
    type: PAYMENTS_TRIGGER_SPINNER,
    payload
});

export const getEditPayment = (payload = {}) => ({
    type: GET_EDIT_PAYMENT,
    payload
});

export const editPayment = (payload = {}) => ({
    type: EDIT_PAYMENT,
    payload
});

export const removePayment = (payload = {}) => ({
    type: REMOVE_PAYMENT,
    payload
});

export const sendPaymentReceipt = (payload = {}) => ({
    type: SEND_PAYMENT_RECEIPT,
    payload
});
