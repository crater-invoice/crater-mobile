import {validateCustomField} from '@/components/custom-field';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const errors = {};
  const {
    estimate_date,
    estimate_number,
    expiry_date,
    template_name,
    items,
    customer_id,
    exchange_rate
  } = values;

  errors.estimate_date = getError(estimate_date, ['required']);
  errors.expiry_date = getError(expiry_date, ['required']);

  errors.estimate_number = getError(estimate_number, ['required']);

  errors.items = getError(items, ['requiredCheckArray']);

  errors.customer_id = getError(customer_id, ['required'], {
    fieldName: 'Customer'
  });

  errors.template_name = getError(template_name, ['required'], {
    fieldName: 'Template'
  });

  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat'
  ]);

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
