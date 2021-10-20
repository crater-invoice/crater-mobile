import {call, put, takeEvery} from 'redux-saga/effects';
import {
  settingsTriggerSpinner as spinner,
  setCustomFields,
  createFromCustomFields,
  updateFromCustomFields,
  removeFromCustomFields
} from '../../actions';
import * as queryStrings from 'query-string';
import Request from 'utils/request';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  GET_CUSTOM_FIELDS,
  CREATE_CUSTOM_FIELD,
  EDIT_CUSTOM_FIELD,
  REMOVE_CUSTOM_FIELD,
  GET_CUSTOM_FIELD
} from '../../constants';

export function* getCustomFields({payload}) {
  const {
    fresh = true,
    onSuccess,
    onFail,
    queryString,
    returnResponse = false
  } = payload;
  try {
    const options = {
      path: `custom-fields?${queryStrings.stringify(queryString)}`
    };
    const response = yield call([Request, 'get'], options);
    yield put(setCustomFields({customFields: response?.data ?? [], fresh}));
    onSuccess?.(response);
    if (returnResponse) {
      return response?.data ?? [];
    }
  } catch (e) {
    onFail?.();
  }
}

function* createCustomField({payload: {params, navigation}}) {
  yield put(spinner({customFieldLoading: true}));
  try {
    const options = {
      path: `custom-fields`,
      body: params
    };
    const {data} = yield call([Request, 'post'], options);
    yield put(createFromCustomFields({customField: data}));
    navigation.goBack(null);
    showNotification({message: t('notification.custom_field_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({customFieldLoading: false}));
  }
}

function* getCustomField({payload: {id, onResult = null}}) {
  yield put(spinner({getCustomFieldLoading: true}));
  try {
    const options = {path: `custom-fields/${id}`};
    const {data} = yield call([Request, 'get'], options);
    onResult?.(data);
  } catch (e) {
  } finally {
    yield put(spinner({getCustomFieldLoading: false}));
  }
}

function* editCustomField({payload: {id, params, navigation}}) {
  try {
    yield put(spinner({customFieldLoading: true}));
    const options = {
      path: `custom-fields/${id}`,
      body: params
    };
    const {data} = yield call([Request, 'put'], options);
    yield put(updateFromCustomFields({customField: data}));
    navigation.goBack(null);
    showNotification({message: t('notification.custom_field_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({customFieldLoading: false}));
  }
}

function* removeCustomField({payload: {id, navigation}}) {
  try {
    yield put(spinner({removeCustomFieldLoading: true}));
    const options = {path: `custom-fields/${id}`};
    yield call([Request, 'delete'], options);
    yield put(removeFromCustomFields({id}));
    navigation.goBack(null);
    showNotification({message: t('notification.custom_field_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({removeCustomFieldLoading: false}));
  }
}

export default function* customFieldsSaga() {
  yield takeEvery(GET_CUSTOM_FIELDS, getCustomFields);
  yield takeEvery(CREATE_CUSTOM_FIELD, createCustomField);
  yield takeEvery(GET_CUSTOM_FIELD, getCustomField);
  yield takeEvery(EDIT_CUSTOM_FIELD, editCustomField);
  yield takeEvery(REMOVE_CUSTOM_FIELD, removeCustomField);
}
