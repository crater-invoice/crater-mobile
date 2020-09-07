import React from 'react';
import { Field } from 'redux-form';
import { TimePickerField } from '@/components/TimePickerField';

export function TimeType({ field, name }) {
    const { label = null, is_required = false, placeholder = null } = field;

    return (
        <Field
            name={name}
            component={TimePickerField}
            label={label}
            isRequired={is_required}
            placeholder={placeholder}
        />
    );
}
