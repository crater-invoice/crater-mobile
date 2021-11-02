import React from 'react';
import {Field} from 'redux-form';
import {StyleSheet} from 'react-native';
import {BaseSwitch} from '@/components';

export function SwitchType({field, name, disabled}) {
  const {label = null, is_required = false} = field;

  return (
    <Field
      name={name}
      component={BaseSwitch}
      isRequired={is_required}
      hint={label ?? ' '}
      hintStyle={styles.label}
      containerStyle={styles.container}
      disabled={disabled}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start'
  },
  label: {
    width: 'auto',
    marginRight: 15
  }
});
