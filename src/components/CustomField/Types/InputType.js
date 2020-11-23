import React from 'react';
import { Field } from 'redux-form';
import { InputField } from '@/components/InputField';

export function InputType({ field, name }) {
    const { label = null, is_required = false, placeholder = null } = field;

    return (
        <Field
            name={name}
            component={InputField}
            hint={label}
            inputProps={{
                returnKeyType: 'next',
                autoCorrect: true,
                placeholder
            }}
            isRequired={is_required}
        />
    );
}
