import {validateCustomField} from '@/components';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const {
    name,
    email,
    website,
    password,
    confirm_password,
    enable_portal,
    isEditScreen,
    password_set
  } = values;
  const errors = {};

  errors.name = getError(name, ['required']);

  if (enable_portal) {
    errors.email = getError(email, ['required']);
  }

  if (email) {
    errors.email = getError(email, ['emailFormat']);
  }

  if (website) {
    errors.website = getError(website, ['urlFormat']);
  }

  if (!isEditScreen || (isEditScreen && !password_set)) {
    errors.password = getError(password, ['required']);
  }

  errors.password = getError(
    password,
    ['passwordCompared', 'minCharacterRequired'],
    {minCharacter: 8, fieldName: confirm_password}
  );
  errors.confirm_password = getError(confirm_password, ['passwordCompared'], {
    fieldName: password
  });

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
