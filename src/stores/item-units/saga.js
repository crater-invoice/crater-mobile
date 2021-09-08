import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import {alertMe} from '@/constants';
import * as TYPES from './types';
import * as req from './service';
import {
  settingsTriggerSpinner as spinner,
  setItemUnits,
  setItemUnit
} from './actions';

/**
 * get item-units saga
 * @returns {IterableIterator<*>}
 */
export function* getItemUnits({payload}) {
  const {fresh = true, onSuccess, queryString} = payload;
  try {
    const response = yield call(req.getItemUnits, queryString);
    if (response?.data) {
      const data = response.data;
      yield put(setItemUnits({units: data, fresh}));
    }

    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Add item-units saga
 * @returns {IterableIterator<*>}
 */
function* createItemUnit({payload: {params, onSuccess}}) {
  yield put(spinner({itemUnitLoading: true}));

  try {
    const response = yield call(req.createItemUnit, params);

    if (response?.data) {
      yield put(setItemUnit({unit: [response.data], isCreated: true}));
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
function* editItemUnit({payload: {params, onSuccess}}) {
  yield put(spinner({itemUnitLoading: true}));

  try {
    const response = yield call(req.editItemUnit, params);

    if (response?.data) {
      yield put(setItemUnit({unit: response.data, isUpdated: true}));
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
      yield put(setItemUnit({id, isRemove: true}));
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
  yield takeEvery(TYPES.GET_ITEM_UNITS, getItemUnits);
  yield takeEvery(TYPES.CREATE_ITEM_UNIT, createItemUnit);
  yield takeEvery(TYPES.EDIT_ITEM_UNIT, editItemUnit);
  yield takeEvery(TYPES.REMOVE_ITEM_UNIT, removeItemUnit);
}
