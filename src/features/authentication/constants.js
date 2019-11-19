
//  Forms
// -----------------------------------------
export const LOGIN_FORM = 'auth/LOGIN_FORM';
export const FORGOT_PASSWORD_FORM = 'auth/FORGOT_PASSWORD_FORM';
export const SET_ENDPOINT_API = 'auth/SET_ENDPOINT_API';

// Actions
// -----------------------------------------
export const LOGIN = 'auth/LOGIN';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const SAVE_ID_TOKEN = 'auth/SAVE_ID_TOKEN';
export const SOCIAL_LOGIN = 'auth/SOCIAL_LOGIN';
export const AUTH_TRIGGER_SPINNER = 'auth/AUTH_TRIGGER_SPINNER';
export const SEND_FORGOT_PASSWORD_MAIL = 'auth/SEND_FORGOT_PASSWORD_MAIL';
export const GET_BOOTSTRAP = 'auth/GET_BOOTSTRAP';
export const SET_BOOTSTRAP = 'auth/SET_BOOTSTRAP';
export const RESET_ID_TOKEN = 'auth/RESET_ID_TOKEN';

export const CHECK_ENDPOINT_API = 'url/CHECK_ENDPOINT_API';

// Endpoint Api URL
// -----------------------------------------

export const LOGIN_URL = () => 'auth/login'
export const GET_BOOTSTRAP_URL = () => 'bootstrap'
export const GET_APP_VERSION_URL = () => 'settings/app/version'
export const SEND_RECOVERY_MAIL_URL = () => 'auth/password/email'
export const PING_ENDPOINT_URL = () => `ping`
