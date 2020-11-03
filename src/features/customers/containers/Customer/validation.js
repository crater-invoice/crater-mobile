import { getError } from '@/constants';
import { CUSTOMER_FIELDS as FIELDS } from '../../constants';

export const validate = values => {
    const errors: any = { customer: {} };

    if (values) {
        errors['customer'][FIELDS.NAME] = getError(
            values?.['customer']?.[FIELDS.NAME],
            ['required']
        );

        if (values?.['customer']?.[FIELDS.EMAIL]) {
            errors['customer'][FIELDS.EMAIL] = getError(
                values?.['customer']?.[FIELDS.EMAIL],
                ['emailFormat']
            );
        }

        if (values?.['customer']?.[FIELDS.WEBSITE]) {
            errors['customer'][FIELDS.WEBSITE] = getError(
                values?.['customer']?.[FIELDS.WEBSITE],
                ['urlFormat']
            );
        }
    }

    return errors;
};
