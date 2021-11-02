import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {CUSTOM_FIELDS as FIELDS} from '../../constants';
import {
  InputField,
  DatePickerField,
  TimePickerField,
  SelectFieldOptions,
  CheckBox,
  DateTimePickerField,
  BaseDropdownPicker
} from '@/components';
import {keyboardType, MAX_LENGTH, isEmpty} from '@/constants';
import t from 'locales/use-translation';

// Custom Field Refs
// -----------------------------------------
export let customFieldRefs = {};
export const setCustomFieldRefs = refs => (customFieldRefs = refs);

const DEFAULT_TIME_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={TimePickerField}
      label={t('custom_fields.default_value')}
      disabled={!isAllowToEdit}
    />
  );
};

const DEFAULT_NUMBER_FIELD = symbol => {
  const {currency, isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={InputField}
      hint={t('custom_fields.default_value')}
      keyboardType={keyboardType.NUMERIC}
      leftSymbol={symbol ?? currency?.symbol}
      disabled={!isAllowToEdit}
    />
  );
};

const DEFAULT_DATE_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={DatePickerField}
      label={t('custom_fields.default_value')}
      icon={'calendar-alt'}
      formDateFormat="YYYY-MM-DD"
      disabled={!isAllowToEdit}
    />
  );
};

const DEFAULT_INPUT_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={InputField}
      disabled={!isAllowToEdit}
      hint={t('custom_fields.default_value')}
    />
  );
};

const DEFAULT_TEXTAREA_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={InputField}
      disabled={!isAllowToEdit}
      hint={t('custom_fields.default_value')}
      inputProps={{
        multiline: true,
        maxLength: MAX_LENGTH
      }}
      height={80}
    />
  );
};

const PLACEHOLDER_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.PLACEHOLDER}`}
      component={InputField}
      disabled={!isAllowToEdit}
      hint={t('custom_fields.placeholder')}
    />
  );
};

const SELECT_FIELD_OPTIONS = () => {
  const {isAllowToEdit, theme} = customFieldRefs?.props;
  return (
    <FieldArray
      name={`${FIELDS.FIELD}.${FIELDS.OPTIONS}`}
      component={SelectFieldOptions}
      addFirstItem
      removeFirstItemOnPress
      disabled={!isAllowToEdit}
      theme={theme}
    />
  );
};

const SELECT_FIELD_DEFAULT_VALUE = () => {
  const {formValues, isAllowToEdit} = customFieldRefs?.props;
  const options = formValues?.[FIELDS.FIELD][FIELDS.OPTIONS];

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
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={BaseDropdownPicker}
      label={t('custom_fields.default_value')}
      fieldIcon="align-center"
      items={optionsFormat()}
      disabled={!isAllowToEdit}
    />
  );
};

const DEFAULT_CHECKBOX_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={CheckBox}
      hint={t('custom_fields.default_value')}
      label={t('custom_fields.check')}
      disabled={!isAllowToEdit}
    />
  );
};

const DEFAULT_DATE_TIME_FIELD = () => {
  const {isAllowToEdit} = customFieldRefs?.props;
  return (
    <Field
      name={`${FIELDS.FIELD}.${FIELDS.DEFAULT_VALUE}`}
      component={DateTimePickerField}
      label={t('custom_fields.default_value')}
      disabled={!isAllowToEdit}
      callOnChangeInMount
      removeSecond
    />
  );
};

export {
  DEFAULT_INPUT_FIELD,
  DEFAULT_TEXTAREA_FIELD,
  DEFAULT_NUMBER_FIELD,
  DEFAULT_DATE_FIELD,
  DEFAULT_TIME_FIELD,
  DEFAULT_DATE_TIME_FIELD,
  DEFAULT_CHECKBOX_FIELD,
  PLACEHOLDER_FIELD,
  SELECT_FIELD_OPTIONS,
  SELECT_FIELD_DEFAULT_VALUE
};
