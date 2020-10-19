import { getError } from "@/constants";

export const validate = (values) => {
    const errors = {};
    const { estimate_date, estimate_number, expiry_date, estimate_template_id, items, user_id } = values;

    errors.estimate_date = getError(estimate_date, ['required']);
    errors.expiry_date = getError(expiry_date, ['required']);

    errors.estimate_number = getError(estimate_number, ['requiredField', 'isNumberFormat']);

    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
        { fieldName: 'Customer' },
    );

    errors.estimate_template_id = getError(
        estimate_template_id,
        ['requiredField'],
        { fieldName: 'Template' },
    );


    return errors;
};
