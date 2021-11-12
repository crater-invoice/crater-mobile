import {getError} from '@/validator';

export const validate = values => {
  const errors = {};
  const {from_date, to_date, date_range} = values;

  errors.date_range = getError(
    date_range,
    ['required'],
    (options = {fieldName: 'Date Range'})
  );

  errors.from_date = getError(
    from_date,
    ['required'],
    (options = {fieldName: 'From Date'})
  );

  errors.to_date = getError(
    to_date,
    ['required'],
    (options = {fieldName: 'To Date'})
  );

  return errors;
};
