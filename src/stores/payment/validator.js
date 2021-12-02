import {validateCustomField} from '@/components';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const {
    payment_date,
    payment_number,
    customer_id,
    amount,
    exchange_rate
  } = values;
  const errors = {};

  errors.payment_date = getError(payment_date, ['required']);

  errors.payment_number = getError(payment_number, ['required']);

  errors.customer_id = getError(customer_id, ['required']);

  errors.amount = getError(amount, ['required', 'isNumberFormat']);

  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat'
  ]);

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
