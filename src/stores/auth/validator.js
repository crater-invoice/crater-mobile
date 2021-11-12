import {getError} from '@/validator';

export const loginValidator = values => {
  const errors = {};
  const {username, password} = values;

  errors.username = getError(username, ['required', 'emailFormat']);
  errors.password = getError(password, ['required', 'minCharacterRequired'], {
    minCharacter: 8
  });

  return errors;
};

export const forgotPasswordValidator = values => {
  const errors = {};
  const {email} = values;

  errors.email = getError(email, ['required', 'emailFormat']);

  return errors;
};
