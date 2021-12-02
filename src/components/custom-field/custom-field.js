import React, {useEffect, useState} from 'react';
import {FieldArray, change} from 'redux-form';
import {isEmpty} from '@/constants';
import {getInitialCustomFields, getCustomFieldValueParams} from '@/utils';
import {dataTypes} from 'stores/custom-field/helpers';
import {IProps} from './type.d';
import {
  InputType,
  SwitchType,
  TextAreaType,
  PhoneType,
  UrlType,
  NumberType,
  DropdownType,
  DateType,
  TimeType,
  DateTimeType
} from './Types';

const FIELDS = ({fields, customFields, disabled}) => {
  const items = [];

  if (fields.length === 0) return null;

  customFields.map((field, index) => {
    const {type} = field;
    const name = `customFields[${index}].value`;
    const fieldProps = {
      field,
      name,
      key: index,
      disabled
    };

    switch (type) {
      case dataTypes.INPUT:
        items.push(<InputType {...fieldProps} />);
        break;

      case dataTypes.TEXTAREA:
        items.push(<TextAreaType {...fieldProps} />);
        break;

      case dataTypes.PHONE:
        items.push(<PhoneType {...fieldProps} />);
        break;

      case dataTypes.URL:
        items.push(<UrlType {...fieldProps} />);
        break;

      case dataTypes.NUMBER:
        items.push(<NumberType {...fieldProps} />);
        break;

      case dataTypes.DROPDOWN:
        items.push(<DropdownType {...fieldProps} />);
        break;

      case dataTypes.SWITCH:
        items.push(<SwitchType {...fieldProps} />);
        break;

      case dataTypes.DATE:
        items.push(<DateType {...fieldProps} />);
        break;

      case dataTypes.TIME:
        items.push(<TimeType {...fieldProps} />);
        break;

      case dataTypes.DATE_TIME:
        items.push(<DateTimeType {...fieldProps} />);
        break;

      default:
        break;
    }
  });

  return items;
};

export const CustomField = (props: IProps) => {
  const {customFields, dispatch, form, formValues, isAllowToEdit} = props;

  const [sortableFields, setSortableFields] = useState(null);

  useEffect(() => {
    const values = formValues?.fields;
    const fields = getInitialCustomFields(customFields, values);

    setFormField('customFields', getCustomFieldValueParams(fields));
    setSortableFields(fields);
    return () => {};
  }, []);

  const setFormField = (field, value) => {
    dispatch(change(form, field, value));
  };

  if (isEmpty(sortableFields)) {
    return null;
  }

  return (
    <FieldArray
      name={'customFields'}
      component={FIELDS}
      customFields={sortableFields}
      disabled={!isAllowToEdit}
    />
  );
};
