import React from 'react';
import {Field} from 'redux-form';
import {BaseInput} from '@/components';
import {MAX_LENGTH} from '@/constants';

export function TextAreaType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseInput}
      hint={label}
      placeholder={placeholder}
      inputProps={{
        multiline: true,
        maxLength: MAX_LENGTH
      }}
      height={80}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
