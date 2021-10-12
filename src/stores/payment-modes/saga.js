import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as req from './service';
import {alertMe} from '@/constants';
import {spinner} from './actions';
import * as types from './types';

/**
 * Fetch payment-methods saga
 * @returns {IterableIterator<*>}
 */
export function* fetchPaymentModes({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const {data} = yield call(req.fetchPaymentModes, queryString);
    yield put({
      type: types.FETCH_PAYMENT_MODES_SUCCESS,
      payload: {modes: data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Add payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* addPaymentMode({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, onSuccess} = payload;
    const {data} = yield call(req.addPaymentMode, params);
    yield put({type: types.ADD_PAYMENT_MODE_SUCCESS, payload: data});
    onSuccess?.();
  } catch (e) {
    alertMe({desc: e?.data?.errors.name[0]});
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* updatePaymentMode({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, onSuccess} = payload;
    const {data} = yield call(req.updatePaymentMode, params);
    yield put({type: types.UPDATE_PAYMENT_MODE_SUCCESS, payload: data});
    onSuccess?.();
  } catch (e) {
    alertMe({desc: e?.data?.errors.name[0]});
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* removePaymentMode({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, onSuccess} = payload;
    yield call(req.removePaymentMode, id);
    yield put({type: types.REMOVE_PAYMENT_MODE_SUCCESS, payload: id});
    onSuccess?.();
  } catch (e) {
    e?.error === 'payments_attached' &&
      alertMe({title: t('payments.alreadyInUseMode')});
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* paymentModesSaga() {
  yield takeEvery(types.FETCH_PAYMENT_MODES, fetchPaymentModes);
  yield takeEvery(types.ADD_PAYMENT_MODE, addPaymentMode);
  yield takeEvery(types.UPDATE_PAYMENT_MODE, updatePaymentMode);
  yield takeEvery(types.REMOVE_PAYMENT_MODE, removePaymentMode);
}
