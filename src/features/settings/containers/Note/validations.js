import { getError } from '@/constants';

export const validate = values => {
    const errors = {};
    const { name, type, notes } = values;

    errors.name = getError(name, ['required']);
    errors.type = getError(type, ['required']);
    errors.notes = getError(notes, ['required']);

    return errors;
};
