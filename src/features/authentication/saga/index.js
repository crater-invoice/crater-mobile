import { call, put, takeLatest } from 'redux-saga/effects';
import {
    saveIdToken,
    authTriggerSpinner,
    getBootstrap,
    setGlobalBootstrap,
    setAppVersion,
    saveEndpointApi
} from '../actions';
import * as TYPES from '../constants';
import { resetNavigation, ROUTES } from '@/navigation';
import { setAccountInformation } from '../../settings/actions';
import { alertMe } from '@/constants';
import { GET_APP_VERSION } from '@/constants';
import Request from '@/api/request';
import { getTitleByLanguage, setI18nManagerValue } from '@/utils';

// Login
// -----------------------------------------
function* login({ payload: { params, navigation } }: any) {
    yield put(authTriggerSpinner({ loginLoading: true }));

    try {
        const options = {
            path: 'auth/login',
            body: params,
            isAuthRequired: false
        };

        const response = yield call([Request, 'post'], options);

        if (response?.status == 401) {
            alertMe({ desc: getTitleByLanguage('login.invalid') });
            return;
        }

        if (!response?.token) {
            alertMe({ desc: getTitleByLanguage('login.invalid') });
            return;
        }

        yield put(saveIdToken({ idToken: response.token, expiresIn: null }));
        yield put(getBootstrap());

        resetNavigation({
            navigation,
            route: ROUTES.MAIN_TABS,
            index: 0
        });
    } catch (e) {
        yield put(authTriggerSpinner({ loginLoading: false }));
        alertMe({ desc: getTitleByLanguage('login.invalid') });
    } finally {
        yield put(authTriggerSpinner({ loginLoading: false }));
    }
}

function* socialLogin({ payload: { idToken, navigation } }: any) {
    try {
        yield put(authTriggerSpinner({ socialLoginLoading: true }));

        if (idToken) {
            getBootstrap();
            yield put(saveIdToken({ idToken }));
            navigation.navigate(ROUTES.MAIN_INVOICES);
        }
    } catch (e) {
    } finally {
        yield put(authTriggerSpinner({ socialLoginLoading: false }));
    }
}

function* getBootstrapData(payloadData: any) {
    try {
        const options = { path: 'bootstrap' };

        const response = yield call([Request, 'get'], options);

        const { user, default_language = 'en' } = response;
        const isRTL = default_language === 'ar';
        setI18nManagerValue({ isRTL });

        yield put(setAccountInformation({ account: user }));

        yield put(setGlobalBootstrap(response));
    } catch (e) {}
}

function* getAppVersion({ payload: { onResult } }: any) {
    try {
        const options = {
            path: 'app/version',
            isAuthRequired: false
        };

        const response = yield call([Request, 'get'], options);

        yield put(setAppVersion(response));

        onResult?.(response);
    } catch (e) {}
}

// Forget Password
function* sendRecoveryMail({ payload: { email, onResult } }: any) {
    yield put(authTriggerSpinner({ forgetPasswordLoading: true }));

    try {
        const options = {
            path: 'auth/password/email',
            body: { email },
            isAuthRequired: false
        };

        const res = yield call([Request, 'post'], options);

        res.data
            ? onResult && onResult(res)
            : alertMe({ desc: getTitleByLanguage('forgot.emailSendError') });
    } catch (e) {
        yield put(authTriggerSpinner({ forgetPasswordLoading: false }));
        alertMe({ desc: getTitleByLanguage('forgot.emailSendError') });
    } finally {
        yield put(authTriggerSpinner({ forgetPasswordLoading: false }));
    }
}

function* checkEndpointApi({ payload: { endpointURL, onResult } }: any) {
    try {
        yield put(authTriggerSpinner({ pingEndpointLoading: true }));

        const options = {
            path: `ping`,
            isAuthRequired: false,
            isPing: `${endpointURL}/api/`
        };

        const response = yield call([Request, 'get'], options);

        let success = true;
        if (response.success === 'crater-self-hosted') {
            yield put(saveEndpointApi({ endpointURL }));
        } else {
            success = false;
        }

        onResult?.(success);
    } catch (e) {
        yield put(authTriggerSpinner({ pingEndpointLoading: false }));
        onResult?.(false);
    } finally {
        yield put(authTriggerSpinner({ pingEndpointLoading: false }));
    }
}

export default function* loginSaga() {
    yield takeLatest(TYPES.LOGIN, login);
    yield takeLatest(TYPES.SOCIAL_LOGIN, socialLogin);
    yield takeLatest(TYPES.GET_BOOTSTRAP, getBootstrapData);
    yield takeLatest(TYPES.SEND_FORGOT_PASSWORD_MAIL, sendRecoveryMail);
    yield takeLatest(TYPES.CHECK_ENDPOINT_API, checkEndpointApi);
    yield takeLatest(GET_APP_VERSION, getAppVersion);
}
