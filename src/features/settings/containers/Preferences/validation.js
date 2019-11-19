import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        time_zone,
        date_format,
    } = values;

    errors.time_zone = getError(
        time_zone,
        ['requiredField'],
    );

    errors.date_format = getError(
        date_format,
        ['requiredField'],
    );

    return errors;
};
