import React from 'react';
import { Field } from 'redux-form';
import { DateTimePickerField } from '@/components/DateTimePickerField';

export function DateTimeType({ field, name, disabled }) {
    const { label = null, is_required = false } = field;

    return (
        <Field
            name={name}
            component={DateTimePickerField}
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
