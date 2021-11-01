import {getError, isEmpty} from '@/constants';
import {CUSTOMER_FIELDS as FIELDS} from '../../constants';
import {validateCustomField} from '@/components/CustomField/validation';

export const validate = values => {
  const errors: any = {customer: {}, customFields: {}};

  if (values) {
    errors['customer'][FIELDS.NAME] = getError(
      values?.['customer']?.[FIELDS.NAME],
      ['required']
    );

    if (values?.['customer']?.[FIELDS.EMAIL]) {
      errors['customer'][FIELDS.EMAIL] = getError(
        values?.['customer']?.[FIELDS.EMAIL],
        ['emailFormat']
      );
    }

    if (values?.['customer']?.[FIELDS.WEBSITE]) {
      errors['customer'][FIELDS.WEBSITE] = getError(
        values?.['customer']?.[FIELDS.WEBSITE],
        ['urlFormat']
      );
    }

    const fieldErrors = validateCustomField(values?.customFields);
    !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);
  }

  return errors;
};
