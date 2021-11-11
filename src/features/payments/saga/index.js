import {call, put, takeLatest} from 'redux-saga/effects';
import Request from 'utils/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import {routes} from '@/navigation';
import {hasValue, isBooleanTrue} from '@/constants';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {getNextNumber, getSettingInfo} from '@/features/settings/saga/general';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {modalTypes} from 'stores/custom-field/helpers';
import {
  paymentTriggerSpinner as spinner,
  saveUnpaidInvoices,
  setPayments,
  createFromPayment,
  updateFromPayment,
  removeFromPayment
} from '../actions';

function* getPayments({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const options = {path: `payments?${queryStrings.stringify(queryString)}`};
    const response = yield call([Request, 'get'], options);
    yield put(setPayments({payments: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* getCreatePayment({payload: {onSuccess}}) {
  try {
    const isAutoGenerate = yield call(getSettingInfo, {
      payload: {key: 'payment_auto_generate'}
    });
    const isAuto = isBooleanTrue(isAutoGenerate);
    const response = yield call(getNextNumber, {payload: {key: 'payment'}});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.PAYMENT, limit: 'all'}}
    });
    onSuccess?.({
      ...response,
      ...(!isAuto && {nextNumber: null})
    });
  } catch (e) {}
}

function* createPayment({payload}) {
  const {params, navigation, hasRecordPayment} = payload;
  yield put(spinner({paymentLoading: true}));
  try {
    const options = {path: `payments`, body: params};
    const response = yield call([Request, 'post'], options);
    yield put(createFromPayment({payment: response.data}));
    !hasRecordPayment
      ? navigation.navigate(routes.MAIN_PAYMENTS)
      : navigation.navigate(routes.MAIN_INVOICES);
    showNotification({message: t('notification.payment_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({paymentLoading: false}));
  }
}

function* getUnpaidInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    if (!hasValue(queryString?.customer_id)) {
      yield put(saveUnpaidInvoices({invoices: [], fresh: true}));
      onSuccess?.();
      return;
    }
    const path = `invoices?${queryStrings.stringify(queryString)}`;
    const response = yield call([Request, 'get'], {path});
    yield put(saveUnpaidInvoices({invoices: response?.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* getPaymentDetail({payload: {id, onSuccess}}) {
  try {
    const options = {path: `payments/${id}`};
    const response = yield call([Request, 'get'], options);
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.PAYMENT, limit: 'all'}}
    });
    onSuccess?.(response);
  } catch (e) {}
}

function* updatePayment({payload}) {
  const {id, params, navigation} = payload;
  yield put(spinner({paymentLoading: true}));
  try {
    const options = {path: `payments/${id}`, body: params};
    const response = yield call([Request, 'put'], options);
    yield put(updateFromPayment({payment: response.data}));
    navigation.goBack(null);
    showNotification({message: t('notification.payment_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({paymentLoading: false}));
  }
}

function* removePayment({payload: {id, navigation}}) {
  yield put(spinner({paymentLoading: true}));
  try {
    const options = {path: `payments/delete`, body: {ids: [id]}};
    yield call([Request, 'post'], options);
    yield put(removeFromPayment({id}));
    navigation.goBack(null);
    showNotification({message: t('notification.payment_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({paymentLoading: false}));
  }
}

function* sendPaymentReceipt({payload: {params, navigation, onSuccess}}) {
  yield put(spinner({sendReceiptLoading: true}));
  try {
    const options = {path: `payments/${params.id}/send`, body: params};
    yield call([Request, 'post'], options);
    onSuccess?.();
    navigation.navigate(routes.MAIN_PAYMENTS);
    showNotification({message: t('notification.payment_sent')});
  } catch (e) {
  } finally {
    yield put(spinner({sendReceiptLoading: false}));
  }
}

export default function* paymentsSaga() {
  yield takeLatest(TYPES.GET_PAYMENTS, getPayments);
  yield takeLatest(TYPES.GET_CREATE_PAYMENT, getCreatePayment);
  yield takeLatest(TYPES.CREATE_PAYMENT, createPayment);
  yield takeLatest(TYPES.GET_UNPAID_INVOICES, getUnpaidInvoices);
  yield takeLatest(TYPES.GET_PAYMENT_DETAIL, getPaymentDetail);
  yield takeLatest(TYPES.UPDATE_PAYMENT, updatePayment);
  yield takeLatest(TYPES.REMOVE_PAYMENT, removePayment);
  yield takeLatest(TYPES.SEND_PAYMENT_RECEIPT, sendPaymentReceipt);
}
