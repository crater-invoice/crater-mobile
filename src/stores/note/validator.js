import {getError} from '@/validator';

export const validate = values => {
  const errors = {};

  errors.name = getError(values?.name, ['required']);
  errors.type = getError(values?.type, ['required']);
  errors.notes = getError(values?.notes, ['required']);

  return errors;
};
