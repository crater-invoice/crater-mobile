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
    password_added
  } = values;
  const errors = {};

  errors.name = getError(name, ['required']);

  if (enable_portal) {
    errors.email = getError(email, ['required']);

    const isPasswordRequired =
      !isEditScreen || (isEditScreen && !password_added) ? 'required' : '';

    errors.password = getError(
      password,
      ['passwordCompared', 'minCharacterRequired', isPasswordRequired],
      {minCharacter: 8, fieldName: confirm_password}
    );

    errors.confirm_password = getError(confirm_password, ['passwordCompared'], {
      fieldName: password
    });
  }

  if (email) {
    errors.email = getError(email, ['emailFormat']);
  }

  if (website) {
    errors.website = getError(website, ['urlFormat']);
  }

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
