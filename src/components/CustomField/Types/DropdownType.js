import React from 'react';
import { Field } from 'redux-form';
import { InputField } from '../../InputField';
import { SelectPickerField } from '@/components/SelectPickerField';
import { hasFieldValue } from '@/api/global';

export function DropdownType({ field, name }) {
    const {
        label = null,
        is_required = false,
        placeholder = null,
        options = []
    } = field;

    const optionsFormat = () => {
        const items = [];
        if (!hasFieldValue(options)) return [];

        options.map(option => {
            if (option && option.length !== 0)
                items.push({
                    label: option,
                    value: option
                });
        });

        return items;
    };

    return (
        <Field
            name={name}
            component={SelectPickerField}
            label={label}
            fieldIcon="align-center"
            items={optionsFormat()}
            isRequired={is_required}
            defaultPickerOptions={{
                label: placeholder ?? 'Select an item...',
                value: null
            }}
            findValueByForm={false}
        />
    );
}
