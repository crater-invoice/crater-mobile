import { getError } from "../../../../api/validation";

// @flow


export const validate = (values) => {
    const errors = {};
    const { notification_email } = values;

    if (notification_email) {
        errors.notification_email = getError(
            notification_email,
            ['emailFormat']
        );
    }

    return errors;
};
