import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const {
        name,
        quantity,
        discount_type,
        price,
        discount,
    } = values;

    errors.name = getError(name, ['requiredField']);

    errors.quantity = getError(
        quantity,
        ['minNumberRequired'],
        options = { fieldName: 'quantity', minNumber: 0 }
    );

    errors.price = getError(
        price,
        ['minNumberRequired', 'isNumberFormat'],
        options = { fieldName: 'price', minNumber: 0 }
    );

    if (discount_type !== 'none') {
        errors.discount = getError(
            discount,
            ['minNumberRequired'],
            options = { fieldName: 'discount', minNumber: 0 }
        );
    }

    errors.discount_type = getError(discount_type, ['required']);

    return errors;
};
