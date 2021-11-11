import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Fetch taxes saga
 * @returns {IterableIterator<*>}
 */
function* fetchTaxes({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchTaxes, queryString);
    yield put({
      type: types.FETCH_TAXES_SUCCESS,
      payload: {taxTypes: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single tax saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleTax({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleTax, id);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add tax saga
 * @returns {IterableIterator<*>}
 */
function* addTax({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addTax, params);
    yield put({type: types.ADD_TAX_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.tax_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update tax saga
 * @returns {IterableIterator<*>}
 */
function* updateTax({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateTax, id, params);
    yield put({type: types.UPDATE_TAX_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.tax_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove tax saga
 * @returns {IterableIterator<*>}
 */
function* removeTax({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removeTax, id);
    yield put({type: types.REMOVE_TAX_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.tax_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* taxTypeSaga() {
  yield takeLatest(types.FETCH_TAXES, fetchTaxes);
  yield takeLatest(types.FETCH_SINGLE_TAX, fetchSingleTax);
  yield takeLatest(types.ADD_TAX, addTax);
  yield takeLatest(types.UPDATE_TAX, updateTax);
  yield takeLatest(types.REMOVE_TAX, removeTax);
}
