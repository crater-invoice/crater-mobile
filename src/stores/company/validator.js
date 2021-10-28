import {getError} from '@/constants';

export const validate = values => {
  const errors = {};
  const {
    time_zone,
    date_format,
    currency,
    language,
    fiscal_year,
    retrospective_edits
  } = values;

  errors.currency = getError(currency, ['requiredField'], {
    fieldName: 'Currency'
  });

  errors.language = getError(language, ['requiredField'], {
    fieldName: 'Language'
  });
  errors.time_zone = getError(time_zone, ['requiredField']);

  errors.date_format = getError(date_format, ['requiredField']);

  errors.fiscal_year = getError(fiscal_year, ['requiredField']);

  errors.retrospective_edits = getError(retrospective_edits, ['requiredField']);

  return errors;
};

export const validateCompany = values => {
  const errors = {};
  errors.name = getError(values.name, ['required']);
  errors.country_id = getError(values.country_id, ['required']);
  errors.currency = getError(values.currency, ['required']);

  return errors;
};
