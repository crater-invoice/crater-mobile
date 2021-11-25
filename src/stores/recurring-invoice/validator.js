import {isEmpty} from '@/constants';
import {getError} from '@/validator';
import {validateCustomField} from '@/components/custom-field';

export const validate = values => {
  const errors: any = {};
  const {
    customer_id,
    starts_at,
    limit_by,
    limit_date,
    limit_count,
    status,
    frequency_picker,
    frequency,
    items,
    template_name,
    exchange_rate
  } = values;
  errors.customer_id = getError(customer_id, ['required']);
  errors.starts_at = getError(starts_at, ['required']);
  errors.limit_by = getError(limit_by, ['required']);
  errors.status = getError(status, ['required']);
  errors.items = getError(items, ['requiredCheckArray']);
  errors.template_name = getError(template_name, ['required']);
  errors.exchange_rate = getError(exchange_rate, [
    'required',
    'isNumberFormat'
  ]);

  if (limit_by === 'DATE')
    errors.limit_date = getError(limit_date, ['required']);
  if (limit_by === 'COUNT')
    errors.limit_count = getError(limit_count, ['required']);
  if (frequency_picker === '')
    errors.frequency = getError(frequency, ['required', 'cronFormat']);

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
