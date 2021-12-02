import React from 'react';
import {Field} from 'redux-form';
import {BaseDatePicker} from '@/components';

export function DateType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseDatePicker}
      label={label}
      formDateFormat="YYYY-MM-DD"
      isRequired={is_required}
      placeholder={placeholder ?? ' '}
      disabled={disabled}
    />
  );
}
