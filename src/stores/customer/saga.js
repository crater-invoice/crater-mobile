import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {fetchCurrencies} from 'stores/company/saga';
import {fetchCountries} from 'stores/common/saga';
import {modalTypes} from '../custom-field/helpers';

/**
 * Fetch customers saga
 * @returns {IterableIterator<*>}
 */
export function* fetchCustomers({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchCustomers, queryString);
    yield put({
      type: types.FETCH_CUSTOMERS_SUCCESS,
      payload: {customers: response?.data, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single customer saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleCustomer({payload}) {
  try {
    yield call(fetchCountries);
    yield call(fetchCurrencies);
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.CUSTOMER, limit: 'all'}}
    });
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleCustomer, id);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Fetch customer initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchCustomerInitialDetails({payload}) {
  yield call(fetchCountries);
  yield call(fetchCurrencies);
  yield call(fetchCustomFields, {
    payload: {queryString: {type: modalTypes.CUSTOMER, limit: 'all'}}
  });
  payload?.();
}

/**
 * Add customer saga
 * @returns {IterableIterator<*>}
 */
function* addCustomer({payload}) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addCustomer, params);
    yield put({type: types.ADD_CUSTOMER_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.customer_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update customer saga
 * @returns {IterableIterator<*>}
 */
function* updateCustomer({payload}) {
  const {id, params} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateCustomer, id, params);
    yield put({type: types.UPDATE_CUSTOMER_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.customer_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove customer saga
 * @returns {IterableIterator<*>}
 */
function* removeCustomer({payload}) {
  try {
    const {id} = payload;
    yield put(spinner('isDeleting', true));
    yield call(req.removeCustomer, id);
    yield put({type: types.REMOVE_CUSTOMER_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.customer_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* customerSaga() {
  yield takeLatest(types.FETCH_CUSTOMERS, fetchCustomers);
  yield takeLatest(types.FETCH_SINGLE_CUSTOMER, fetchSingleCustomer);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchCustomerInitialDetails);
  yield takeLatest(types.ADD_CUSTOMER, addCustomer);
  yield takeLatest(types.UPDATE_CUSTOMER, updateCustomer);
  yield takeLatest(types.REMOVE_CUSTOMER, removeCustomer);
}
