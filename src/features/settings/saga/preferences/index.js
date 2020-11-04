import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    settingsTriggerSpinner,
    setPreferences,
    setSettings
} from '../../actions';
import {
    GET_PREFERENCES,
    EDIT_PREFERENCES,
    GET_PREFERENCES_URL,
    PREFERENCES_SETTING_TYPE,
    EDIT_PREFERENCES_URL
} from '../../constants';

function* getPreferences({ payload: { onResult } }) {
    yield put(settingsTriggerSpinner({ getPreferencesLoading: true }));

    try {
        const options = {
            path: GET_PREFERENCES_URL(),
            axiosProps: {
                params: { settings: PREFERENCES_SETTING_TYPE }
            }
        };

        const response = yield call([Request, 'get'], options);

        yield put(setPreferences({ preferences: response }));
        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getPreferencesLoading: false }));
    }
}

function* editPreferences({ payload: { params, navigation } }) {
    yield put(settingsTriggerSpinner({ editPreferencesLoading: true }));

    try {
        const options = {
            path: EDIT_PREFERENCES_URL(),
            body: { settings: params }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(setSettings({ settings: params }));
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ editPreferencesLoading: false }));
    }
}

export default function* preferencesSaga() {
    yield takeEvery(GET_PREFERENCES, getPreferences);
    yield takeEvery(EDIT_PREFERENCES, editPreferences);
}
