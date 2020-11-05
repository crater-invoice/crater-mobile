import { getError } from "@/constants";

export const validate = (values) => {
    const errors = {};
    const { name, type, notes } = values;

    errors.name = getError(
        name,
        ['requiredField'],
        { fieldName: 'Name' },
    );
    errors.type = getError(
        type,
        ['requiredField'],
        { fieldName: 'Type' },
    );
    errors.notes = getError(
        notes,
        ['requiredField'],
        { fieldName: 'Notes' },
    );

    return errors;
};
