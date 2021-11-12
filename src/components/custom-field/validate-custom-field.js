import {isEmpty} from '@/constants';
import {getError} from '@/validator';
import {dataTypes} from 'stores/custom-field/helpers';

export const validateCustomField = fields => {
  if (isEmpty(fields)) {
    return [];
  }

  let fieldErrors = [];

  fields.forEach((field, index) => {
    let fieldError = {};
    const {type} = field;
    const required = field?.isRequired || field?.required;
    if (required && type !== dataTypes.SWITCH) {
      if (type === dataTypes.URL)
        fieldError['value'] = getError(field['value'], [
          'required',
          'urlFormat'
        ]);
      else if (type === dataTypes.NUMBER)
        fieldError['value'] = getError(field['value'], [
          'required',
          'isNumberFormat'
        ]);
      else fieldError['value'] = getError(field['value'], ['required']);
      fieldErrors[index] = fieldError;
    }
  });

  return fieldErrors;
};
