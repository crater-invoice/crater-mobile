import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        currency,
        language,
    } = values;

    errors.currency = getError(
        currency,
        ['requiredField'],
        { fieldName: 'Currency' },
    );

    errors.language = getError(
        language,
        ['requiredField'],
        { fieldName: 'Language' },
    );


    return errors;
};
