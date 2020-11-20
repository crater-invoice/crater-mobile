import { omit, find, sortBy } from 'lodash';
import { hasObjectLength, hasValue, isArray } from '@/constants';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';
import { I18nManager } from 'react-native';

export const isFilterApply = formValues => {
    if (!formValues) return false;

    const values = omit(formValues, 'search');
    return hasObjectLength(values);
};

export const getCustomFieldValueParams = (
    customFields = null,
    initialFieldValues = null
) => {
    if (!isArray(customFields)) {
        return [];
    }

    const hasInitialValues = isArray(initialFieldValues);

    return customFields.map(field => {
        const {
            id,
            type,
            defaultAnswer = null,
            default_answer = null,
            is_required
        } = field;

        let value = defaultAnswer ?? default_answer;

        if (hasInitialValues) {
            const defaultValue = find(initialFieldValues, {
                custom_field_id: id
            });

            if (hasValue(defaultValue))
                value =
                    defaultValue?.defaultAnswer ?? defaultValue?.default_answer;
        }
        return {
            id,
            value: type !== DATA_TYPES.SWITCH ? value?.toString() : value,
            type,
            required: is_required
        };
    });
};

export const getApiFormattedCustomFields = customFields => {
    if (!isArray(customFields)) {
        return [];
    }

    return customFields.map(field => {
        return {
            ...field,
            value: field?.value ?? null
        };
    });
};

export const sortByItem = (items, iteratee) => {
    return sortBy(items, [iteratee]);
};

export const isRTL = () => I18nManager.isRTL;

export const setI18nManagerValue = async ({ isRTL }) => {
    try {
        await I18nManager.forceRTL(isRTL);
        await I18nManager.allowRTL(isRTL);
    } catch (e) {}
};
