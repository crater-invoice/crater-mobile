import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {routes} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {fetchTaxAndDiscountPerItem} from 'stores/common/actions';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {addItem} from '../item/saga';
import {modalTypes} from '../custom-field/helpers';
import {isEmpty} from '@/constants';
import {selectedCompanySalesTaxSettingSelector} from '../company/selectors';

/**
 * Fetch invoice templates saga
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceTemplates() {
  const state = yield select();
  if (isEmpty(state.invoice?.invoiceTemplates)) {
    const {invoiceTemplates} = yield call(req.fetchInvoiceTemplates);
    yield put({
      type: types.FETCH_INVOICE_TEMPLATES_SUCCESS,
      payload: invoiceTemplates
    });
  }
}

/**
 * Fetch invoice common details saga
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceData() {
  try {
    yield put({type: types.CLEAR_INVOICE});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.INVOICE, limit: 'all'}}
    });
    yield call(fetchInvoiceTemplates);
  } catch (e) {}
}

/**
 * Fetch invoice initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceInitialDetails({payload}) {
  yield call(fetchInvoiceData);
  yield put(fetchTaxAndDiscountPerItem());
  const params = {key: 'invoice'};
  const {nextNumber} = yield call(req.fetchNextInvoiceNumber, params);
  payload?.(nextNumber);
}

/**
 * Fetch next invoice number saga
 * @returns {IterableIterator<*>}
 */
function* fetchNextInvoiceNumber({payload = {}}) {
  try {
    const {userId = null, model_id = null, onSuccess} = payload;
    const params = {key: 'invoice', userId, model_id};
    const {nextNumber} = yield call(req.fetchNextInvoiceNumber, params);
    onSuccess?.(nextNumber);
  } catch (e) {}
}

/**
 * Fetch invoices saga
 * @returns {IterableIterator<*>}
 */
function* fetchInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchInvoices, queryString);
    const invoices = response?.data ?? [];
    yield put({type: types.FETCH_INVOICES_SUCCESS, payload: {invoices, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single invoice saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleInvoice, id);
    yield call(fetchInvoiceData);
    yield put({
      type: types.ADD_INVOICE_ITEM_SUCCESS,
      payload: data?.items ?? []
    });
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add invoice saga
 * @returns {IterableIterator<*>}
 */
function* addInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const salesTaxSettings = yield select(
      selectedCompanySalesTaxSettingSelector
    );
    const params = {...invoice, ...salesTaxSettings};
    const {data} = yield call(req.addInvoice, params);
    yield put({type: types.ADD_INVOICE_SUCCESS, payload: data});
    req.InvoiceServices.toggleIsFirstInvoiceCreated(true);
    onSuccess?.(data);
    showNotification({message: t('notification.invoice_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update invoice saga
 * @returns {IterableIterator<*>}
 */
function* updateInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const {data} = yield call(req.updateInvoice, invoice.id, invoice);
    yield put({type: types.UPDATE_INVOICE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.invoice_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove invoice saga
 * @returns {IterableIterator<*>}
 */
function* removeInvoice({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, navigation} = payload;
    yield call(req.removeInvoice, id);
    yield put({type: types.REMOVE_INVOICE_SUCCESS, payload: id});
    navigation.goBack(null);
    showNotification({message: t('notification.invoice_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Add invoice item saga
 * @returns {IterableIterator<*>}
 */
function* addInvoiceItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess} = payload;
    const items = yield call(addItem, {payload: {item, returnCallback: true}});
    yield put({type: types.ADD_INVOICE_ITEM_SUCCESS, payload: items ?? []});
    onSuccess?.();
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove invoice item saga
 * @returns {IterableIterator<*>}
 */
function* removeInvoiceItem({payload}) {
  try {
    yield put(spinner('isDeleting', false));
    const {id} = payload;
    yield put({type: types.REMOVE_INVOICE_ITEM_SUCCESS, payload: id});
  } catch (e) {
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Change invoice status saga
 * @returns {IterableIterator<*>}
 */
function* changeInvoiceStatus({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {onResult = null, params, action, navigation} = payload;
    yield call(req.changeInvoiceStatus, action, params);
    onResult?.();
    navigation.navigate(routes.MAIN_INVOICES);
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isLoading', false));
  }
}

/**
 * Send invoice saga
 * @returns {IterableIterator<*>}
 */
function* sendInvoice({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {id, params, onSuccess} = payload;
    const response = yield call(req.sendInvoice, id, params);
    onSuccess?.(response);
    showNotification({message: t('notification.invoice_sent')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isLoading', false));
  }
}

export default function* invoiceSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchInvoiceInitialDetails);
  yield takeLatest(types.FETCH_INVOICES, fetchInvoices);
  yield takeEvery(types.FETCH_NEXT_INVOICE_NUMBER, fetchNextInvoiceNumber);
  yield takeLatest(types.FETCH_SINGLE_INVOICE, fetchSingleInvoice);
  yield takeLatest(types.ADD_INVOICE, addInvoice);
  yield takeLatest(types.UPDATE_INVOICE, updateInvoice);
  yield takeLatest(types.REMOVE_INVOICE, removeInvoice);
  yield takeLatest(types.ADD_INVOICE_ITEM, addInvoiceItem);
  yield takeLatest(types.REMOVE_INVOICE_ITEM, removeInvoiceItem);
  yield takeEvery(types.CHANGE_INVOICE_STATUS, changeInvoiceStatus);
  yield takeEvery(types.SEND_INVOICE, sendInvoice);
}
