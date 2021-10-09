import React from 'react';
import {Field} from 'redux-form';
import {DatePickerField, InputField, SelectPickerField} from '@/components';
import t from 'locales/use-translation';
import {LIMIT_TYPES} from 'stores/recurring-invoices/helpers';

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

export const LimitField = (props: IProps) => {
  const {limitByField, limitDateField, limitCountField} = props;

  return (
    <>
      <Field
        name={limitByField.name}
        label={t('recurring_invoices.limit_by')}
        component={SelectPickerField}
        fieldIcon="pause-circle"
        items={LIMIT_TYPES}
        defaultPickerOptions={{
          label: t('recurring_invoices.limit_types.none'),
          value: 'none'
        }}
        onChangeCallback={limitByField.onChangeCallback}
        callbackWhenMount={() => {}}
      />
      {limitByField.value === 'DATE' && (
        <Field
          name={limitDateField.name}
          component={DatePickerField}
          label={t('recurring_invoices.limit_types.date')}
          icon={'calendar-alt'}
        />
      )}
      {limitByField.value === 'count' && (
        <Field
          name={limitCountField.name}
          hint={t('recurring_invoices.limit_types.count')}
          component={InputField}
          inputProps={{
            returnKeyType: 'next',
            autoCorrect: true,
            autoCapitalize: 'characters'
          }}
        />
      )}
    </>
  );
};
