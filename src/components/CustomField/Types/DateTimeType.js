import React from 'react';
import { Field } from 'redux-form';
import { DateTimePickerField } from '@/components/DateTimePickerField';

export function DateTimeType({ field, name, disabled }) {
    const { label = null, is_required = false, locale = 'en' } = field;

    return (
        <Field
            name={name}
            component={DateTimePickerField}
            label={label}
            isRequired={is_required}
            dateFieldName={`${name}-date`}
            timeFieldName={`${name}-time`}
            locale={locale}
            callOnChangeInMount
            removeSecond
            disabled={disabled}
        />
    );
}
