import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    settingsTriggerSpinner as spinner,
    setPreferences,
    setSettings
} from '../../actions';
import {
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    PREFERENCES_SETTING_TYPE
} from '../../constants';
import { I18nManager } from 'react-native';
import { Updates } from 'expo';

function* getPreferences({ payload: { onResult } }) {
    yield put(spinner({ getPreferencesLoading: true }));

    try {
        const options = {
            path: `company/settings`,
            axiosProps: {
                params: { settings: PREFERENCES_SETTING_TYPE }
            }
        };

        const response = yield call([Request, 'get'], options);

        yield put(setPreferences({ preferences: response }));
        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(spinner({ getPreferencesLoading: false }));
    }
}

function* editPreferences({ payload: { params, navigation, locale = 'en' } }) {
    yield put(spinner({ editPreferencesLoading: true }));

    try {
        const options = {
            path: `company/settings`,
            body: { settings: params }
        };

        if (params?.language) {
            const options = {
                path: `me/settings`,
                body: { settings: { language: params?.language } }
            };
            const res = yield call([Request, 'put'], options);

            if (res.success) {
                const isRTL = params.language === 'ar';
                I18nManager.forceRTL(isRTL);
                I18nManager.allowRTL(isRTL);
                if (locale === 'ar' || isRTL) {
                    Updates.reload();
                }
            }
        }

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(setSettings({ settings: params }));
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(spinner({ editPreferencesLoading: false }));
    }
}

export default function* preferencesSaga() {
    yield takeEvery(GET_PREFERENCES, getPreferences);
    yield takeEvery(EDIT_PREFERENCES, editPreferences);
}
