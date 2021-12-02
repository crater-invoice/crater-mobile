import React from 'react';
import {Field} from 'redux-form';
import {BaseDropdownPicker, BaseDatePicker, BaseInput} from '@/components';
import t from 'locales/use-translation';
import {LIMIT_TYPES} from 'stores/recurring-invoice/helpers';

interface IProps {
  /**
   * An object with data for limit-By-Field field.
   */
  limitByField?: object;

  /**
   * An object with data for limit-Date-Field field.
   */
  limitDateField?: object;

  /**
   * An object with data for limit-Count-Field field.
   */
  limitCountField?: object;
}

export const LimitField = (props: IProps) => {
  const {limitByField, limitDateField, limitCountField} = props;

  return (
    <>
      <Field
        name={limitByField.name}
        label={t('recurring_invoices.limit_by')}
        component={BaseDropdownPicker}
        fieldIcon="pause-circle"
        items={LIMIT_TYPES}
        onChangeCallback={limitByField.onChangeCallback}
        callbackWhenMount={() => {}}
        isRequired
      />
      {limitByField.value === 'DATE' && (
        <Field
          name={limitDateField.name}
          component={BaseDatePicker}
          label={t('recurring_invoices.limit_types.date')}
          icon={'calendar-alt'}
          isRequired
        />
      )}
      {limitByField.value === 'COUNT' && (
        <Field
          name={limitCountField.name}
          hint={t('recurring_invoices.limit_types.count')}
          component={BaseInput}
          inputProps={{
            autoCapitalize: 'characters'
          }}
          isRequired
        />
      )}
    </>
  );
};
