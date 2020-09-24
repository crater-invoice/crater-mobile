import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { name, percent } = values;

    errors.name = getError(name, ['requiredField']);
    errors.percent = getError(
        percent,
        ['requiredField', 'isNumberFormat', 'maxNumberRequired', 'minNumberRequired'],
        options = { fieldName: 'Tax Percent', maxNumber: 100, minNumber: -1 }
    );

    return errors;
};
