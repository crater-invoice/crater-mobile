import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as req from './service';
import {alertMe} from '@/constants';
import {spinner} from './actions';
import * as types from './types';

/**
 * fetch payment-methods saga
 * @returns {IterableIterator<*>}
 */
export function* fetchPaymentModes({payload}) {
  const {fresh = true, onSuccess, queryString} = payload;

  try {
    const response = yield call(req.fetchPaymentModes, queryString);

    if (response?.data) {
      yield put({
        type: types.FETCH_PAYMENT_MODES_SUCCESS,
        payload: {modes: response.data, fresh}
      });
    }

    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Add payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* addPaymentModes({payload: {params, onSuccess}}) {
  yield put(spinner({paymentModeLoading: true}));

  try {
    const response = yield call(req.addPaymentModes, params);

    if (response?.data) {
      yield put({type: types.ADD_PAYMENT_MODE_SUCCESS, payload: response.data});
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
    yield put(spinner({paymentModeLoading: false}));
  }
}

/**
 * Update payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* updatePaymentModes({payload: {params, onSuccess}}) {
  yield put(spinner({paymentModeLoading: true}));

  try {
    const response = yield call(req.updatePaymentModes, params);

    if (response?.data) {
      yield put({
        type: types.UPDATE_PAYMENT_MODE_SUCCESS,
        payload: response.data
      });
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
    yield put(spinner({paymentModeLoading: false}));
  }
}

/**
 * Remove payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* removePaymentMode({payload: {id, onSuccess}}) {
  yield put(spinner({paymentModeLoading: true}));

  try {
    const response = yield call(req.removePaymentMode, id);

    if (response.success) {
      yield put({type: types.REMOVE_PAYMENT_MODE_SUCCESS, payload: id});
      onSuccess?.();
    }

    if (response.error && response.error === 'payments_attached') {
      alertMe({
        title: t('payments.alreadyInUseMode')
      });
    }
  } catch (e) {
  } finally {
    yield put(spinner({paymentModeLoading: false}));
  }
}

export default function* paymentModesSaga() {
  yield takeEvery(types.FETCH_PAYMENT_MODES, fetchPaymentModes);
  yield takeEvery(types.ADD_PAYMENT_MODE, addPaymentModes);
  yield takeEvery(types.UPDATE_PAYMENT_MODE, updatePaymentModes);
  yield takeEvery(types.REMOVE_PAYMENT_MODE, removePaymentMode);
}
