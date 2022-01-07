import {call, put, takeLatest, takeEvery, select} from 'redux-saga/effects';
import {routes} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {fetchTaxAndDiscountPerItem} from 'stores/common/actions';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {FETCH_INVOICES_SUCCESS} from '../invoice/types';
import {addItem} from '../item/saga';
import {modalTypes} from '../custom-field/helpers';
import {isEmpty} from '@/constants';
import {selectedCompanySalesTaxSettingSelector} from '../company/selectors';

/**
 * Fetch estimate templates saga
 * @returns {IterableIterator<*>}
 */
function* fetchEstimateTemplates() {
  const state = yield select();
  if (isEmpty(state.estimate?.estimateTemplates)) {
    const {estimateTemplates} = yield call(req.fetchEstimateTemplates);
    yield put({
      type: types.FETCH_ESTIMATE_TEMPLATES_SUCCESS,
      payload: estimateTemplates
    });
  }
}

/**
 * Fetch estimate templates saga
 * @returns {IterableIterator<*>}
 */
function* fetchEstimateData() {
  try {
    yield put({type: types.CLEAR_ESTIMATE});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.ESTIMATE, limit: 'all'}}
    });
    yield call(fetchEstimateTemplates);
  } catch (e) {}
}

/**
 * Fetch recurring estimate initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchEstimateInitialDetails({payload}) {
  yield call(fetchEstimateData);
  yield put(fetchTaxAndDiscountPerItem());
  const params = {key: 'estimate'};
  const {nextNumber} = yield call(req.fetchNextEstimateNumber, params);
  payload?.(nextNumber);
}

/**
 * Fetch next estimate number saga
 * @returns {IterableIterator<*>}
 */
function* fetchNextEstimateNumber({payload = {}}) {
  try {
    const {userId = null, model_id = null, onSuccess} = payload;
    const params = {key: 'estimate', userId, model_id};
    const {nextNumber} = yield call(req.fetchNextEstimateNumber, params);
    onSuccess?.(nextNumber);
  } catch (e) {}
}

/**
 * Fetch estimates saga
 * @returns {IterableIterator<*>}
 */
function* fetchEstimates({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchEstimates, queryString);
    const estimates = response?.data ?? [];
    yield put({
      type: types.FETCH_ESTIMATES_SUCCESS,
      payload: {estimates, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single estimate saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleEstimate({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleEstimate, id);
    yield call(fetchEstimateData);
    yield put({
      type: types.ADD_ESTIMATE_ITEM_SUCCESS,
      payload: data?.items ?? []
    });
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add estimate saga
 * @returns {IterableIterator<*>}
 */
function* addEstimate({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {estimate, onSuccess} = payload;
    const salesTaxSettings = yield select(
      selectedCompanySalesTaxSettingSelector
    );
    const params = {...estimate, ...salesTaxSettings};
    const {data} = yield call(req.addEstimate, params);
    yield put({type: types.ADD_ESTIMATE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.estimate_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update estimate saga
 * @returns {IterableIterator<*>}
 */
function* updateEstimate({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {estimate, onSuccess} = payload;
    const {data} = yield call(req.updateEstimate, estimate.id, estimate);
    yield put({type: types.UPDATE_ESTIMATE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.estimate_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove estimate saga
 * @returns {IterableIterator<*>}
 */
function* removeEstimate({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, navigation} = payload;
    yield call(req.removeEstimate, id);
    yield put({type: types.REMOVE_ESTIMATE_SUCCESS, payload: id});
    navigation.goBack(null);
    showNotification({message: t('notification.estimate_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Add estimate item saga
 * @returns {IterableIterator<*>}
 */
function* addEstimateItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess} = payload;
    const items = yield call(addItem, {payload: {item, returnCallback: true}});
    yield put({type: types.ADD_ESTIMATE_ITEM_SUCCESS, payload: items ?? []});
    onSuccess?.();
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove estimate item saga
 * @returns {IterableIterator<*>}
 */
function* removeEstimateItem({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield put({type: types.REMOVE_ESTIMATE_ITEM_SUCCESS, payload: id});
  } catch (e) {
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Convert to invoice saga
 * @returns {IterableIterator<*>}
 */
function* convertToInvoice({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.convertToInvoice, id);
    yield put({type: FETCH_INVOICES_SUCCESS, payload: {invoices: [data]}});
    onSuccess?.();
    showNotification({message: t('notification.invoice_created')});
  } catch (e) {}
}

/**
 * Change estimate status saga
 * @returns {IterableIterator<*>}
 */
function* changeEstimateStatus({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {onSuccess = null, params, action, navigation} = payload;
    yield call(req.changeEstimateStatus, action, params);
    onSuccess?.();
    navigation.navigate(routes.ESTIMATES);
  } catch (e) {
  } finally {
    yield put(spinner('isLoading', false));
  }
}

/**
 * Send estimate saga
 * @returns {IterableIterator<*>}
 */
function* sendEstimate({payload}) {
  try {
    yield put(spinner('isLoading', true));
    const {id, params, onSuccess} = payload;
    const response = yield call(req.sendEstimate, id, params);
    onSuccess?.(response);
    showNotification({message: t('notification.estimate_sent')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isLoading', false));
  }
}

export default function* estimateSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchEstimateInitialDetails);
  yield takeEvery(types.FETCH_NEXT_ESTIMATE_NUMBER, fetchNextEstimateNumber);
  yield takeLatest(types.FETCH_ESTIMATES, fetchEstimates);
  yield takeLatest(types.FETCH_SINGLE_ESTIMATE, fetchSingleEstimate);
  yield takeLatest(types.ADD_ESTIMATE, addEstimate);
  yield takeLatest(types.UPDATE_ESTIMATE, updateEstimate);
  yield takeLatest(types.REMOVE_ESTIMATE, removeEstimate);
  yield takeLatest(types.ADD_ESTIMATE_ITEM, addEstimateItem);
  yield takeLatest(types.REMOVE_ESTIMATE_ITEM, removeEstimateItem);
  yield takeEvery(types.CONVERT_TO_INVOICE, convertToInvoice);
  yield takeEvery(types.CHANGE_ESTIMATE_STATUS, changeEstimateStatus);
  yield takeEvery(types.SEND_ESTIMATE, sendEstimate);
}
