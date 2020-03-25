
import { getError } from "../../../../api/validation";
import { CUSTOM_FIELDS as FIELDS, DATA_TYPE_OPTION_VALUE as OPTION_VALUE } from "../../constants";
import { hasObjectLength } from "../../../../api/global";

export const validate = (values) => {
    const errors = { [FIELDS.FIELD]: {} };

    if (values && hasObjectLength(values[FIELDS.FIELD])) {
        errors[FIELDS.FIELD][FIELDS.NAME] = getError(
            values[FIELDS.FIELD][FIELDS.NAME],
            ['requiredField']
        );

        errors[FIELDS.FIELD][FIELDS.TYPE] = getError(
            values[FIELDS.FIELD][FIELDS.TYPE],
            ['requiredField']
        );

        if (values[FIELDS.FIELD][FIELDS.TYPE] === OPTION_VALUE.EMAIL) {
            if (values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE]) {
                errors[FIELDS.FIELD][FIELDS.DEFAULT_VALUE] = getError(
                    values[FIELDS.FIELD][FIELDS.DEFAULT_VALUE],
                    ['emailFormat']
                );
            }
        }
    }

    return errors;
};
