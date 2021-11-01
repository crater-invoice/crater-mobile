import {validateCustomField} from '@/components/custom-field';
import {getError, isEmpty} from '@/constants';

export const validate = values => {
  const errors = {};
  const {
    estimate_date,
    estimate_number,
    expiry_date,
    template_name,
    items,
    customer_id
  } = values;

  errors.estimate_date = getError(estimate_date, ['required']);
  errors.expiry_date = getError(expiry_date, ['required']);

  errors.estimate_number = getError(estimate_number, [
    'requiredField',
    'isNumberFormat'
  ]);

  errors.items = getError(items, ['requiredCheckArray']);

  errors.customer_id = getError(customer_id, ['requiredField'], {
    fieldName: 'Customer'
  });

  errors.template_name = getError(template_name, ['requiredField'], {
    fieldName: 'Template'
  });

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
