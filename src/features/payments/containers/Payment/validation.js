import {validateCustomField} from '@/components/custom-field';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';
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
      ['required']
    );

    errors['payment'][FIELDS.AMOUNT] = getError(
      values?.['payment']?.[FIELDS.AMOUNT],
      ['required', 'isNumberFormat']
    );

    const fieldErrors = validateCustomField(values?.customFields);
    !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);
  }

  return errors;
};
