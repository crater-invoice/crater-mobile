import {validateCustomField} from '@/components/CustomField/validation';
import {getError, isEmpty} from '@/constants';
import {PAYMENT_FIELDS as FIELDS} from '../../constants';

export const validate = values => {
  const errors: any = {payment: {}, customFields: {}};

  if (values) {
    errors['payment'][FIELDS.DATE] = getError(
      values?.['payment']?.[FIELDS.DATE],
      ['required']
    );

    errors['payment'][FIELDS.NUMBER] = getError(
      values?.['payment']?.[FIELDS.NUMBER],
      ['required', 'isNumberFormat']
    );

    errors['payment'][FIELDS.CUSTOMER] = getError(
      values?.['payment']?.[FIELDS.CUSTOMER],
      ['requiredField']
    );

    errors['payment'][FIELDS.AMOUNT] = getError(
      values?.['payment']?.[FIELDS.AMOUNT],
      ['requiredField', 'isNumberFormat']
    );

    const fieldErrors = validateCustomField(values?.customFields);
    !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);
  }

  return errors;
};
