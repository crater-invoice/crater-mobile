// @flow
import { ILoginPayload } from './types';
import {
    LOGIN,
    LOGIN_SUCCESS,
    SOCIAL_LOGIN,
    SAVE_ID_TOKEN,
    AUTH_TRIGGER_SPINNER,
    SEND_FORGOT_PASSWORD_MAIL,
    GET_BOOTSTRAP,
    SET_BOOTSTRAP,
    RESET_ID_TOKEN,
    CHECK_ENDPOINT_API,
    RESET_AUTH_LOADERS,
} from '../constants';
import {
    SET_GLOBAL_BOOTSTRAP,
    GLOBAL_TRIGGER_SPINNER,
    SAVE_ENDPOINT_API,
    GET_APP_VERSION,
    SET_APP_VERSION
 } from '@/constants';

export const login = (payload: ILoginPayload) => ({
    type: LOGIN,
    payload,
});

export const socialLogin = (payload) => ({
    type: SOCIAL_LOGIN,
    payload,
});

export const loginSuccess = ({ idToken }) => ({
    type: LOGIN_SUCCESS,
    payload: { idToken },
});

export const saveIdToken = (payload = {}) => ({
    type: SAVE_ID_TOKEN,
    payload,
});

export const resetIdToken = () => ({
    type: RESET_ID_TOKEN,
});

export const authTriggerSpinner = (payload) => ({
    type: AUTH_TRIGGER_SPINNER,
    payload,
});

export const resetAuthLoaders = (payload) => ({
    type: RESET_AUTH_LOADERS,
    payload
})

export const sendForgotPasswordMail = (payload) => ({
    type: SEND_FORGOT_PASSWORD_MAIL,
    payload,
});

export const getBootstrap = (payload) => ({
    type: GET_BOOTSTRAP,
    payload,
});

export const getAppVersion = (payload) => ({
    type: GET_APP_VERSION,
    payload,
});

export const setBootstrap = (payload) => ({
    type: SET_BOOTSTRAP,
    payload,
});

export const setAppVersion = (payload) => ({
    type: SET_APP_VERSION,
    payload,
});

//  Global settings
export const setGlobalBootstrap = (payload = {}) => ({
    type: SET_GLOBAL_BOOTSTRAP,
    payload,
});

export const globalTriggerSpinner = (payload = {}) => ({
    type: GLOBAL_TRIGGER_SPINNER,
    payload,
});

export const saveEndpointApi = (payload) => ({
    type: SAVE_ENDPOINT_API,
    payload,
});

export const checkEndpointApi = (payload = {}) => ({
    type: CHECK_ENDPOINT_API,
    payload,
});


