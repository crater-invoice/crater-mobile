import React from 'react';
import {Field} from 'redux-form';
import {keyboardType} from '@/helpers/keyboard';
import {BaseInput} from '@/components';

export function NumberType({field, name, disabled}) {
  const {label = null, is_required = false, placeholder = null} = field;

  return (
    <Field
      name={name}
      component={BaseInput}
      hint={label}
      placeholder={placeholder}
      keyboardType={keyboardType.NUMERIC}
      isRequired={is_required}
      disabled={disabled}
    />
  );
}
