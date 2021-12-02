import {getError} from '@/validator';

const rules = values => {
  const errors = {};
  const {from, to, subject, body} = values;

  errors.from = getError(from, ['required', 'emailFormat']);
  errors.to = getError(to, ['required', 'emailFormat']);

  errors.subject = getError(subject, ['required']);

  errors.body = getError(body, ['required']);

  return errors;
};

export const validate = values => rules(values);

export const validateOnSubmit = values => {
  const errors = rules(values);
  let singleError = null;

  for (const key in errors) {
    if (errors[key]) {
      singleError = errors[key];
      break;
    }
  }

  return singleError;
};
