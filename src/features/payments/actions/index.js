import {
  GET_PAYMENTS,
  SET_PAYMENTS,
  PAYMENTS_TRIGGER_SPINNER,
  GET_CREATE_PAYMENT,
  CREATE_PAYMENT,
  GET_UNPAID_INVOICES,
  GET_PAYMENT_DETAIL,
  UPDATE_PAYMENT,
  REMOVE_PAYMENT,
  SEND_PAYMENT_RECEIPT,
  SAVE_UNPAID_INVOICES,
  CREATE_FROM_PAYMENTS,
  UPDATE_FROM_PAYMENTS,
  REMOVE_FROM_PAYMENTS
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

export const paymentTriggerSpinner = payload => ({
  type: PAYMENTS_TRIGGER_SPINNER,
  payload
});

export const getPaymentDetail = (payload = {}) => ({
  type: GET_PAYMENT_DETAIL,
  payload
});

export const updatePayment = (payload = {}) => ({
  type: UPDATE_PAYMENT,
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

export const getUnpaidInvoices = (payload = {}) => ({
  type: GET_UNPAID_INVOICES,
  payload
});

export const saveUnpaidInvoices = (payload = {}) => ({
  type: SAVE_UNPAID_INVOICES,
  payload
});

export const createFromPayment = (payload = {}) => ({
  type: CREATE_FROM_PAYMENTS,
  payload
});

export const updateFromPayment = (payload = {}) => ({
  type: UPDATE_FROM_PAYMENTS,
  payload
});

export const removeFromPayment = (payload = {}) => ({
  type: REMOVE_FROM_PAYMENTS,
  payload
});
