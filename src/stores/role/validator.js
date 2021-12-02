import {getError} from '@/validator';

export const validate = values => {
  const errors: any = {};
  const {name} = values;

  errors.name = getError(name, ['required']);

  return errors;
};
