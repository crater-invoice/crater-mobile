import { all, call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setCompanyInformation,
    setAccountInformation,
    setSettings,
    setCustomizeSettings
} from '../actions';

import {
    GET_COMPANY_INFO,
    EDIT_COMPANY_INFO,
    GET_ACCOUNT_INFO,
    EDIT_ACCOUNT_INFO,
    GET_SETTING_ITEM,
    EDIT_SETTING_ITEM,
    GET_CUSTOMIZE_SETTINGS,
    EDIT_CUSTOMIZE_SETTINGS,
    COMPANY_SETTINGS_TYPE,
    // Endpoint Api URL
    GET_COMPANY_URL,
    EDIT_COMPANY_URL,
    GET_ACCOUNT_URL,
    EDIT_ACCOUNT_URL,
    GET_GENERAL_SETTING_URL,
    EDIT_GENERAL_SETTING_URL,
    EDIT_ACCOUNT_AVATAR_URL,
    UPLOAD_LOGO_URL,
    GET_CUSTOMIZE_SETTINGS_URL,
    EDIT_CUSTOMIZE_SETTINGS_URL,
    NOTIFICATION_MAIL_TYPE
} from '../constants';

import { ROUTES } from '@/navigation';

import categories from './categories';
import taxes from './taxes';
import modes from './modes';
import units from './units';
import currencies from './currencies';
import customFields from './custom-fields';
import Request from '@/api/request';
import preferences from './preferences';
import General from './general';
import Notes from './notes';

/**
 * Company Information.
 */
function* getCompanyInformation(payloadData) {
    const {
        payload: { onResult }
    } = payloadData;

    yield put(settingsTriggerSpinner({ getCompanyInfoLoading: true }));

    try {
        const options = {
            path: GET_COMPANY_URL()
        };

        const response = yield call([Request, 'get'], options);

        yield put(setCompanyInformation({ company: response.user.company }));

        onResult && onResult(response.user);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getCompanyInfoLoading: false }));
    }
}

function* editCompanyInformation(payloadData) {
    const {
        payload: { params, navigation, logo }
    } = payloadData;

    yield put(settingsTriggerSpinner({ editCompanyInfoLoading: true }));

    try {
        const options = {
            path: EDIT_COMPANY_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (logo) {
            const options2 = {
                path: UPLOAD_LOGO_URL(),
                image: logo,
                imageName: 'company_logo'
            };

            yield call([Request, 'post'], options2);
        }

        yield put(setCompanyInformation({ company: response.company }));

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ editCompanyInfoLoading: false }));
    }
}

function* getAccountInformation(payloadData) {
    const {
        payload: { onResult }
    } = payloadData;

    yield put(settingsTriggerSpinner({ getAccountInfoLoading: true }));

    try {
        const options = {
            path: GET_ACCOUNT_URL()
        };

        const response = yield call([Request, 'get'], options);

        yield put(setAccountInformation({ account: response.user }));

        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getAccountInfoLoading: false }));
    }
}

function* editAccountInformation(payloadData) {
    const {
        payload: { params, navigation, avatar }
    } = payloadData;

    yield put(settingsTriggerSpinner({ editAccountInfoLoading: true }));

    try {
        const options = {
            path: EDIT_ACCOUNT_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield put(setAccountInformation({ account: response.user }));

        if (avatar) {
            const options2 = {
                path: EDIT_ACCOUNT_AVATAR_URL(),
                image: avatar,
                imageName: 'admin_avatar'
            };

            yield call([Request, 'post'], options2);
        }

        navigation.goBack(null);
    } catch (error) {
    } finally {
        yield put(settingsTriggerSpinner({ editAccountInfoLoading: false }));
    }
}

/**
 * App Settings
 * -----------------------------------------
 */
function* getSettingItem(payloadData) {
    const {
        payload: { onResult = null }
    } = payloadData;

    yield put(settingsTriggerSpinner({ getSettingItemLoading: true }));

    try {
        const options = {
            path: GET_GENERAL_SETTING_URL(),
            axiosProps: {
                params: { settings: NOTIFICATION_MAIL_TYPE }
            }
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getSettingItemLoading: false }));
    }
}

function* editSettingItem(payloadData) {
    const {
        payload: {
            params,
            navigation = null,
            onResult = null,
            hasCustomize = false
        }
    } = payloadData;

    yield put(settingsTriggerSpinner({ editSettingItemLoading: true }));

    try {
        const options = {
            path: EDIT_GENERAL_SETTING_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            if (!hasCustomize) {
                yield put(setSettings({ settings: params }));
            }
            onResult && onResult();
        }

        if (navigation) navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ editSettingItemLoading: false }));
    }
}

/**
 * Customize Settings
 */
function* getCustomizeSettings(payloadData) {
    yield put(settingsTriggerSpinner({ getCustomizeLoading: true }));

    try {
        const options = {
            path: GET_CUSTOMIZE_SETTINGS_URL(),
            axiosProps: {
                params: { settings: COMPANY_SETTINGS_TYPE }
            }
        };
        const response = yield call([Request, 'get'], options);
        yield put(setCustomizeSettings({ customizes: response }));
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getCustomizeLoading: false }));
    }
}

function* editCustomizeSettings({ payload: { params, navigation } }) {
    yield put(settingsTriggerSpinner({ customizeLoading: true }));

    try {
        const settings = {
            settings: params
        };
        const options = {
            path: EDIT_CUSTOMIZE_SETTINGS_URL(),
            body: settings
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOMIZES);
            yield put(setCustomizeSettings({ customizes: null }));
        }
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ customizeLoading: false }));
    }
}

export default function* settingsSaga() {
    yield takeEvery(GET_COMPANY_INFO, getCompanyInformation);
    yield takeEvery(EDIT_COMPANY_INFO, editCompanyInformation);
    yield takeEvery(GET_ACCOUNT_INFO, getAccountInformation);
    yield takeEvery(EDIT_ACCOUNT_INFO, editAccountInformation);
    yield takeEvery(GET_SETTING_ITEM, getSettingItem);
    yield takeEvery(EDIT_SETTING_ITEM, editSettingItem);

    // Customize
    // -----------------------------------------
    yield takeEvery(GET_CUSTOMIZE_SETTINGS, getCustomizeSettings);
    yield takeEvery(EDIT_CUSTOMIZE_SETTINGS, editCustomizeSettings);

    yield all([
        categories(),
        taxes(),
        modes(),
        units(),
        currencies(),
        customFields(),
        preferences(),
        General(),
        Notes()
    ]);
}
