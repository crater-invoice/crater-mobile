import Request from 'utils/request';
import {call, put, takeEvery} from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import {GET_TAXES, REMOVE_TAX, TAX_ADD, TAX_EDIT} from '../../constants';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  settingsTriggerSpinner as spinner,
  setTaxes,
  setTax,
  setEditTax,
  setRemoveTax
} from '../../actions';

function* getTaxTypes({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const options = {
      path: `tax-types?${queryStrings.stringify(queryString)}`
    };
    const response = yield call([Request, 'get'], options);
    yield put(setTaxes({taxTypes: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* addTax({payload: {tax, onResult}}) {
  try {
    yield put(spinner({addTaxLoading: true}));
    const options = {path: `tax-types`, body: tax};
    const {data} = yield call([Request, 'post'], options);
    yield put(setTax({taxType: [data]}));
    onResult?.(data);
    showNotification({message: t('notification.tax_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({addTaxLoading: false}));
  }
}

function* editTaxType({payload: {tax, onResult}}) {
  try {
    yield put(spinner({editTaxLoading: true}));
    const options = {path: `tax-types/${tax.id}`, body: tax};
    const response = yield call([Request, 'put'], options);
    yield put(setEditTax({taxType: [response.data], id: tax.id}));
    onResult?.(response);
    showNotification({message: t('notification.tax_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({editTaxLoading: false}));
  }
}

function* removeTax({payload: {id, onResult}}) {
  try {
    yield put(spinner({removeTaxLoading: true}));
    const options = {path: `tax-types/${id}`};
    yield call([Request, 'delete'], options);
    yield put(setRemoveTax({id}));
    onResult?.();
    showNotification({message: t('notification.tax_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({removeTaxLoading: false}));
  }
}

export default function* taxesSaga() {
  yield takeEvery(GET_TAXES, getTaxTypes);
  yield takeEvery(TAX_ADD, addTax);
  yield takeEvery(TAX_EDIT, editTaxType);
  yield takeEvery(REMOVE_TAX, removeTax);
}
