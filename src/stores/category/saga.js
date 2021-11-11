import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Fetch categories saga
 * @returns {IterableIterator<*>}
 */
export function* fetchCategories({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchCategories, queryString);
    yield put({
      type: types.FETCH_CATEGORIES_SUCCESS,
      payload: {categories: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single category saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleCategory({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleCategory, id);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add category saga
 * @returns {IterableIterator<*>}
 */
function* addCategory({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addCategory, params);
    yield put({type: types.ADD_CATEGORY_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.expense_category_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update category saga
 * @returns {IterableIterator<*>}
 */
function* updateCategory({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateCategory, id, params);
    yield put({type: types.UPDATE_CATEGORY_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.expense_category_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove category saga
 * @returns {IterableIterator<*>}
 */
function* removeCategory({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removeCategory, id);
    yield put({type: types.REMOVE_CATEGORY_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.expense_category_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* categorySaga() {
  yield takeLatest(types.FETCH_CATEGORIES, fetchCategories);
  yield takeLatest(types.FETCH_SINGLE_CATEGORY, fetchSingleCategory);
  yield takeLatest(types.ADD_CATEGORY, addCategory);
  yield takeLatest(types.UPDATE_CATEGORY, updateCategory);
  yield takeLatest(types.REMOVE_CATEGORY, removeCategory);
}
