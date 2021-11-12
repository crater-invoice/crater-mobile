import {getError} from '@/validator';

export const validate = values => {
  const errors = {};
  const {name, email, password, confirmPassword} = values;
  errors.name = getError(name, ['required']);
  errors.email = getError(email, ['required', 'emailFormat']);
  errors.password = getError(
    password,
    ['passwordCompared', 'minCharacterRequired'],
    {minCharacter: 8, fieldName: confirmPassword}
  );
  errors.confirmPassword = getError(confirmPassword, ['passwordCompared'], {
    fieldName: password
  });

  return errors;
};
