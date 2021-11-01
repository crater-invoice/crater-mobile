import React from 'react';
import {Field} from 'redux-form';
import {InputField} from '@/components/InputField';

export function InputType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={InputField}
      hint={label}
      placeholder={placeholder}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
