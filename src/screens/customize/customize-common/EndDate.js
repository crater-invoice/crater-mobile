import React, {Component} from 'react';
import {Field} from 'redux-form';
import {ToggleSwitch, InputField} from '@/components';

interface IProps {
  endDateField?: object;
  toggleField?: object;
}

export class EndDate extends Component<IProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const {toggleField, endDateField} = this.props;
    return (
      <>
        <Field
          name={toggleField.name}
          component={ToggleSwitch}
          hint={toggleField.hint}
          description={toggleField.description}
        />
        {toggleField.value === true && (
          <Field
            name={endDateField.name}
            component={InputField}
            hint={endDateField.hint}
            inputProps={{
              returnKeyType: 'next',
              keyboardType: 'numeric'
            }}
            isRequired={toggleField.value === true}
          />
        )}
      </>
    );
  }
}
