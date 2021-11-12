import {getError} from '@/validator';
import {dataTypes} from './helpers';

export const validate = values => {
  const errors = {};
  const {name, modalType, type, label, order, defaultValue} = values;

  errors.name = getError(name, ['required']);
  errors.modalType = getError(modalType, ['required']);
  errors.type = getError(type, ['required']);
  errors.label = getError(label, ['required']);
  errors.order = getError(order, ['required']);

  if (defaultValue && type === dataTypes.URL) {
    errors.defaultValue = getError(defaultValue, ['urlFormat']);
  }
  if (defaultValue && type === dataTypes.NUMBER) {
    errors.defaultValue = getError(defaultValue, ['isNumberFormat']);
  }

  return errors;
};
