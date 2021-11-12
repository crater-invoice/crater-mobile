import {getError} from '@/validator';

export const validate = (values, {type}) => {
  const errors: any = {};
  errors.name = getError(values?.name, ['required']);
  errors.email = getError(values?.email, ['required', 'emailFormat']);
  errors.password = getError(
    values?.password,
    type === 'ADD'
      ? ['required', 'minCharacterRequired']
      : ['minCharacterRequired'],
    {minCharacter: 8}
  );
  errors.role = getError(values?.role, ['required']);

  return errors;
};
