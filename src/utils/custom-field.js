import {find} from 'lodash';
import {hasValue, isEmpty} from '@/constants';
import {CUSTOM_FIELD_DATA_TYPES as DATA_TYPES} from '@/features/settings/constants';
import {sortByItem} from './common';

export const getInitialCustomFields = (customFields, initialValues) => {
  if (isEmpty(initialValues)) {
    return sortByItem(customFields, 'order');
  }

  let fields = [];

  initialValues.map(value => {
    fields.push({...value.custom_field, defaultAnswer: value.defaultAnswer});
  });

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
      value: type !== DATA_TYPES.SWITCH ? value?.toString() : value
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
      (field.type === DATA_TYPES.DATE ||
        field.type === DATA_TYPES.TIME ||
        field.type === DATA_TYPES.DATE_TIME)
    ) {
      isAllow = false;
    }

    if (isAllow) {
      apiFormattedFields.push({...field, value: field?.value ?? null});
    }
  });

  return apiFormattedFields;
};
