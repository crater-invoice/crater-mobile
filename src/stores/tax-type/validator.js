import {getError} from '@/validator';

export const validate = values => {
  const errors = {};

  errors.name = getError(values.name, ['required']);
  errors.percent = getError(
    values.percent,
    ['required', 'isNumberFormat', 'maxNumberRequired', 'minNumberRequired'],
    (options = {fieldName: 'Tax Percent', maxNumber: 100, minNumber: -1})
  );

  return errors;
};
