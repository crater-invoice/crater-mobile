import { getError } from "@/constants";


export const validate = (values) => {
    const errors = {};
    const { name, code, symbol, precision, thousand_separator, decimal_separator } = values;

    errors.name = getError(
        name,
        ['requiredField'],
    );
    errors.code = getError(
        code,
        ['requiredField'],
    );
    errors.symbol = getError(
        symbol,
        ['requiredField'],
    );
    errors.precision = getError(
        precision,
        ['requiredField', 'isNumberFormat'],
    );
    errors.thousand_separator = getError(
        thousand_separator,
        ['requiredField'],
    );
    errors.decimal_separator = getError(
        decimal_separator,
        ['requiredField'],
    );

    return errors;
};
