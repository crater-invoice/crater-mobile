import {validateCustomField} from '@/components';
import {getError, isEmpty} from '@/constants';

export const validate = values => {
  const errors = {};

  errors.name = getError(values?.name, ['required']);

  if (values?.email) {
    errors.email = getError(values?.email, ['emailFormat']);
  }

  if (values?.website) {
    errors.website = getError(values?.website, ['urlFormat']);
  }

  const fieldErrors = validateCustomField(values?.customFields);
  !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
