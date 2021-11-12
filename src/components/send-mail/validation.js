import {getError} from '@/validator';

export const validate = values => {
  const errors = {};
  const {from, to, subject, body} = values;

  errors.from = getError(from, ['required', 'emailFormat']);
  errors.to = getError(to, ['required', 'emailFormat']);

  errors.subject = getError(subject, ['required']);

  errors.body = getError(body, ['required']);

  return errors;
};
