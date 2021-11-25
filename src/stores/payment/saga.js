import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation, routes} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {modalTypes} from '../custom-field/helpers';
import {hasValue} from '@/constants';

/**
 * Fetch payments saga
 * @returns {IterableIterator<*>}
 */
export function* fetchPayments({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchPayments, queryString);
    yield put({
      type: types.FETCH_PAYMENTS_SUCCESS,
      payload: {payments: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single payment saga
 * @returns {IterableIterator<*>}
 */
function* fetchSinglePayment({payload}) {
  try {
    const {id, onSuccess} = payload;
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.PAYMENT, limit: 'all'}}
    });
    const {data} = yield call(req.fetchSinglePayment, id);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Fetch payment initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchPaymentInitialDetails({payload}) {
  yield call(fetchCustomFields, {
    payload: {queryString: {type: modalTypes.PAYMENT, limit: 'all'}}
  });
  const params = {key: 'payment'};
  const {nextNumber} = yield call(req.fetchNextPaymentNumber, params);
  payload?.(nextNumber);
}

/**
 * Fetch next payment number saga
 * @returns {IterableIterator<*>}
 */
function* fetchNextPaymentNumber({payload = {}}) {
  try {
    const {userId = null, model_id = null, onSuccess} = payload;
    const params = {key: 'payment', userId, model_id};
    const {nextNumber} = yield call(req.fetchNextPaymentNumber, params);
    onSuccess?.(nextNumber);
  } catch (e) {}
}

/**
 * Add payment saga
 * @returns {IterableIterator<*>}
 */
function* addPayment({payload}) {
  try {
    const {params, navigation, hasRecordPayment} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addPayment, params);
    yield put({type: types.ADD_PAYMENT_SUCCESS, payload: data});
    !hasRecordPayment
      ? navigation.navigate(routes.MAIN_PAYMENTS)
      : navigation.navigate(routes.MAIN_INVOICES);
    showNotification({message: t('notification.payment_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update payment saga
 * @returns {IterableIterator<*>}
 */
function* updatePayment({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updatePayment, id, params);
    yield put({type: types.UPDATE_PAYMENT_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.payment_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove payment saga
 * @returns {IterableIterator<*>}
 */
function* removePayment({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removePayment, id);
    yield put({type: types.REMOVE_PAYMENT_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.payment_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Fetch payment invoices saga
 * @returns {IterableIterator<*>}
 */
export function* fetchPaymentInvoices({payload}) {
  try {
    const {fresh = true, onSuccess, queryString} = payload;
    if (!hasValue(queryString?.customer_id)) {
      yield put({
        type: types.FETCH_PAYMENT_INVOICES_SUCCESS,
        payload: {paymentInvoices: [], fresh: true}
      });
      onSuccess?.();
      return;
    }

    const response = yield call(req.fetchPaymentInvoices, queryString);
    yield put({
      type: types.FETCH_PAYMENT_INVOICES_SUCCESS,
      payload: {paymentInvoices: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    payload?.onFail?.();
  }
}

/**
 * Send payment receipt saga
 * @returns {IterableIterator<*>}
 */
function* sendPaymentReceipt({payload}) {
  try {
    const {id, params, onSuccess} = payload;
    yield put(spinner('isLoading', true));
    yield call(req.sendPaymentReceipt, id, params);
    onSuccess?.();
    showNotification({message: t('notification.payment_sent')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isLoading', false));
  }
}

export default function* paymentSaga() {
  yield takeLatest(types.FETCH_PAYMENTS, fetchPayments);
  yield takeLatest(types.FETCH_SINGLE_PAYMENT, fetchSinglePayment);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchPaymentInitialDetails);
  yield takeLatest(types.FETCH_NEXT_PAYMENT_NUMBER, fetchNextPaymentNumber);
  yield takeLatest(types.ADD_PAYMENT, addPayment);
  yield takeLatest(types.UPDATE_PAYMENT, updatePayment);
  yield takeLatest(types.REMOVE_PAYMENT, removePayment);
  yield takeLatest(types.FETCH_PAYMENT_INVOICES, fetchPaymentInvoices);
  yield takeLatest(types.SEND_PAYMENT_RECEIPT, sendPaymentReceipt);
}
