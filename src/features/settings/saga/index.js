import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setCompanyInformation,
    setAccountInformation,
    setPreferences,
    setSettings,
    setCustomizeSettings,
} from '../actions';

import {
    GET_COMPANY_INFO,
    EDIT_COMPANY_INFO,
    GET_ACCOUNT_INFO,
    EDIT_ACCOUNT_INFO,
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    GET_SETTING_ITEM,
    EDIT_SETTING_ITEM,
    GET_CUSTOMIZE_SETTINGS,
    EDIT_CUSTOMIZE_SETTINGS,
    // Endpoint Api URL
    GET_COMPANY_URL,
    EDIT_COMPANY_URL,
    GET_ACCOUNT_URL,
    EDIT_ACCOUNT_URL,
    GET_PREFERENCES_URL,
    GET_GENERAL_SETTING_URL,
    EDIT_PREFERENCES_URL,
    EDIT_GENERAL_SETTING_URL,
    EDIT_ACCOUNT_AVATAR_URL,
    UPLOAD_LOGO_URL,
    GET_CUSTOMIZE_SETTINGS_URL,
    EDIT_CUSTOMIZE_SETTINGS_URL,
} from '../constants';

import Request from '../../../api/request';
import { ROUTES } from '../../../navigation/routes';

import modes from './modes';
import units from './units';

/**
 * Company Information.
 */
function* getCompanyInformation(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getCompanyInfoLoading: true }));

    try {

        const options = {
            path: GET_COMPANY_URL(),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.user)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getCompanyInfoLoading: false }));
    }
}

function* editCompanyInformation(payloadData) {
    const {
        payload: { params, navigation, logo },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editCompanyInfoLoading: true }));

    try {

        const options = {
            path: EDIT_COMPANY_URL(),
            body: params,
        };

        const response = yield call([Request, 'post'], options);

        if (logo) {
            const options2 = {
                path: UPLOAD_LOGO_URL(),
                image: logo,
                imageName: 'company_logo'
            }

            yield call([Request, 'post'], options2);
        }

        yield put(setCompanyInformation({ company: response.user.company }));

        navigation.goBack(null)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editCompanyInfoLoading: false }));
    }
}

function* getAccountInformation(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getAccountInfoLoading: true }));

    try {

        const options = {
            path: GET_ACCOUNT_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setAccountInformation({ account: response }));

        onResult && onResult(response)
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getAccountInfoLoading: false }));
    }
}

function* editAccountInformation(payloadData) {
    const {
        payload: { params, navigation, avatar },
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
            }

            yield call([Request, 'post'], options2);
        }

        navigation.goBack(null)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editAccountInfoLoading: false }));
    }
}

/**
 * App Settings
 * -----------------------------------------
 */
function* getPreferences(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getPreferencesLoading: true }));

    try {

        const options = {
            path: GET_PREFERENCES_URL(),
        };

        const response = yield call([Request, 'get'], options);
        yield put(setPreferences({ preferences: response }));
        onResult && onResult(response)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getPreferencesLoading: false }));
    }
}

function* getSettingItem(payloadData) {
    const {
        payload: { key, onResult = null },
    } = payloadData;

    yield put(settingsTriggerSpinner({ getSettingItemLoading: true }));

    try {

        const options = {
            path: GET_GENERAL_SETTING_URL(key),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response[key])

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getSettingItemLoading: false }));
    }
}

function* editPreferences(payloadData) {
    const {
        payload: { params, navigation, currencies },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editPreferencesLoading: true }));

    try {

        const options = {
            path: EDIT_PREFERENCES_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        if (response.success) {
            let newData = currencies.filter((item) => {
                let filterData = false
                if (item['id'].toString() === params.currency.toString())
                    filterData = true

                return filterData
            });

            yield put(setSettings({
                settings: params,
                currency: newData.length !== 0 ? newData[0] : []
            }));
            navigation.goBack(null)
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editPreferencesLoading: false }));
    }
}

function* editSettingItem(payloadData) {
    const {
        payload: {
            params,
            navigation = null,
            onResult = null,
            hasCustomize = false
        },
    } = payloadData;

    yield put(settingsTriggerSpinner({ editSettingItemLoading: true }));

    try {

        const options = {
            path: EDIT_GENERAL_SETTING_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            if (!hasCustomize) {
                yield put(setSettings({ settings: params }));
            }
            onResult && onResult()
        }

        if (navigation)
            navigation.goBack(null)

    } catch (error) {
        // console.log(error);
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
        };

        const response = yield call([Request, 'get'], options);
        yield put(setCustomizeSettings({ customizes: response }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getCustomizeLoading: false }));
    }
}


function* editCustomizeSettings({ payload: { params, navigation } }) {

    yield put(settingsTriggerSpinner({ customizeLoading: true }));

    try {
        const options = {
            path: EDIT_CUSTOMIZE_SETTINGS_URL(),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOMIZES)
            yield put(setCustomizeSettings({ customizes: null }));
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ customizeLoading: false }));
    }
}


export default function* settingsSaga() {
    yield takeEvery(GET_COMPANY_INFO, getCompanyInformation);
    yield takeEvery(EDIT_COMPANY_INFO, editCompanyInformation);
    yield takeEvery(GET_ACCOUNT_INFO, getAccountInformation);
    yield takeEvery(EDIT_ACCOUNT_INFO, editAccountInformation);
    yield takeEvery(GET_PREFERENCES, getPreferences);
    yield takeEvery(GET_SETTING_ITEM, getSettingItem);
    yield takeEvery(EDIT_PREFERENCES, editPreferences);
    yield takeEvery(EDIT_SETTING_ITEM, editSettingItem);

    // Customize
    // -----------------------------------------
    yield takeEvery(GET_CUSTOMIZE_SETTINGS, getCustomizeSettings);
    yield takeEvery(EDIT_CUSTOMIZE_SETTINGS, editCustomizeSettings);

    yield all([
        modes(),
        units()
    ]);
}
