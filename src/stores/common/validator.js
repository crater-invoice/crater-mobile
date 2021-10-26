import {getError} from '@/constants';

export const validateEndpoint = values => {
  const errors: any = {};

  errors.url = getError(values.url, ['requiredField', 'urlFormat']);

  return errors;
};
