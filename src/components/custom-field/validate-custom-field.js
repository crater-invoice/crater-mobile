import {getError, isEmpty} from '@/constants';
import {CUSTOM_FIELD_DATA_TYPES as DATA_TYPES} from '@/features/settings/constants';

export const validateCustomField = fields => {
  if (isEmpty(fields)) {
    return [];
  }

  let fieldErrors = [];

  fields.forEach((field, index) => {
    let fieldError = {};
    const {type} = field;
    const required = field?.isRequired || field?.required;
    if (required && type !== DATA_TYPES.SWITCH) {
      if (type === DATA_TYPES.URL)
        fieldError['value'] = getError(field['value'], [
          'required',
          'urlFormat'
        ]);
      else if (type === DATA_TYPES.NUMBER)
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
