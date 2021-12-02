import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Fetch custom-fields saga
 * @returns {IterableIterator<*>}
 */
export function* fetchCustomFields({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchCustomFields, queryString);
    yield put({
      type: types.FETCH_CUSTOM_FIELDS_SUCCESS,
      payload: {customFields: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single custom-field saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleCustomField({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleCustomField, id);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add custom-field saga
 * @returns {IterableIterator<*>}
 */
function* addCustomField({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addCustomField, params);
    yield put({type: types.ADD_CUSTOM_FIELD_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.custom_field_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update custom-field saga
 * @returns {IterableIterator<*>}
 */
function* updateCustomField({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateCustomField, id, params);
    yield put({type: types.UPDATE_CUSTOM_FIELD_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.custom_field_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove custom-field saga
 * @returns {IterableIterator<*>}
 */
function* removeCustomField({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removeCustomField, id);
    yield put({type: types.REMOVE_CUSTOM_FIELD_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.custom_field_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* customFieldSaga() {
  yield takeLatest(types.FETCH_CUSTOM_FIELDS, fetchCustomFields);
  yield takeLatest(types.FETCH_SINGLE_CUSTOM_FIELD, fetchSingleCustomField);
  yield takeLatest(types.ADD_CUSTOM_FIELD, addCustomField);
  yield takeLatest(types.UPDATE_CUSTOM_FIELD, updateCustomField);
  yield takeLatest(types.REMOVE_CUSTOM_FIELD, removeCustomField);
}
