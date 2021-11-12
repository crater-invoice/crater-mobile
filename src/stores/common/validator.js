import {getError} from '@/validator';

export const validateEndpoint = values => {
  const errors: any = {};

  errors.url = getError(values.url, ['required', 'urlFormat']);

  return errors;
};
