import { call, put, takeEvery } from 'redux-saga/effects';
import { settingsTriggerSpinner, setCustomFields } from '../../actions';
import * as queryStrings from 'query-string';
import Request from '@/api/request';
import { hasValue, alertMe } from '@/constants';
import { ROUTES } from '@/navigation';
import { getTitleByLanguage } from '@/utils';
import {
    GET_CUSTOM_FIELDS,
    CREATE_CUSTOM_FIELD,
    EDIT_CUSTOM_FIELD,
    REMOVE_CUSTOM_FIELD,
    GET_CUSTOM_FIELD
} from '../../constants';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('name')) {
        alertMe({
            desc: getTitleByLanguage('alert.alreadyInUse', '"Name"')
        });
        return true;
    }
};

function* getCustomFields({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `custom-fields?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.customFields) {
            const { data } = response.customFields;
            yield put(setCustomFields({ customFields: data, fresh }));
        }

        onSuccess?.(response?.customFields);
    } catch (e) {
    } finally {
    }
}

function* createCustomField({ payload: { params, navigation } }) {
    yield put(settingsTriggerSpinner({ customFieldLoading: true }));

    try {
        const options = {
            path: `custom-fields`,
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
        const options = { path: `custom-fields/${id}/edit` };

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
            path: `custom-fields/${id}`,
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
        const options = { path: `custom-fields/${id}` };

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
