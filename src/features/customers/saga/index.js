import {call, put, takeLatest} from 'redux-saga/effects';
import Request from 'utils/request';
import * as queryStrings from 'query-string';
import {routes} from '@/navigation';
import * as TYPES from '../constants';
import {isEmpty} from '@/constants';
import {getGeneralSetting} from '@/features/settings/saga/general';
import {getCustomFields} from '@/features/settings/saga/custom-fields';
import {CUSTOM_FIELD_TYPES} from '@/features/settings/constants';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  customerTriggerSpinner,
  setCustomers,
  setCountries,
  updateFromCustomers
} from '../actions';

const addressParams = address => {
  return {
    address_street_1: address?.address_street_1,
    address_street_2: address?.address_street_2,
    city: address?.city,
    country_id: address?.country_id,
    name: address?.name,
    phone: address?.phone,
    state: address?.state,
    zip: address?.zip,
    type: null
  };
};

export function* getCustomers({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const options = {path: `customers?${queryStrings.stringify(queryString)}`};
    const response = yield call([Request, 'get'], options);
    yield put(setCustomers({customers: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

export function* getCountries({payload: {onResult = null}}) {
  yield put(customerTriggerSpinner({countriesLoading: true}));
  try {
    const options = {path: 'countries'};
    const response = yield call([Request, 'get'], options);
    onResult?.(response);
    yield put(setCountries({countries: response?.data ?? []}));
  } catch (e) {
  } finally {
    yield put(customerTriggerSpinner({countriesLoading: false}));
  }
}

function* getCreateCustomer({payload}) {
  const {currencies, countries, onSuccess} = payload;
  try {
    if (isEmpty(countries)) {
      yield call(getCountries, {payload: {}});
    }
    if (isEmpty(currencies)) {
      yield call(getGeneralSetting, {payload: {url: 'currencies'}});
    }
    yield call(getCustomFields, {
      payload: {
        queryString: {type: CUSTOM_FIELD_TYPES.CUSTOMER, limit: 'all'}
      }
    });
    onSuccess?.();
  } catch (e) {}
}

function* createCustomer({payload}) {
  try {
    const {params, onResult} = payload;
    yield put(customerTriggerSpinner({customerLoading: true}));
    const bodyData = {
      ...params,
      billing: addressParams(params?.billingAddress),
      shipping: addressParams(params?.shippingAddress)
    };
    const options = {path: `customers`, body: bodyData};
    const {data} = yield call([Request, 'post'], options);
    yield put(setCustomers({customers: [data], prepend: true}));
    onResult?.(data);
    showNotification({message: t('notification.customer_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(customerTriggerSpinner({customerLoading: false}));
  }
}

function* updateCustomer({payload}) {
  try {
    const {params, navigation} = payload;
    yield put(customerTriggerSpinner({customerLoading: true}));
    const bodyData = {
      ...params,
      billing: addressParams(params?.billingAddress),
      shipping: addressParams(params?.shippingAddress)
    };
    const options = {path: `customers/${params.id}`, body: bodyData};
    const {data} = yield call([Request, 'put'], options);
    yield put(updateFromCustomers({customer: data}));
    yield navigation.navigate(routes.MAIN_CUSTOMERS);
    showNotification({message: t('notification.customer_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(customerTriggerSpinner({customerLoading: false}));
  }
}

function* getCustomerDetail({payload}) {
  const {id, onSuccess, currencies, countries} = payload;
  try {
    if (isEmpty(countries)) {
      yield call(getCountries, {payload: {}});
    }
    if (isEmpty(currencies)) {
      yield call(getGeneralSetting, {payload: {url: 'currencies'}});
    }
    yield call(getCustomFields, {
      payload: {
        queryString: {type: CUSTOM_FIELD_TYPES.CUSTOMER, limit: 'all'}
      }
    });
    const options = {path: `customers/${id}`};
    const response = yield call([Request, 'get'], options);
    onSuccess?.(response.data);
  } catch (e) {}
}

function* removeCustomer({payload: {id, navigation}}) {
  yield put(customerTriggerSpinner({customerLoading: true}));
  try {
    const options = {path: `customers/delete`, body: {ids: [id]}};
    yield call([Request, 'post'], options);
    yield put(setCustomers({remove: true, id}));
    navigation.navigate(routes.MAIN_CUSTOMERS);
    showNotification({message: t('notification.customer_deleted')});
  } catch (e) {
  } finally {
    yield put(customerTriggerSpinner({customerLoading: false}));
  }
}

export default function* customersSaga() {
  yield takeLatest(TYPES.GET_CUSTOMERS, getCustomers);
  yield takeLatest(TYPES.GET_COUNTRIES, getCountries);
  yield takeLatest(TYPES.GET_CREATE_CUSTOMER, getCreateCustomer);
  yield takeLatest(TYPES.CREATE_CUSTOMER, createCustomer);
  yield takeLatest(TYPES.UPDATE_CUSTOMER, updateCustomer);
  yield takeLatest(TYPES.GET_CUSTOMER_DETAIL, getCustomerDetail);
  yield takeLatest(TYPES.REMOVE_CUSTOMER, removeCustomer);
}
