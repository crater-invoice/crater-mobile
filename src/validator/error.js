import {trim} from 'lodash';
import {
  EMAIL_REGEX,
  URL_REGEX,
  CHARACTER_ONLY_REGEX,
  CRON_REGEX
} from './regex';

type IValidationOptions = {
  fieldName?: string,
  minNumber?: number,
  maxNumber?: number,
  maxCharacter?: number | string,
  minCharacter?: number | string,
  message?: string
};

type ErrorType =
  | 'emailFormat'
  | 'required'
  | 'itemField'
  | 'requiredCheckArray'
  | 'minNumberRequired'
  | 'maxNumberRequired'
  | 'maxCharacterRequired'
  | 'minCharacterRequired'
  | 'characterOnlyRequired'
  | 'isNumberFormat'
  | 'passwordCompared'
  | 'moreThanDue'
  | 'urlFormat'
  | 'cronFormat';

export function getError(
  value: string | number | any,
  errorTypes: Array<ErrorType>,
  options: IValidationOptions = {}
) {
  const {
    fieldName,
    minNumber,
    maxNumber,
    maxCharacter,
    minCharacter,
    message = null
  } = options;

  const errorTypeMap = {
    emailFormat: () => (EMAIL_REGEX.test(value) ? null : 'validation.email'),

    required: () => (!trim(value) ? 'validation.required' : null),

    itemField: () => (!value ? 'validation.choose' : null),

    requiredCheckArray: () =>
      value && value.length ? null : message ?? 'validation.choose',

    minNumberRequired: () =>
      value <= minNumber ? `validation.minimum_number` : null,

    maxNumberRequired: () =>
      value > maxNumber ? 'validation.maximum_number' : null,

    maxCharacterRequired: () =>
      value.length > maxCharacter ? 'validation.maximum_character' : null,

    minCharacterRequired: () => {
      if (value) {
        return value.length < minCharacter
          ? message || 'validation.min_character'
          : null;
      }
    },

    characterOnlyRequired: () =>
      CHARACTER_ONLY_REGEX.test(value) ? null : 'validation.character',

    isNumberFormat: () => (isNaN(Number(value)) ? 'validation.numeric' : null),

    passwordCompared: () =>
      value
        ? value === fieldName
          ? null
          : 'validation.password_compare'
        : fieldName
        ? value === fieldName
          ? null
          : 'validation.password_compare'
        : null,

    moreThanDue: () => 'validation.more_than_due',

    urlFormat: () => (URL_REGEX.test(value) ? null : 'validation.url'),

    cronFormat: () => (CRON_REGEX.test(value) ? null : 'validation.cron')
  };

  const errorType = errorTypes.find(
    error => errorTypeMap[error] && errorTypeMap[error]()
  );

  return errorType ? errorTypeMap[errorType]() : null;
}
