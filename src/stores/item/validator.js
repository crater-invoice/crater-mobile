import {validateCustomField} from '@/components';
import {isEmpty} from '@/constants';
import {getError} from '@/validator';

export const validate = values => {
  const errors = {};
  const {name, quantity, discount_type, price, discount} = values;

  errors.name = getError(name, ['required']);

  errors.quantity = getError(
    quantity,
    ['required', 'minNumberRequired', 'isNumberFormat'],
    (options = {fieldName: 'quantity', minNumber: 0})
  );

  errors.price = getError(
    price,
    ['required', 'minNumberRequired', 'isNumberFormat'],
    (options = {fieldName: 'price', minNumber: 0})
  );

  if (discount_type !== 'none') {
    errors.discount = getError(
      discount,
      ['minNumberRequired', 'isNumberFormat'],
      (options = {fieldName: 'discount', minNumber: 0})
    );
  }

  errors.discount_type = getError(discount_type, ['required']);

  // const fieldErrors = validateCustomField(values?.customFields);
  // !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

  return errors;
};
