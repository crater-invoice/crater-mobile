import React from 'react';
import {Field} from 'redux-form';
import {DatePickerField, InputField, SelectPickerField} from '@/components';
import t from 'locales/use-translation';
import {frequencies} from 'stores/recurring-invoices/helpers';

interface IProps {
  /**
   * An object with data for due date field.
   */
  dueDateField?: object;

  /**
   * An object with data for toggle field.
   */
  toggleField?: object;
}

export const FrequencyField = (props: IProps) => {
  const {
    frequencyField,
    frequencyPickerField,
    onChangeCallback,
    callbackWhenMount
  } = props;

  return (
    <>
      <Field
        name={frequencyPickerField.name}
        label={t('recurring_invoices.select_frequency')}
        component={SelectPickerField}
        fieldIcon="sync"
        items={frequencies}
        defaultPickerOptions={{
          label: t('recurring_invoices.frequencies.custom'),
          value: null
        }}
        onChangeCallback={onChangeCallback}
        callbackWhenMount={callbackWhenMount}
      />
      <Field
        name={frequencyField.name}
        component={InputField}
        hint={t('recurring_invoices.display_frequency')}
        inputProps={{}}
        meta={{}}
        callbackWhenMount={callbackWhenMount}
        disabled={frequencyPickerField.value}
      />
    </>
  );
};
