import {call, put, takeEvery} from 'redux-saga/effects';
import {routes} from '@/navigation';
import {getCustomFields} from '@/features/settings/saga/custom-fields';
import {CUSTOM_FIELD_TYPES} from '@/features/settings/constants';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {fetchTaxAndDiscountPerItem} from '@/stores/common/actions';
import * as types from './types';
import * as req from './service';

/**
 * Fetch invoice templates saga.
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceTemplates() {
  try {
    const response = yield call(req.fetchInvoiceTemplates);
    yield put({
      type: types.FETCH_INVOICE_TEMPLATES_SUCCESS,
      payload: response?.invoiceTemplates
    });
  } catch (e) {}
}

/**
 * Fetch recurring invoice initial details saga.
 * @returns {IterableIterator<*>}
 */
function* fetchInvoiceInitialDetails({payload}) {
  yield put({
    type: types.CLEAR_INVOICE
  });
  yield call(fetchInvoiceTemplates);
  yield put(fetchTaxAndDiscountPerItem());
  payload?.();
}

/**
 * Fetch invoices saga.
 * @returns {IterableIterator<*>}
 */
function* fetchInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchInvoices, queryString);
    const invoices = response?.data ?? [];
    yield put({
      type: types.FETCH_INVOICES_SUCCESS,
      payload: {invoices, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single invoice saga.
 * @returns {IterableIterator<*>}
 */
function* fetchSingleInvoice({payload}) {
  try {
    yield call(getCustomFields, {
      payload: {
        queryString: {type: CUSTOM_FIELD_TYPES.INVOICE, limit: 'all'}
      }
    });
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleInvoice, id);
    const invoice = response?.data;

    yield put({
      type: types.CLEAR_INVOICE
    });
    yield call(fetchInvoiceTemplates);
    yield put({
      type: types.ADD_INVOICE_ITEM_SUCCESS,
      payload: invoice?.invoiceItems ?? []
    });
    onSuccess?.(response?.data);
  } catch (e) {}
}

/**
 * Add invoice saga.
 * @returns {IterableIterator<*>}
 */
function* addInvoice({payload}) {
  try {
    const {invoice, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.addInvoice, invoice);
    yield put({
      type: types.ADD_INVOICE_SUCCESS,
      payload: response?.data
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.invoice_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update invoice saga.
 * @returns {IterableIterator<*>}
 */
function* updateInvoice({payload}) {
  try {
    const {invoice, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.updateInvoice, invoice.id, invoice);
    yield put({
      type: types.UPDATE_INVOICE_SUCCESS,
      payload: response?.data
    });
    onSuccess?.(response?.data);
    showNotification({message: t('notification.invoice_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove invoice saga.
 * @returns {IterableIterator<*>}
 */
function* removeInvoice({payload}) {
  const {id, navigation} = payload;
  try {
    yield put(spinner('isDeleting', true));
    const body = {ids: [id]};
    yield call(req.removeInvoice, body);
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
 * Add invoice item saga.
 * @returns {IterableIterator<*>}
 */
function* addInvoiceItem({payload: {item, onResult}}) {
  try {
    const {price, name, description, taxes, unit_id} = item;

    const body = {
      name,
      description,
      price,
      unit_id,
      taxes
    };

    const response = yield call(req.addInvoiceItem, body);
    const items = [
      {
        ...response.data,
        item_id: response.data.id,
        ...item
      }
    ];

    yield put({
      type: types.ADD_INVOICE_ITEM_SUCCESS,
      payload: items ?? []
    });
    onResult?.();
  } catch (e) {}
}

/**
 * Edit invoice item saga.
 * @returns {IterableIterator<*>}
 */
function* updateInvoiceItem({payload: {item, onResult}}) {
  yield put(spinner({isSaving: true}));
  try {
    const {price, name, description, item_id} = item;

    const body = {
      name,
      description,
      price
    };

    const response = yield call(req.updateInvoiceItem, item_id, body);

    const itemData = [
      {
        ...response.item,
        ...item
      }
    ];
    yield put({
      type: types.UPDATE_INVOICE_ITEM_SUCCESS,
      payload: itemData
    });

    onResult?.();
  } catch (e) {
  } finally {
    yield put(spinner({isSaving: false}));
  }
}

/**
 * Remove invoice item saga.
 * @returns {IterableIterator<*>}
 */
function* removeInvoiceItem({payload: {onResult, id}}) {
  yield put(spinner({isDeleting: true}));

  try {
    yield put({
      type: types.REMOVE_INVOICE_ITEM_SUCCESS,
      payload: id
    });
    onResult?.();
  } catch (e) {
  } finally {
    yield put(spinner({isDeleting: false}));
  }
}

/**
 * Change invoice status saga.
 * @returns {IterableIterator<*>}
 */
function* updateInvoiceStatus({payload}) {
  const {onResult = null, params, action, navigation} = payload;
  yield put(spinner('isLoading', true));
  try {
    yield call(req.updateInvoiceStatus, action, params);
    onResult?.();
    navigation.navigate(routes.MAIN_INVOICES);
  } catch (e) {
  } finally {
    yield put(spinner('isLoading', false));
  }
}

export default function* invoicesSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchInvoiceInitialDetails);
  yield takeLatest(types.FETCH_INVOICES, fetchInvoices);
  yield takeLatest(types.FETCH_SINGLE_INVOICE, fetchSingleInvoice);
  yield takeLatest(types.ADD_INVOICE, addInvoice);
  yield takeLatest(types.UPDATE_INVOICE, updateInvoice);
  yield takeLatest(types.REMOVE_INVOICE, removeInvoice);
  yield takeLatest(types.ADD_INVOICE_ITEM, addInvoiceItem);
  yield takeLatest(types.UPDATE_INVOICE_ITEM, updateInvoiceItem);
  yield takeLatest(types.REMOVE_INVOICE_ITEM, removeInvoiceItem);
  yield takeEvery(types.UPDATE_INVOICE_STATUS, updateInvoiceStatus);
}
