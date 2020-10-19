import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {
    saveIdToken,
    authTriggerSpinner,
    setBootstrap,
    getBootstrap,
    setGlobalBootstrap,
    globalTriggerSpinner,
    setAppVersion,
    saveEndpointApi
} from '../actions'
import {
    LOGIN,
    SOCIAL_LOGIN,
    SEND_FORGOT_PASSWORD_MAIL,
    GET_BOOTSTRAP,
    // Endpoint Api URL
    LOGIN_URL,
    GET_BOOTSTRAP_URL,
    SEND_RECOVERY_MAIL_URL,
    GET_APP_VERSION_URL,
    CHECK_ENDPOINT_API,
    PING_ENDPOINT_URL
} from '../constants'
import { ROUTES } from '@/navigation';
import { setAccountInformation } from '../../settings/actions'
import { alertMe } from '@/constants';
import { GET_APP_VERSION } from '@/constants'
import Request from '@/api/request'
import { getTitleByLanguage } from '@/utils';

// Login
// -----------------------------------------
function* login(payloadData) {
    const {
        payload: { params, navigation }
    } = payloadData

    yield put(authTriggerSpinner({ loginLoading: true }))

    try {
        const options = {
            path: LOGIN_URL(),
            body: params,
            isAuthRequired: false
        }

        const response = yield call([Request, 'post'], options)

        if (response.status == 401) {
            alertMe({ desc: getTitleByLanguage('login.invalid') })
            return
        }

        if (response?.token) {
            yield put(saveIdToken({ idToken: response.token, expiresIn: null }))
            yield put(getBootstrap())
            navigation.navigate(ROUTES.MAIN_INVOICES)
        }
    } catch (error) {
        yield put(authTriggerSpinner({ loginLoading: false }))
        alertMe({ desc: getTitleByLanguage('login.invalid') })
    } finally {
        yield put(authTriggerSpinner({ loginLoading: false }))
    }
}

function* socialLogin(payloadData) {
    const {
        payload: { idToken }
    } = payloadData

    try {
        yield put(authTriggerSpinner({ socialLoginLoading: true }))

        if (idToken) {
            getBootstrap()
            yield put(saveIdToken({ idToken }))
            navigation.navigate(ROUTES.MAIN_INVOICES)
        }
    } catch (error) {
        // console.log(error)
    } finally {
        yield put(authTriggerSpinner({ socialLoginLoading: false }))
    }
}

function* getBootstrapData(payloadData) {
    const { payload } = payloadData

    try {
        yield put(authTriggerSpinner({ getBootstrapLoginLoading: true }))
        yield put(globalTriggerSpinner({ appLoginLoading: true }))

        const options = {
            path: GET_BOOTSTRAP_URL()
        }

        const response = yield call([Request, 'get'], options)

        const { user } = response

        yield put(setAccountInformation({ account: user }))

        yield put(setGlobalBootstrap(response))

    } catch (error) {
        yield put(globalTriggerSpinner({ appLoginLoading: false }))
    } finally {
        yield put(authTriggerSpinner({ getBootstrapLoginLoading: false }))
        yield put(globalTriggerSpinner({ appLoginLoading: false }))
    }
}

function* getAppVersion(payloadData) {
    const {
        payload: { onResult }
    } = payloadData

    try {
        yield put(globalTriggerSpinner({ appLoginLoading: true }))

        const options = {
            path: GET_APP_VERSION_URL(),
            isAuthRequired: false
        }

        const response = yield call([Request, 'get'], options)

        yield put(setAppVersion(response))

        onResult && onResult(response)
    } catch (error) {
        yield put(globalTriggerSpinner({ appLoginLoading: false }))
    } finally {
        yield put(globalTriggerSpinner({ appLoginLoading: false }))
    }
}

// Forget Password
function* sendRecoveryMail(payloadData) {
    const {
        payload: { email, onResult }
    } = payloadData

    yield put(authTriggerSpinner({ forgetPasswordLoading: true }))

    try {
        const options = {
            path: SEND_RECOVERY_MAIL_URL(),
            body: { email },
            isAuthRequired: false
        }

        const res = yield call([Request, 'post'], options)

        res.data
            ? onResult && onResult(res)
            : alertMe({ desc: getTitleByLanguage('forgot.emailSendError') })
    } catch (error) {
        yield put(authTriggerSpinner({ forgetPasswordLoading: false }))
        alertMe({ desc: getTitleByLanguage('forgot.emailSendError') })
    } finally {
        yield put(authTriggerSpinner({ forgetPasswordLoading: false }))
    }
}

function* checkEndpointApi(payloadData) {
    const {
        payload: { endpointURL, onResult }
    } = payloadData

    try {
        yield put(authTriggerSpinner({ pingEndpointLoading: true }))

        const options = {
            path: PING_ENDPOINT_URL(),
            isAuthRequired: false,
            isPing: `${endpointURL}/api/`
        }

        const response = yield call([Request, 'get'], options)

        let success = true
        if (response.success === 'crater-self-hosted') {
            yield put(saveEndpointApi({ endpointURL }))
        } else {
            success = false
        }

        onResult && onResult(success)
    } catch (error) {
        yield put(authTriggerSpinner({ pingEndpointLoading: false }))
        onResult && onResult(false)
    } finally {
        yield put(authTriggerSpinner({ pingEndpointLoading: false }))
    }
}

export default function* loginSaga() {
    yield takeEvery(LOGIN, login)
    yield takeEvery(SOCIAL_LOGIN, socialLogin)
    yield takeEvery(GET_BOOTSTRAP, getBootstrapData)
    yield takeEvery(SEND_FORGOT_PASSWORD_MAIL, sendRecoveryMail)
    yield takeEvery(GET_APP_VERSION, getAppVersion)
    yield takeEvery(CHECK_ENDPOINT_API, checkEndpointApi)
}
