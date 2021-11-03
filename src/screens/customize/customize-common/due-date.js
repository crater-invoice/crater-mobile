import React from 'react';
import {Field} from 'redux-form';
import {BaseSwitch, BaseInput} from '@/components';
import {isBooleanTrue, keyboardType} from '@/constants';

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
        component={BaseSwitch}
        hint={toggleField.hint}
        description={toggleField.description}
      />
      {isBooleanTrue(toggleField.value) && (
        <Field
          name={dueDateField.name}
          component={BaseInput}
          hint={dueDateField.hint}
          keyboardType={keyboardType.NUMERIC}
          isRequired={isBooleanTrue(toggleField.value)}
        />
      )}
    </>
  );
};
