import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';

/**
 * fetch recurring invoice initial details saga.
 * @returns {IterableIterator<*>}
 */
function* fetchRecurringInvoiceInitialDetails() {
  yield call(fetchStatus);
}

/**
 * Fetch status saga.
 * @returns {IterableIterator<*>}
 */
function* fetchStatus() {
  const response = yield call(req.fetchStatus);
  const status = response?.status ?? [];
  yield put({type: types.FETCH_STATUS_SUCCESS, payload: status});
}

/**
 * Fetch recurring-invoices saga.
 * @returns {IterableIterator<*>}
 */
function* fetchRecurringInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchRecurringInvoices, queryString);
    const invoices = response?.data ?? [];
    yield put({
      type: types.FETCH_RECURRING_INVOICES_SUCCESS,
      payload: {invoices, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single recurring-invoice saga.
 * @returns {IterableIterator<*>}
 */
function* fetchSingleRecurringInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleRecurringInvoice, id);
    yield call(fetchStatus);
    onSuccess?.(response?.data);
  } catch (e) {}
}

/**
 * Add recurring-invoice saga.
 * @returns {IterableIterator<*>}
 */
function* addRecurringInvoice({payload}) {
  try {
    const {params, navigation, submissionError} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.addRecurringInvoice, params);
    if (response?.data?.errors) {
      submissionError?.(response?.data?.errors);
      return;
    }
    if (response?.data) {
      yield put({
        type: types.ADD_RECURRING_INVOICE_SUCCESS,
        payload: response?.data
      });
      navigation.goBack(null);
    }
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update recurring-invoice saga.
 * @returns {IterableIterator<*>}
 */
function* updateRecurringInvoice({payload}) {
  try {
    const {id, params, navigation, submissionError} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.updateRecurringInvoice, id, params);
    if (response?.data?.errors) {
      submissionError?.(response?.data?.errors);
      return;
    }
    if (response?.data) {
      yield put({
        type: types.UPDATE_RECURRING_INVOICE_SUCCESS,
        payload: response?.data
      });
      navigation.goBack(null);
    }
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove recurring-invoice saga.
 * @returns {IterableIterator<*>}
 */
function* removeRecurringInvoice({payload}) {
  const {id, navigation, onFail} = payload;
  try {
    yield put(spinner('isDeleting', true));
    const body = {invoices: [id]};
    yield call(req.removeRecurringInvoice, body);
    yield put({type: types.REMOVE_RECURRING_INVOICE_SUCCESS, payload: id});
    navigation.goBack(null);
  } catch (e) {
    onFail?.(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* recurringInvoicesSaga() {
  yield takeLatest(
    types.FETCH_INITIAL_DETAILS,
    fetchRecurringInvoiceInitialDetails
  );
  yield takeLatest(types.FETCH_RECURRING_INVOICES, fetchRecurringInvoices);
  yield takeLatest(
    types.FETCH_SINGLE_RECURRING_INVOICE,
    fetchSingleRecurringInvoice
  );
  yield takeLatest(types.ADD_RECURRING_INVOICE, addRecurringInvoice);
  yield takeLatest(types.UPDATE_RECURRING_INVOICE, updateRecurringInvoice);
  yield takeLatest(types.REMOVE_RECURRING_INVOICE, removeRecurringInvoice);
}
