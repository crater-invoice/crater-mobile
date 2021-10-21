import React from 'react';
import {Field} from 'redux-form';
import {isEmpty} from '@/constants';
import {BaseDropdownPicker} from '@/components';

export function DropdownType({field, name, disabled}) {
  const {
    label = null,
    is_required = false,
    placeholder = null,
    options = []
  } = field;

  const optionsFormat = () => {
    const items = [];
    if (isEmpty(options)) return [];

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
      component={BaseDropdownPicker}
      label={label}
      fieldIcon="align-center"
      items={optionsFormat()}
      isRequired={is_required}
      defaultPickerOptions={{
        label: placeholder ?? 'Select an item...',
        value: null
      }}
      findValueByForm={false}
      disabled={disabled}
    />
  );
}
