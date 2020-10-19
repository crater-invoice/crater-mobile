import { call, put, takeEvery, delay } from 'redux-saga/effects';
import { settingsTriggerSpinner, setCustomFields } from '../../actions';
import {
    GET_CUSTOM_FIELDS,
    CREATE_CUSTOM_FIELD,
    EDIT_CUSTOM_FIELD,
    REMOVE_CUSTOM_FIELD,
    GET_CUSTOM_FIELD,
    // Endpoint Api URL
    GET_CUSTOM_FIELDS_URL,
    CREATE_CUSTOM_FIELD_URL,
    GET_CUSTOM_FIELD_URL,
    EDIT_CUSTOM_FIELD_URL,
    REMOVE_CUSTOM_FIELD_URL
} from '../../constants';
import Request from '@/api/request';
import { hasValue, alertMe } from '@/constants';
import { ROUTES } from '@/navigation';
import { getTitleByLanguage } from '@/utils';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('name')) {
        alertMe({
            desc: getTitleByLanguage('alert.alreadyInUse', '"Name"')
        });
        return true;
    }
};

function* getCustomFields({ payload: { type = null, onResult = null } }) {
    yield put(settingsTriggerSpinner({ customFieldsLoading: true }));

    try {
        const options = {
            path: GET_CUSTOM_FIELDS_URL(type)
        };

        const response = yield call([Request, 'get'], options);

        if (response.customFields) {
            yield put(setCustomFields({ customFields: response.customFields }));
            onResult?.(response.customFields);
        }
    } catch (error) {
        console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ customFieldsLoading: false }));
    }
}

function* createCustomField({ payload: { params, navigation } }) {
    yield put(settingsTriggerSpinner({ customFieldLoading: true }));

    try {
        const options = {
            path: CREATE_CUSTOM_FIELD_URL,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOM_FIELDS);
            yield call(getCustomFields, { payload: {} });
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(settingsTriggerSpinner({ customFieldLoading: false }));
    }
}

function* getCustomField({ payload: { id, onResult = null } }) {
    yield put(settingsTriggerSpinner({ getCustomFieldLoading: true }));

    try {
        const options = {
            path: GET_CUSTOM_FIELD_URL(id)
        };

        const response = yield call([Request, 'get'], options);

        if (response.customField) {
            onResult?.(response.customField);
        }
    } catch (error) {
        console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getCustomFieldLoading: false }));
    }
}

function* editCustomField({ payload: { id, params, navigation } }) {
    yield put(settingsTriggerSpinner({ customFieldLoading: true }));

    try {
        const options = {
            path: EDIT_CUSTOM_FIELD_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOM_FIELDS);
            yield call(getCustomFields, { payload: {} });
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(settingsTriggerSpinner({ customFieldLoading: false }));
    }
}

function* removeCustomField({ payload: { id, navigation } }) {
    yield put(settingsTriggerSpinner({ removeCustomFieldLoading: true }));

    try {
        const options = {
            path: REMOVE_CUSTOM_FIELD_URL(id)
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CUSTOM_FIELDS);
            yield call(getCustomFields, { payload: {} });
        }
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ removeCustomFieldLoading: false }));
    }
}

export default function* customFieldsSaga() {
    // Custom Fields
    // -----------------------------------------
    yield takeEvery(GET_CUSTOM_FIELDS, getCustomFields);
    yield takeEvery(CREATE_CUSTOM_FIELD, createCustomField);
    yield takeEvery(GET_CUSTOM_FIELD, getCustomField);
    yield takeEvery(EDIT_CUSTOM_FIELD, editCustomField);
    yield takeEvery(REMOVE_CUSTOM_FIELD, removeCustomField);
}
