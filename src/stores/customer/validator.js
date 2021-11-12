import {validateCustomField} from '@/components';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const {name, email, website, password, confirmPassword} = values;
  const errors = {};

  errors.name = getError(name, ['required']);

  if (email) {
    errors.email = getError(email, ['emailFormat']);
  }

  if (website) {
    errors.website = getError(website, ['urlFormat']);
  }

  errors.password = getError(
    values.password,
    ['passwordCompared', 'minCharacterRequired'],
    {minCharacter: 8, fieldName: confirmPassword}
  );

  errors.confirmPassword = getError(confirmPassword, ['passwordCompared'], {
    fieldName: password
  });

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
