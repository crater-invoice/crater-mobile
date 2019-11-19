
import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        name,
        enable_portal,
        password,
        id,
        email,
        website,
        phone
    } = values;

    errors.name = getError(name, ['required']);

    if (email)
        errors.email = getError(email, ['emailFormat']);

    if (website)
        errors.website = getError(website, ['urlFormat']);

    if (phone)
        errors.phone = getError(phone, ['isNumberFormat']);

    /* if (enable_portal && !id) {
        errors.password = getError(
            password,
            ['requiredField'],
            { fieldName: 'Password' },
        );
    } */

    return errors;
};
