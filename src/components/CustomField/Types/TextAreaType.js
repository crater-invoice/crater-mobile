import React from 'react';
import { Field } from 'redux-form';
import { InputField } from '../../InputField';
import { MAX_LENGTH } from '@/constants';

export function TextAreaType({ field, name, disabled }) {
    const { label = null, is_required = false, placeholder = null } = field;

    return (
        <Field
            name={name}
            component={InputField}
            hint={label}
            inputProps={{
                returnKeyType: 'next',
                autoCapitalize: 'none',
                autoCorrect: true,
                multiline: true,
                maxLength: MAX_LENGTH,
                placeholder
            }}
            height={80}
            isRequired={is_required}
            disabled={disabled}
        />
    );
}
