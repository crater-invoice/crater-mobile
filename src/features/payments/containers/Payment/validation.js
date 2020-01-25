import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        payment_date,
        payment_number,
        user_id,
        amount,
        due,
    } = values;

    errors.payment_date = getError(payment_date, ['required']);
    errors.payment_number = getError(payment_number, ['required', 'isNumberFormat']);

    errors.user_id = getError(
        user_id,
        ['requiredField'],
    );

    errors.amount = getError(
        amount,
        ['requiredField', 'isNumberFormat'],
    );

    if (amount > due)
        errors.amount = getError(
            amount,
            ['moreThanDue'],
        );

    return errors;
};
