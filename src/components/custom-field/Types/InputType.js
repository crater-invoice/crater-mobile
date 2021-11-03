import React from 'react';
import {Field} from 'redux-form';
import {BaseInput} from '@/components';

export function InputType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseInput}
      hint={label}
      placeholder={placeholder}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
