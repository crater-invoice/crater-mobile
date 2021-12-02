import {validateCustomField} from '@/components/custom-field';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const errors: any = {expense: {}, customFields: {}};

  if (values) {
    errors.expense_date = getError(values?.expense_date, ['required']);

    errors.expense_category_id = getError(values?.expense_category_id, [
      'required'
    ]);

    errors.amount = getError(values?.amount, ['required', 'isNumberFormat']);

    errors.currency_id = getError(values?.currency_id, ['required']);

    errors.exchange_rate = getError(values?.exchange_rate, [
      'required',
      'isNumberFormat'
    ]);
    const fieldErrors = validateCustomField(values?.customFields);
    !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);
  }

  return errors;
};
