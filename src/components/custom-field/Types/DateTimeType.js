import React from 'react';
import {Field} from 'redux-form';
import {BaseDateTimePicker} from '@/components';

export function DateTimeType({field, name, disabled}) {
  const {label = null, is_required = false} = field;

  return (
    <Field
      name={name}
      component={BaseDateTimePicker}
      label={label}
      isRequired={is_required}
      dateFieldName={`${name}-date`}
      timeFieldName={`${name}-time`}
      callOnChangeInMount
      removeSecond
      disabled={disabled}
    />
  );
}
