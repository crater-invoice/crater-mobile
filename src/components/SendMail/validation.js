import { getError } from "@/constants";

// @flow

export const validate = (values) => {
    const errors = {};
    const { from, to, subject, message } = values;

    errors.from = getError(from, ['requiredField', 'emailFormat']);
    errors.to = getError(to, ['requiredField', 'emailFormat']);

    errors.subject = getError(
        subject,
        ['requiredField'],
    );

    return errors;
};
