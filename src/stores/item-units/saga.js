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
  const {fresh = true, onSuccess, queryString} = payload;
  try {
    const response = yield call(req.fetchItemUnits, queryString);
    if (response?.data) {
      const data = response.data;
      yield put({
        type: types.FETCH_ITEM_UNITS_SUCCESS,
        payload: {units: data, fresh}
      });
    }

    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Add item-units saga
 * @returns {IterableIterator<*>}
 */
function* addItemUnit({payload: {params, onSuccess}}) {
  yield put(spinner({itemUnitLoading: true}));

  try {
    const response = yield call(req.addItemUnit, params);
    if (response?.data) {
      yield put({type: types.ADD_ITEM_UNIT_SUCCESS, payload: response?.data});
      onSuccess?.();
      return;
    }

    if (response?.data?.errors?.name) {
      alertMe({
        desc: response?.data?.errors.name[0]
      });
    }
  } catch (e) {
  } finally {
    yield put(spinner({itemUnitLoading: false}));
  }
}

/**
 * Update item-units saga
 * @returns {IterableIterator<*>}
 */
function* updateItemUnit({payload: {params, onSuccess}}) {
  yield put(spinner({itemUnitLoading: true}));

  try {
    const response = yield call(req.updateItemUnit, params);

    if (response?.data) {
      yield put({type: types.UPDATE_ITEM_UNIT_SUCCESS, payload: response.data});
      onSuccess?.();
      return;
    }

    if (response?.data?.errors?.name) {
      alertMe({
        desc: response?.data?.errors.name[0]
      });
    }
  } catch (e) {
  } finally {
    yield put(spinner({itemUnitLoading: false}));
  }
}

/**
 * Remove item-units saga
 * @returns {IterableIterator<*>}
 */
function* removeItemUnit({payload: {id, onSuccess}}) {
  yield put(spinner({itemUnitLoading: true}));

  try {
    const response = yield call(req.removeItemUnit, id);

    if (response.success) {
      yield put({type: types.REMOVE_ITEM_UNIT_SUCCESS, payload});
      onSuccess?.();
      return;
    }

    if (response.error && response.error === 'items_attached') {
      alertMe({
        title: t('items.alreadyInUseUnit')
      });
    }
  } catch (e) {
  } finally {
    yield put(spinner({itemUnitLoading: false}));
  }
}

export default function* itemUnitsSaga() {
  yield takeEvery(types.FETCH_ITEM_UNITS, fetchItemUnits);
  yield takeEvery(types.ADD_ITEM_UNIT, addItemUnit);
  yield takeEvery(types.UPDATE_ITEM_UNIT, updateItemUnit);
  yield takeEvery(types.REMOVE_ITEM_UNIT, removeItemUnit);
}
