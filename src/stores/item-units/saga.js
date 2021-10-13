import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import {alertMe} from '@/constants';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';

/**
 * fetch item-units saga
 * @returns {IterableIterator<*>}
 */
export function* fetchItemUnits({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const {data} = yield call(req.fetchItemUnits, queryString);
    yield put({
      type: types.FETCH_ITEM_UNITS_SUCCESS,
      payload: {units: data, fresh}
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
  try {
    yield put(spinner('isSaving', true));
    const {params, onSuccess} = payload;
    const {data} = yield call(req.addItemUnit, params);
    yield put({type: types.ADD_ITEM_UNIT_SUCCESS, payload: data});
    onSuccess?.();
    return;
  } catch (e) {
    const errorMessage = e?.data?.errors?.name;
    errorMessage && alertMe({desc: errorMessage?.[0]});
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update item-units saga
 * @returns {IterableIterator<*>}
 */
function* updateItemUnit({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, onSuccess} = payload;
    const {data} = yield call(req.updateItemUnit, params);
    yield put({type: types.UPDATE_ITEM_UNIT_SUCCESS, payload: data});
    onSuccess?.();
  } catch (e) {
    const errorMessage = e?.data?.errors?.name;
    errorMessage && alertMe({desc: errorMessage?.[0]});
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove item-units saga
 * @returns {IterableIterator<*>}
 */
function* removeItemUnit({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, onSuccess} = payload;
    yield call(req.removeItemUnit, id);
    yield put({type: types.REMOVE_ITEM_UNIT_SUCCESS, payload});
    onSuccess?.();
  } catch (e) {
    e?.error === 'items_attached' &&
      alertMe({title: t('items.alreadyInUseUnit')});
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* itemUnitsSaga() {
  yield takeEvery(types.FETCH_ITEM_UNITS, fetchItemUnits);
  yield takeEvery(types.ADD_ITEM_UNIT, addItemUnit);
  yield takeEvery(types.UPDATE_ITEM_UNIT, updateItemUnit);
  yield takeEvery(types.REMOVE_ITEM_UNIT, removeItemUnit);
}
