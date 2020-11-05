import { getError } from '@/constants';

// @flow

export const validate = values => {
    const errors = {};
    const { from, to, subject, body } = values;

    errors.from = getError(from, ['required', 'emailFormat']);
    errors.to = getError(to, ['required', 'emailFormat']);

    errors.subject = getError(subject, ['requiredField']);

    errors.body = getError(body, ['requiredField']);

    return errors;
};
