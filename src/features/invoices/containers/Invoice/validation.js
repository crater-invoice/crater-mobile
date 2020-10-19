import { getError } from "@/constants";

export const validate = (values) => {
    const errors = {};
    const { invoice_date, invoice_number, due_date, user_id, items, invoice_template_id } = values;

    errors.invoice_date = getError(invoice_date, ['required']);
    errors.due_date = getError(due_date, ['required']);

    errors.invoice_number = getError(invoice_number, ['requiredField', 'isNumberFormat']);
    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
    );

    errors.invoice_template_id = getError(
        invoice_template_id,
        ['requiredField'],
    );

    return errors;
};
