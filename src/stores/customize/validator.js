import {getError} from '@/constants';

export const customizeInvoiceValidate = values => {
  const errors = {};
  const {invoice_prefix} = values;

  errors.invoice_prefix = getError(
    invoice_prefix,
    ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
    (options = {maxCharacter: 5})
  );

  return errors;
};

export const customizeEstimateValidate = values => {
  const errors = {};
  const {estimate_prefix} = values;

  errors.estimate_prefix = getError(
    estimate_prefix,
    ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
    (options = {maxCharacter: 5})
  );

  return errors;
};

export const customizePaymentValidate = values => {
  const errors = {};
  const {payment_prefix} = values;

  errors.payment_prefix = getError(
    payment_prefix,
    ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
    (options = {maxCharacter: 5})
  );

  return errors;
};
