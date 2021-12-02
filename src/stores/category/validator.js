import {getError} from '@/validator';

export const validate = values => {
  const errors = {};

  errors.name = getError(values?.name, ['required']);

  return errors;
};
