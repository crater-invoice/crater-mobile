import { getError } from '@/api/validation';
import { hasObjectLength } from '@/api/global';
import {
    CUSTOM_FIELDS as FIELDS,
    DATA_TYPE_OPTION_VALUE as OPTION_VALUE
} from '../../constants';

export const validate = values => {
    const errors = { [FIELDS.FIELD]: {} };

    if (values && hasObjectLength(values[FIELDS.FIELD])) {
        errors[FIELDS.FIELD][FIELDS.NAME] = getError(
            values[FIELDS.FIELD][FIELDS.NAME],
            ['requiredField']
        );
        errors[FIELDS.FIELD][FIELDS.MODAL_TYPE] = getError(
            values[FIELDS.FIELD][FIELDS.MODAL_TYPE],
            ['requiredField']
        );
        errors[FIELDS.FIELD][FIELDS.TYPE] = getError(
            values[FIELDS.FIELD][FIELDS.TYPE],
            ['requiredField']
        );
        errors[FIELDS.FIELD][FIELDS.LABEL] = getError(
            values[FIELDS.FIELD][FIELDS.LABEL],
            ['requiredField']
        );
        if (values[FIELDS.FIELD][FIELDS.TYPE] === OPTION_VALUE.URL) {
            if (values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE]) {
                errors[FIELDS.FIELD][FIELDS.DEFAULT_VALUE] = getError(
                    values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE],
                    ['urlFormat']
                );
            }
        } else if (values[FIELDS.FIELD][FIELDS.TYPE] === OPTION_VALUE.NUMBER) {
            if (values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE]) {
                errors[FIELDS.FIELD][FIELDS.DEFAULT_VALUE] = getError(
                    values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE],
                    ['isNumberFormat']
                );
            }
        }
    }

    return errors;
};
