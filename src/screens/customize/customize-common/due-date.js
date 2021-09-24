import React, {Component} from 'react';
import {Field} from 'redux-form';
import {ToggleSwitch, InputField} from '@/components';
import {isBooleanTrue} from '@/constants';

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

export const DueDate = (props: IProps) => {
  const {toggleField, dueDateField} = props;

  return (
    <>
      <Field
        name={toggleField.name}
        component={ToggleSwitch}
        hint={toggleField.hint}
        description={toggleField.description}
      />
      {isBooleanTrue(toggleField.value) && (
        <Field
          name={dueDateField.name}
          component={InputField}
          hint={dueDateField.hint}
          inputProps={{
            returnKeyType: 'next',
            keyboardType: 'numeric'
          }}
          isRequired={isBooleanTrue(toggleField.value)}
        />
      )}
    </>
  );
};
