import { validateCustomField } from '@/components/CustomField/validation';
import { getError, isEmpty } from '@/constants';

export const validate = values => {
    const errors = {};
    const {
        invoice_date,
        invoice_number,
        due_date,
        user_id,
        items,
        template_name
    } = values;

    errors.invoice_date = getError(invoice_date, ['required']);
    errors.due_date = getError(due_date, ['required']);

    errors.invoice_number = getError(invoice_number, [
        'requiredField',
        'isNumberFormat'
    ]);
    errors.items = getError(items, ['requiredCheckArray']);

    errors.user_id = getError(user_id, ['requiredField']);

    errors.template_name = getError(template_name, ['requiredField']);

    const fieldErrors = validateCustomField(values?.customFields);
    !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);

    return errors;
};
