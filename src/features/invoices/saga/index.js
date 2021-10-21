import {call, put, takeEvery} from 'redux-saga/effects';
import Request from 'utils/request';
import * as queryStrings from 'query-string';
import {routes} from '@/navigation';
import {isBooleanTrue} from '@/constants';
import {getNextNumber, getSettingInfo} from '@/features/settings/saga/general';
import {getCustomFields} from '@/features/settings/saga/custom-fields';
import {CUSTOM_FIELD_TYPES} from '@/features/settings/constants';
import InvoiceServices from '@/features/invoices/services';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  GET_INVOICES,
  GET_CREATE_INVOICE,
  ADD_ITEM,
  CREATE_INVOICE,
  EDIT_ITEM,
  REMOVE_ITEM,
  GET_EDIT_INVOICE,
  EDIT_INVOICE,
  REMOVE_INVOICE,
  CHANGE_INVOICE_STATUS,
  GET_INVOICE_TEMPLATE
} from '../constants';
import {
  invoiceTriggerSpinner as spinner,
  setInvoices,
  setInvoiceItems,
  removeInvoiceItem,
  removeInvoiceItems,
  setInvoice,
  removeFromInvoices,
  updateFromInvoices
} from '../actions';
import {fetchTaxAndDiscountPerItem} from '@/stores/common/actions';

function* getInvoices({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const options = {path: `invoices?${queryStrings.stringify(queryString)}`};
    const response = yield call([Request, 'get'], options);
    yield put(setInvoices({invoices: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* getCreateInvoice({payload: {onSuccess}}) {
  try {
    yield put(spinner('isFetchingInitialData', true));
    yield call(getCustomFields, {
      payload: {
        queryString: {type: CUSTOM_FIELD_TYPES.INVOICE, limit: 'all'}
      }
    });
    const response = yield call(getSettingInfo, {
      payload: {
        keys: ['invoice_auto_generate']
      }
    });
    const {invoice_auto_generate} = response;
    const isAuto = isBooleanTrue(invoice_auto_generate);
    const nextInvoiceNumber = yield call(getNextNumber, {
      payload: {key: 'invoice'}
    });
    const values = {...nextInvoiceNumber, ...(!isAuto && {nextNumber: null})};
    const {invoiceTemplates} = yield call(getInvoiceTemplates, {});
    yield put(setInvoice({...response, ...values, invoiceTemplates}));
    yield put(fetchTaxAndDiscountPerItem());
    onSuccess?.(values);
  } catch (e) {
  } finally {
    yield put(spinner('isFetchingInitialData', false));
  }
}

function* getEditInvoice({payload: {id, onSuccess}}) {
  yield put(spinner('isFetchingInitialData', true));
  try {
    const options = {path: `invoices/${id}`};
    yield call(getCustomFields, {
      payload: {
        queryString: {type: CUSTOM_FIELD_TYPES.INVOICE, limit: 'all'}
      }
    });
    const response = yield call([Request, 'get'], options);
    const {invoicePrefix, nextInvoiceNumber} = response?.meta;
    const invoice = response?.data;
    const {invoiceTemplates} = yield call(getInvoiceTemplates, {});
    const values = {
      invoice,
      invoicePrefix,
      nextInvoiceNumber,
      invoiceTemplates,
      discount_per_item: invoice?.discount_per_item,
      tax_per_item: invoice?.tax_per_item
    };
    yield put(setInvoice(values));
    yield put(removeInvoiceItems());
    yield put(setInvoiceItems(invoice?.invoiceItems ?? []));
    onSuccess?.(invoice);
  } catch (e) {
  } finally {
    yield put(spinner('isFetchingInitialData', false));
  }
}

function* addItem({payload: {item, onResult}}) {
  try {
    const {price, name, description, taxes, unit_id} = item;
    const options = {
      path: `items`,
      body: {
        name,
        description,
        price,
        unit_id,
        taxes
      }
    };
    const response = yield call([Request, 'post'], options);
    const invoiceItem = [
      {...response.data, item_id: response.data.id, ...item}
    ];
    yield put(setInvoiceItems(invoiceItem));
    onResult?.();
  } catch (e) {}
}

function* editItem({payload: {item, onResult}}) {
  try {
    const {price, name, description, item_id} = item;
    const options = {
      path: `items/${item_id}`,
      body: {
        name,
        description,
        price
      }
    };
    const response = yield call([Request, 'put'], options);
    const invoiceItem = [{...response.item, ...item}];
    yield put(removeInvoiceItem({id: invoiceItem.id}));
    yield put(setInvoiceItems(invoiceItem));
    onResult?.();
  } catch (e) {}
}

function* createInvoice({payload}) {
  const {invoice, onSuccess} = payload;
  yield put(spinner('isSaving', true));
  try {
    const options = {path: `invoices`, body: invoice};
    const response = yield call([Request, 'post'], options);
    InvoiceServices.toggleIsFirstInvoiceCreated(true);
    yield put(removeInvoiceItems());
    yield put(setInvoices({invoices: [response.data], prepend: true}));
    onSuccess?.(response?.data?.invoicePdfUrl);
    showNotification({message: t('notification.invoice_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

function* editInvoice({payload}) {
  const {invoice, onSuccess, navigation, status} = payload;
  yield put(spinner('isSaving', true));
  try {
    const options = {path: `invoices/${invoice.id}`, body: invoice};
    const response = yield call([Request, 'put'], options);
    yield put(updateFromInvoices({invoice: response.data}));
    status !== 'download' && navigation.goBack(null);
    onSuccess?.(response?.data?.invoicePdfUrl);
    showNotification({message: t('notification.invoice_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

function* removeItem({payload: {onResult, id}}) {
  try {
    yield put(removeInvoiceItem({id}));
    onResult?.();
  } catch (e) {}
}

function* removeInvoice({payload: {onResult, id}}) {
  yield put(spinner('isDeleting', true));
  try {
    const options = {path: `invoices/delete`, body: {ids: [id]}};
    const response = yield call([Request, 'post'], options);
    yield put(removeFromInvoices({id}));
    onResult?.(response);
    showNotification({message: t('notification.invoice_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

function* changeInvoiceStatus({payload}) {
  const {onResult = null, params = null, id, action, navigation} = payload;
  yield put(spinner('isLoading', true));
  const param = {id, ...params};
  try {
    const options = {path: `invoices/${action}`, body: {...param}};
    yield call([Request, 'post'], options);
    onResult?.();
    navigation.navigate(routes.MAIN_INVOICES);
  } catch (e) {
  } finally {
    yield put(spinner('isLoading', false));
  }
}

export function* getInvoiceTemplates(payloadData) {
  try {
    const options = {path: `invoices/templates`};
    return yield call([Request, 'get'], options);
  } catch (e) {}
}

export default function* invoicesSaga() {
  yield takeEvery(GET_INVOICES, getInvoices);
  yield takeEvery(GET_CREATE_INVOICE, getCreateInvoice);
  yield takeEvery(GET_EDIT_INVOICE, getEditInvoice);
  yield takeEvery(ADD_ITEM, addItem);
  yield takeEvery(CREATE_INVOICE, createInvoice);
  yield takeEvery(EDIT_INVOICE, editInvoice);
  yield takeEvery(EDIT_ITEM, editItem);
  yield takeEvery(REMOVE_ITEM, removeItem);
  yield takeEvery(REMOVE_INVOICE, removeInvoice);
  yield takeEvery(CHANGE_INVOICE_STATUS, changeInvoiceStatus);
  yield takeEvery(GET_INVOICE_TEMPLATE, getInvoiceTemplates);
}
