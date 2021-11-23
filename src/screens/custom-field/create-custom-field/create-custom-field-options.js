import React from 'react';
import {Field, FieldArray} from 'redux-form';
import {isEmpty} from '@/constants';
import {keyboardType} from '@/helpers/keyboard';
import t from 'locales/use-translation';
import {dataTypes} from 'stores/custom-field/helpers';
import {
  BaseInput,
  BaseDatePicker,
  BaseTimePicker,
  SelectFieldOptions,
  CheckBox,
  BaseDateTimePicker,
  BaseDropdownPicker
} from '@/components';

function getDropdownOptions(options) {
  if (isEmpty(options)) return [];

  const items = [];

  options.map(option => {
    option && option.length !== 0 && items.push({label: option, value: option});
  });

  return items;
}

export default props => {
  const {isAllowToEdit, theme, formValues} = props;
  let dataType = formValues?.type;
  let optionView = [];
  const alreadyInUsed = formValues?.in_use;

  const TIME_FIELD = (
    <Field
      name="default_answer"
      component={BaseTimePicker}
      label={t('custom_fields.default_value')}
      disabled={!isAllowToEdit}
    />
  );

  const NUMBER_FIELD = (
    <Field
      name="default_answer"
      component={BaseInput}
      hint={t('custom_fields.default_value')}
      keyboardType={keyboardType.DECIMAL}
      disabled={!isAllowToEdit}
    />
  );

  const DATE_FIELD = (
    <Field
      name="default_answer"
      component={BaseDatePicker}
      label={t('custom_fields.default_value')}
      icon={'calendar-alt'}
      formDateFormat="YYYY-MM-DD"
      disabled={!isAllowToEdit}
    />
  );

  const INPUT_FIELD = (
    <Field
      name="default_answer"
      component={BaseInput}
      hint={t('custom_fields.default_value')}
      disabled={!isAllowToEdit}
    />
  );

  const TEXTAREA_FIELD = (
    <Field
      name="default_answer"
      component={BaseInput}
      disabled={!isAllowToEdit}
      hint={t('custom_fields.default_value')}
      inputProps={{multiline: true}}
      height={80}
    />
  );

  const PLACEHOLDER_FIELD = (
    <Field
      name="placeholder"
      component={BaseInput}
      disabled={!isAllowToEdit}
      hint={t('custom_fields.placeholder')}
    />
  );

  const SELECT_FIELD_OPTIONS = (
    <FieldArray
      name="options"
      component={SelectFieldOptions}
      addFirstItem
      removeFirstItemOnPress
      disabled={!isAllowToEdit || alreadyInUsed}
      theme={theme}
    />
  );

  const SELECT_FIELD = (
    <Field
      name="default_answer"
      component={BaseDropdownPicker}
      label={t('custom_fields.default_value')}
      fieldIcon="align-center"
      items={getDropdownOptions(formValues?.options)}
      disabled={!isAllowToEdit}
    />
  );

  const CHECKBOX_FIELD = (
    <Field
      name="default_answer"
      component={CheckBox}
      hint={t('custom_fields.default_value')}
      label={t('custom_fields.check')}
      disabled={!isAllowToEdit}
    />
  );

  const DATE_TIME_FIELD = (
    <Field
      name="default_answer"
      component={BaseDateTimePicker}
      label={t('custom_fields.default_value')}
      disabled={!isAllowToEdit}
      callOnChangeInMount
      removeSecond
    />
  );

  switch (dataType) {
    case dataTypes.INPUT:
      optionView = [INPUT_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.TEXTAREA:
      optionView = [TEXTAREA_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.PHONE:
      optionView = [INPUT_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.URL:
      optionView = [INPUT_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.NUMBER:
      optionView = [NUMBER_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.DROPDOWN:
      optionView = [SELECT_FIELD_OPTIONS, SELECT_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.SWITCH:
      optionView = [CHECKBOX_FIELD];
      break;

    case dataTypes.DATE:
      optionView = [DATE_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.TIME:
      optionView = [TIME_FIELD, PLACEHOLDER_FIELD];
      break;

    case dataTypes.DATE_TIME:
      optionView = [DATE_TIME_FIELD, PLACEHOLDER_FIELD];

    default:
      break;
  }

  return isEmpty(optionView) ? <></> : optionView;
};
