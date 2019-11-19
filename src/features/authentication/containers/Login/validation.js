import { getError } from "../../../../api/validation";

export const validate = (values) => {
    const errors = {};
    const { username, password } = values;

    errors.username = getError(username, ['required', 'emailFormat']);
    errors.password = getError(password, ['required']);

    return errors;
};
