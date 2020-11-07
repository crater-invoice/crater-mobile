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

function* editPreferences({ payload: { params, navigation } }) {
    yield put(spinner({ editPreferencesLoading: true }));

    try {
        const options = {
            path: `company/settings`,
            body: { settings: params }
        };

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
