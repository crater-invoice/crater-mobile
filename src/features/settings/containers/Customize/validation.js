
// @flow
import { getError } from "../../../../api/validation";

export const validate = (values) => {
    const errors = {};
    const {
        invoice_prefix,
        estimate_prefix,
        payment_prefix
    } = values;


    errors.invoice_prefix = getError(
        invoice_prefix,
        ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
        options = { maxCharacter: 5 }
    );

    errors.estimate_prefix = getError(
        estimate_prefix,
        ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
        options = { maxCharacter: 5 }
    );

    errors.payment_prefix = getError(
        payment_prefix,
        ['requiredField', 'maxCharacterRequired', 'characterOnlyRequired'],
        options = { maxCharacter: 5 }
    );

    return errors;
};
