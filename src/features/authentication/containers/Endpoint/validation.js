import { getError } from "@/constants";

export const validate = (values) => {
    const errors = {};
    const { endpointURL } = values;

    errors.endpointURL = getError(endpointURL, ['requiredField', 'urlFormat']);

    return errors;
};
