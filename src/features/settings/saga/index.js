import { all, call, put, takeEvery } from 'redux-saga/effects';
import {
    settingsTriggerSpinner as spinner,
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
    NOTIFICATION_MAIL_TYPE
} from '../constants';
import { ROUTES } from '@/navigation';

import categories from './categories';
import taxes from './taxes';
import modes from './modes';
import units from './units';
import currencies from './currencies';
import customFields, { getCustomFields } from './custom-fields';
import Request from '@/api/request';
import preferences from './preferences';
import General from './general';
import Notes from './notes';

/**
 * Company Information.
 */
function* getCompanyInformation({ payload: { onResult } }) {
    yield put(spinner({ getCompanyInfoLoading: true }));
    try {
        // const options = { path: `me` };

        // const response = yield call([Request, 'get'], options);
        const options = { path: `current-company` };

        const response = yield call([Request, 'get'], options);
        yield put(setCompanyInformation({ company: response.data }));

        onResult?.(response.data);
    } catch (e) {
    } finally {
        yield put(spinner({ getCompanyInfoLoading: false }));
    }
}

function* editCompanyInformation({ payload }) {
    const { params, navigation, logo } = payload;

    yield put(spinner({ editCompanyInfoLoading: true }));

    try {
        const options = {
            path: `company`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (logo) {
            const options2 = {
                path: `company/upload-logo`,
                image: logo,
                imageName: 'company_logo'
            };

            yield call([Request, 'post'], options2);
        }

        yield put(setCompanyInformation({ company: response.company }));

        navigation?.goBack?.(null);
    } catch (e) {
    } finally {
        yield put(spinner({ editCompanyInfoLoading: false }));
    }
}

function* getAccountInformation({ payload: { onResult } }) {
    yield put(spinner({ getAccountInfoLoading: true }));
    try {
        const options = { path: `me` };

        const response = yield call([Request, 'get'], options);

        yield put(setAccountInformation({ account: response.data }));

        onResult?.(response.data);
    } catch (e) {
    } finally {
        yield put(spinner({ getAccountInfoLoading: false }));
    }
}

function* editAccountInformation({ payload }) {
    const { params, navigation, avatar } = payload;

    yield put(spinner({ editAccountInfoLoading: true }));

    try {
        const options = {
            path: `me`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield put(setAccountInformation({ account: response.data }));

        if (avatar) {
            const options2 = {
                path: `me/upload-avatar`,
                image: avatar,
                imageName: 'admin_avatar'
            };

            yield call([Request, 'post'], options2);
        }

        navigation?.goBack?.(null);
    } catch (error) {
    } finally {
        yield put(spinner({ editAccountInfoLoading: false }));
    }
}

/**
 * App Settings
 * -----------------------------------------
 */
function* getSettingItem({ payload: { onResult = null } }) {
    yield put(spinner({ getSettingItemLoading: true }));

    try {
        const options = {
            path: `company/settings`,
            axiosProps: {
                params: { settings: NOTIFICATION_MAIL_TYPE }
            }
        };

        const response = yield call([Request, 'get'], options);
        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(spinner({ getSettingItemLoading: false }));
    }
}

function* editSettingItem({ payload }) {
    const {
        params,
        navigation = null,
        onResult = null,
        hasCustomize = false
    } = payload;

    yield put(spinner({ editSettingItemLoading: true }));

    try {
        const options = {
            path: `company/settings`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            if (!hasCustomize) {
                yield put(setSettings({ settings: params }));
            }
            onResult?.();
        }

        if (navigation) navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(spinner({ editSettingItemLoading: false }));
    }
}

/**
 * Customize Settings
 */
function* getCustomizeSettings(payloadData) {
    yield put(spinner({ getCustomizeLoading: true }));

    try {
        yield call(getCustomFields, {
            payload: {
                queryString: { limit: 'all' }
            }
        });

        const options = {
            path: `company/settings`,
            axiosProps: {
                params: { settings: COMPANY_SETTINGS_TYPE }
            }
        };
        const response = yield call([Request, 'get'], options);
        yield put(setCustomizeSettings({ customizes: response }));
    } catch (e) {
    } finally {
        yield put(spinner({ getCustomizeLoading: false }));
    }
}

function* editCustomizeSettings({ payload: { params, navigation } }) {
    yield put(spinner({ customizeLoading: true }));

    try {
        const settings = {
            settings: params
        };
        const options = {
            path: `company/settings`,
            body: settings
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOMIZES);
            yield put(setCustomizeSettings({ customizes: null }));
        }
    } catch (e) {
    } finally {
        yield put(spinner({ customizeLoading: false }));
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
