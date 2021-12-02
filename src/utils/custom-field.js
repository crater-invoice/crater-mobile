import {find} from 'lodash';
import {hasValue, isEmpty} from '@/constants';
import {sortByItem} from './common';
import {dataTypes} from 'stores/custom-field/helpers';

export const getInitialCustomFields = (customFields, initialValues) => {
  let fields = [];

  if (!isEmpty(initialValues)) {
    initialValues.map(value => {
      fields.push({
        ...value.custom_field,
        defaultAnswer: value.defaultAnswer ?? value.default_answer
      });
    });
  }

  if (!isEmpty(customFields)) {
    customFields.map(customField => {
      const isOld = find(fields, {id: customField.id});
      if (!isOld) fields.push(customField);
    });
  }

  return sortByItem(fields, 'order');
};

export const getCustomFieldValueParams = customFields => {
  if (isEmpty(customFields)) {
    return [];
  }

  return customFields.map(field => {
    const {
      id,
      type,
      defaultAnswer = null,
      default_answer = null,
      is_required
    } = field;

    let value = defaultAnswer ?? default_answer;

    return {
      id,
      type,
      isRequired: is_required,
      value: type !== dataTypes.SWITCH ? value?.toString() : value
    };
  });
};

export const getApiFormattedCustomFields = customFields => {
  if (isEmpty(customFields)) {
    return [];
  }

  const apiFormattedFields = [];

  customFields.map(field => {
    let isAllow = true;

    if (
      !hasValue(field?.value) &&
      (field.type === dataTypes.DATE ||
        field.type === dataTypes.TIME ||
        field.type === dataTypes.DATE_TIME)
    ) {
      isAllow = false;
    }

    if (isAllow) {
      apiFormattedFields.push({...field, value: field?.value ?? null});
    }
  });

  return apiFormattedFields;
};
