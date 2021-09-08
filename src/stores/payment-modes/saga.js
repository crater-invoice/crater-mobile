import {call, put, takeEvery} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as req from './service';
import {alertMe} from '@/constants';
import {
  settingsTriggerSpinner as spinner,
  setPaymentModes,
  setPaymentMode
} from './actions';
import {
  GET_PAYMENT_MODES,
  CREATE_PAYMENT_MODE,
  EDIT_PAYMENT_MODE,
  REMOVE_PAYMENT_MODE
} from './types';

/**
 * get payment-methods saga
 * @returns {IterableIterator<*>}
 */
export function* getPaymentModes({payload}) {
  const {fresh = true, onSuccess, queryString} = payload;

  try {
    const response = yield call(req.getPaymentModes, queryString);

    if (response?.data) {
      const data = response.data;
      yield put(setPaymentModes({modes: data, fresh}));
    }

    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Add payment-methods saga
 * @returns {IterableIterator<*>}
 */
function* createPaymentMode({payload: {params, onSuccess}}) {
  yield put(spinner({paymentModeLoading: true}));

  try {
    const response = yield call(req.createPaymentMode, params);

    if (response?.data) {
      yield put(
        setPaymentMode({
          paymentMode: [response.data],
          isCreated: true
        })
      );
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
function* editPaymentMode({payload: {params, onSuccess}}) {
  yield put(spinner({paymentModeLoading: true}));

  try {
    const response = yield call(req.editPaymentMode, params);

    if (response?.data) {
      yield put(
        setPaymentMode({
          paymentMode: response.data,
          isUpdated: true
        })
      );
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
      yield put(setPaymentMode({id, isRemove: true}));
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
  yield takeEvery(GET_PAYMENT_MODES, getPaymentModes);
  yield takeEvery(CREATE_PAYMENT_MODE, createPaymentMode);
  yield takeEvery(EDIT_PAYMENT_MODE, editPaymentMode);
  yield takeEvery(REMOVE_PAYMENT_MODE, removePaymentMode);
}
