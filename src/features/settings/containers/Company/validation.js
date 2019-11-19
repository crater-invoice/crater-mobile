import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { name, country_id } = values;

    errors.name = getError(name, ['requiredField']);
    errors.country_id = getError(country_id, ['required']);

    return errors;
};
