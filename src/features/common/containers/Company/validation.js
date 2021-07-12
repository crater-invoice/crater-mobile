import { getError } from '@/constants';

export const validate = values => {
    const errors = {};
    const { name } = values;

    errors.name = getError(name, ['requiredField']);

    return errors;
};
