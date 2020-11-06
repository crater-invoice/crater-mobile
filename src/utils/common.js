import { omit, find } from 'lodash';
import { hasObjectLength, hasValue, isArray } from '@/constants';

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
            value: value?.toString(),
            type,
            required: is_required
        };
    });
};
