import { getError } from "@/constants";

export const validate = (values) => {
    const errors = {};
    const { name } = values;

    errors.name = getError(
        name,
        ['requiredField'],
        { fieldName: 'Name' },
    );
    errors.type = getError(
        name,
        ['requiredField'],
        { fieldName: 'Type' },
    );
    errors.notes = getError(
        name,
        ['requiredField'],
        { fieldName: 'Notes' },
    );

    return errors;
};
