import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {showNotification, handleError} from '@/utils';
/**
 * fetch item-units saga
 * @returns {IterableIterator<*>}
 */
export function* fetchItemUnits({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchItemUnits, queryString);
    yield put({
      type: types.FETCH_ITEM_UNITS_SUCCESS,
      payload: {units: response.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Add item-units saga
 * @returns {IterableIterator<*>}
 */
function* addItemUnit({payload}) {
  const {params, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addItemUnit, params);
    yield put({type: types.ADD_ITEM_UNIT_SUCCESS, payload: data});
    onSuccess?.();
    showNotification({message: t('notification.item_unit_created')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update item-units saga
 * @returns {IterableIterator<*>}
 */
function* updateItemUnit({payload}) {
  const {params, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateItemUnit, params);
    yield put({type: types.UPDATE_ITEM_UNIT_SUCCESS, payload: data});
    onSuccess?.();
    showNotification({message: t('notification.item_unit_updated')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove item-units saga
 * @returns {IterableIterator<*>}
 */
function* removeItemUnit({payload}) {
  const {id, onSuccess, onFail} = payload;
  try {
    yield put(spinner('isDeleting', true));
    yield call(req.removeItemUnit, id);
    yield put({type: types.REMOVE_ITEM_UNIT_SUCCESS, payload});
    onSuccess?.();
    showNotification({message: t('notification.item_unit_deleted')});
  } catch (e) {
    handleError(e);
    onFail?.();
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* itemUnitSaga() {
  yield takeEvery(types.FETCH_ITEM_UNITS, fetchItemUnits);
  yield takeEvery(types.ADD_ITEM_UNIT, addItemUnit);
  yield takeEvery(types.UPDATE_ITEM_UNIT, updateItemUnit);
  yield takeEvery(types.REMOVE_ITEM_UNIT, removeItemUnit);
}
