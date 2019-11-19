import { getError } from "../../../../api/validation";

export const validate = (values) => {
    const errors = {};
    const { email } = values;

    errors.email = getError(email, ['required', 'emailFormat']);

    return errors;
};
