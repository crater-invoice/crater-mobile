import { createSelector } from 'reselect'
import { hasLength } from '../../../api/global';

const getCustomFieldsState = createSelector(
    customFields => customFields,
    customFields => !hasLength(customFields) ? [] : customFields.map((field) => {
        const { name, type } = field;
        return {
            title: name,
            subtitle: {
                title: type,
            },
            fullItem: field,
        };
    })
);

export {
    getCustomFieldsState,
}
