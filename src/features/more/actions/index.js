import {
    MORE_TRIGGER_SPINNER,
    LOGOUT,
} from "../constants";

export const moreTriggerSpinner = (payload) => ({
    type: MORE_TRIGGER_SPINNER,
    payload,
});

export const logout = (payload) => ({
    type: LOGOUT,
    payload,
});
