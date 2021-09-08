import { validateCustomField } from '@/components/CustomField/validation';
import { getError, isEmpty } from '@/constants';
import { EXPENSE_FIELDS as FIELDS } from '../../constants';

export const validate = values => {
    const errors: any = { expense: {}, customFields: {} };

    if (values) {
        errors['expense'][FIELDS.DATE] = getError(
            values?.['expense']?.[FIELDS.DATE],
            ['requiredField']
        );

        errors['expense'][FIELDS.CATEGORY] = getError(
            values?.['expense']?.[FIELDS.CATEGORY],
            ['requiredField']
        );

        errors['expense'][FIELDS.AMOUNT] = getError(
            values?.['expense']?.[FIELDS.AMOUNT],
            ['requiredField', 'isNumberFormat']
        );

        const fieldErrors = validateCustomField(values?.customFields);
        !isEmpty(fieldErrors) && (errors.customFields = fieldErrors);
    }

    return errors;
};
