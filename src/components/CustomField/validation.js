import { getError, hasFieldValue } from '@/constants';
import { CUSTOM_FIELD_DATA_TYPES as DATA_TYPES } from '@/features/settings/constants';

export const validate = ({ fields = [] }) => {
    let errors = {};
    let fieldErrors = [];

    if (hasFieldValue(fields)) {
        fields.forEach((field, index) => {
            let fieldError = {};
            const { required, type } = field;

            if (required && type !== DATA_TYPES.SWITCH) {
                if (type === DATA_TYPES.URL)
                    fieldError['value'] = getError(field['value'], [
                        'requiredField',
                        'urlFormat'
                    ]);
                else if (type === DATA_TYPES.NUMBER)
                    fieldError['value'] = getError(field['value'], [
                        'requiredField',
                        'isNumberFormat'
                    ]);
                else
                    fieldError['value'] = getError(field['value'], [
                        'requiredField'
                    ]);
                fieldErrors[index] = fieldError;
            }
        });

        fieldErrors.length && (errors.fields = fieldErrors);
    }

    return errors;
};
