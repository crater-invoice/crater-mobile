import React from 'react';
import {Field} from 'redux-form';
import {BaseTimePicker} from '@/components';

export function TimeType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseTimePicker}
      label={label}
      isRequired={is_required}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
}
