import {isEmpty} from '@/constants';
import {getError} from '@/validator';
import {validateCustomField} from '@/components/custom-field';

export const validate = values => {
  const errors: any = {};
  const {
    invoice_number,
    customer_id,
    items,
    template_name,
    invoice_date,
    due_date,
    exchange_rate
  } = values;

  errors.invoice_number = getError(invoice_number, ['required']);
  errors.customer_id = getError(customer_id, ['required']);
  errors.items = getError(items, ['requiredCheckArray']);
  errors.template_name = getError(template_name, ['required']);
  errors.invoice_date = getError(invoice_date, ['required']);
  errors.due_date = getError(due_date, ['required']);
  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat'
  ]);

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
