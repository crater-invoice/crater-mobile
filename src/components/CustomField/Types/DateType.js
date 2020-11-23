import React from 'react';
import { Field } from 'redux-form';
import { DatePickerField } from '@/components/DatePickerField';

export function DateType({ field, name }) {
    const { label = null, is_required = false, placeholder = null } = field;

    return (
        <Field
            name={name}
            component={DatePickerField}
            label={label}
            formDateFormat="YYYY-MM-DD"
            isRequired={is_required}
            placeholder={placeholder ?? ' '}
        />
    );
}
