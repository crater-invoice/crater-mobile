import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {fetchTaxAndDiscountPerItem} from '../common/actions';
import {showNotification, handleError} from '@/utils';
import t from 'locales/use-translation';
import {navigation} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {addItem} from '../item/saga';
import {modalTypes} from '../custom-field/helpers';
import {isEmpty} from '@/constants';
import {selectedCompanySalesTaxSettingSelector} from '../company/selectors';

/**
 * Fetch Next-Invoice-At saga
 * @returns {*}
 */
function* fetchNextInvoiceAt({payload}) {
  try {
    const {params, onSuccess} = payload;
    const response = yield call(req.fetchNextInvoiceAt, params);
    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Fetch invoice templates saga
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceTemplates() {
  const state = yield select();
  if (isEmpty(state.recurringInvoice?.invoiceTemplates)) {
    const {invoiceTemplates} = yield call(req.fetchInvoiceTemplates);
    yield put({
      type: types.FETCH_INVOICE_TEMPLATES_SUCCESS,
      payload: invoiceTemplates
    });
  }
}

/**
 * Fetch recurring invoice common details saga
 * @returns {IterableIterator<*>}
 */
function* fetchRecurringInvoiceData() {
  try {
    yield put({type: types.CLEAR_RECURRING_INVOICE});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.INVOICE, limit: 'all'}}
    });
    yield call(fetchInvoiceTemplates);
  } catch (e) {}
}

/**
 * Fetch recurring invoice initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchRecurringInvoiceInitialDetails({payload}) {
  yield call(fetchRecurringInvoiceData);
  yield put(fetchTaxAndDiscountPerItem());
  payload?.();
}

/**
 * Fetch recurring-invoices saga
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
 * Fetch single recurring-invoice saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleRecurringInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleRecurringInvoice, id);
    const recurringInvoice = response?.data;
    yield call(fetchRecurringInvoiceData);
    yield put({
      type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
      payload: recurringInvoice?.items ?? []
    });
    onSuccess?.(response?.data);
  } catch (e) {}
}

/**
 * Add recurring-invoice saga
 * @returns {IterableIterator<*>}
 */
function* addRecurringInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const salesTaxSettings = yield select(
      selectedCompanySalesTaxSettingSelector
    );
    const params = {...invoice, ...salesTaxSettings};
    const response = yield call(req.addRecurringInvoice, params);
    yield put({
      type: types.ADD_RECURRING_INVOICE_SUCCESS,
      payload: response?.data
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.recurring_invoice_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update recurring-invoice saga
 * @returns {IterableIterator<*>}
 */
function* updateRecurringInvoice({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {invoice, onSuccess} = payload;
    const response = yield call(
      req.updateRecurringInvoice,
      invoice.id,
      invoice
    );
    yield put({
      type: types.UPDATE_RECURRING_INVOICE_SUCCESS,
      payload: response?.data
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.recurring_invoice_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove recurring-invoice saga
 * @returns {IterableIterator<*>}
 */
function* removeRecurringInvoice({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id} = payload;
    yield call(req.removeRecurringInvoice, id);
    yield put({type: types.REMOVE_RECURRING_INVOICE_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.recurring_invoice_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Add recurring-invoice item saga
 * @returns {IterableIterator<*>}
 */
function* addRecurringInvoiceItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess} = payload;
    const items = yield call(addItem, {payload: {item, returnCallback: true}});
    yield put({
      type: types.ADD_RECURRING_INVOICE_ITEM_SUCCESS,
      payload: items ?? []
    });
    onSuccess?.();
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove recurring-invoice item saga
 * @returns {IterableIterator<*>}
 */
function* removeRecurringInvoiceItem({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {onResult, id} = payload;
    yield put({type: types.REMOVE_RECURRING_INVOICE_ITEM_SUCCESS, payload: id});
    onResult?.();
  } catch (e) {
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* recurringInvoiceSaga() {
  yield takeLatest(types.FETCH_NEXT_INVOICE_AT, fetchNextInvoiceAt);
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
  yield takeLatest(types.ADD_RECURRING_INVOICE_ITEM, addRecurringInvoiceItem);
  yield takeLatest(
    types.REMOVE_RECURRING_INVOICE_ITEM,
    removeRecurringInvoiceItem
  );
}
