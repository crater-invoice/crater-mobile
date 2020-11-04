import { getError } from '@/constants';
import { EXPENSE_FIELDS as FIELDS } from '../../constants';

export const validate = values => {
    const errors: any = { expense: {} };

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
    }

    return errors;
};
