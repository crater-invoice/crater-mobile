import {getError} from '@/constants';

export const validate = values => {
  const errors = {};

  errors.name = getError(values?.name, ['required']);

  return errors;
};
