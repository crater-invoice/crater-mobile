import {getError} from '@/constants';

export const customizeInvoiceValidate = values => {
  const errors = {};
  const {
    invoice_number_scheme,
    invoice_prefix,
    invoice_number_separator,
    invoice_number_length,
    due_date_days
  } = values;

  errors.invoice_number_scheme = getError(invoice_number_scheme, ['required']);

  errors.invoice_prefix = getError(invoice_prefix, [
    'required',
    'characterOnlyRequired'
  ]);

  errors.invoice_number_separator = getError(invoice_number_separator, [
    'required'
  ]);

  errors.invoice_number_length = getError(invoice_number_length, [
    'required',
    'isNumberFormat'
  ]);

  errors.due_date_days = getError(due_date_days, ['isNumberFormat']);

  return errors;
};

export const customizeEstimateValidate = values => {
  const errors = {};
  const {
    estimate_number_scheme,
    estimate_prefix,
    estimate_number_separator,
    estimate_number_length,
    expiry_date_days
  } = values;

  errors.estimate_number_scheme = getError(estimate_number_scheme, [
    'required'
  ]);

  errors.estimate_prefix = getError(estimate_prefix, [
    'required',
    'characterOnlyRequired'
  ]);

  errors.estimate_number_separator = getError(estimate_number_separator, [
    'required'
  ]);

  errors.estimate_number_length = getError(estimate_number_length, [
    'required',
    'isNumberFormat'
  ]);

  errors.expiry_date_days = getError(expiry_date_days, ['isNumberFormat']);

  return errors;
};

export const customizePaymentValidate = values => {
  const errors = {};
  const {
    payment_number_scheme,
    payment_prefix,
    payment_number_separator,
    payment_number_length
  } = values;

  errors.payment_number_scheme = getError(payment_number_scheme, ['required']);

  errors.payment_prefix = getError(payment_prefix, [
    'required',
    'characterOnlyRequired'
  ]);

  errors.payment_number_separator = getError(payment_number_separator, [
    'required'
  ]);

  errors.payment_number_length = getError(payment_number_length, [
    'required',
    'isNumberFormat'
  ]);

  return errors;
};
