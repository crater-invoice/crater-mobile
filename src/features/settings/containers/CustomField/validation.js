import { getError } from '@/constants';
import { hasObjectLength } from '@/constants';
import {
    CUSTOM_FIELDS as FIELDS,
    DATA_TYPE_OPTION_VALUE as OPTION_VALUE
} from '../../constants';

export const validate = values => {
    const errors = { [FIELDS.FIELD]: {} };
    const field = FIELDS.FIELD;
    const name = FIELDS.NAME;
    const modalType = FIELDS.MODAL_TYPE;
    const type = FIELDS.TYPE;
    const label = FIELDS.LABEL;
    const defaultValue = FIELDS.DEFAULT_VALUE;
    const order = FIELDS.ORDER;

    if (values && hasObjectLength(values[field])) {
        errors[field][name] = getError(values[field][name], ['requiredField']);
        errors[field][modalType] = getError(values[field][modalType], [
            'requiredField'
        ]);
        errors[field][type] = getError(values[field][type], ['requiredField']);
        errors[field][label] = getError(values[field][label], [
            'requiredField'
        ]);
        errors[field][order] = getError(values[field][order], [
            'requiredField'
        ]);
        if (values[field][type] === OPTION_VALUE.URL) {
            if (values[field][defaultValue]) {
                errors[field][defaultValue] = getError(
                    values[field][defaultValue],
                    ['urlFormat']
                );
            }
        } else if (values[field][type] === OPTION_VALUE.NUMBER) {
            if (values[field][defaultValue]) {
                errors[field][defaultValue] = getError(
                    values[field][defaultValue],
                    ['isNumberFormat']
                );
            }
        }
    }

    return errors;
};
