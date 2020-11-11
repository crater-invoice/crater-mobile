import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import { customerTriggerSpinner, setCustomers, setCountries, updateFromCustomers } from '../actions';
import { ROUTES } from '@/navigation';
import * as TYPES from '../constants';
import { hasObjectLength, isArray } from '@/constants';
import { getGeneralSetting } from '@/features/settings/saga/general';
import { getCustomFields } from '@/features/settings/saga/custom-fields';
import { CUSTOM_FIELD_TYPES } from '@/features/settings/constants';

const addressParams = (address, type) => {
    return {
        name: address?.name,
        address_street_1: address?.address_street_1,
        address_street_2: address?.address_street_2,
        city: address?.city,
        state: address?.state,
        country_id: address?.country_id,
        zip: address.zip,
        phone: address?.phone,
        type
    };
};

export function* getCustomers({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `customers?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.customers) {
            const { data } = response.customers;
            yield put(setCustomers({ customers: data, fresh }));
        }

        onSuccess?.(response?.customers);
    } catch (e) {}
}

export function* getCountries({ payload: { onResult = null } }) {
    yield put(customerTriggerSpinner({ countriesLoading: true }));

    try {
        const options = { path: 'countries' };

        const response = yield call([Request, 'get'], options);
        onResult?.(response);
        yield put(setCountries({ countries: response?.countries ?? [] }));
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ countriesLoading: false }));
    }
}

function* getCreateCustomer({ payload }) {
    const { currencies, countries, onSuccess } = payload;

    try {
        if (!isArray(countries)) {
            yield call(getCountries, { payload: {} });
        }

        if (!isArray(currencies)) {
            yield call(getGeneralSetting, { payload: { url: 'currencies' } });
        }

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.CUSTOMER, limit: 'all' }
            }
        });

        onSuccess?.();
    } catch (e) {}
}

function* createCustomer({ payload }) {
    const { params, onResult, submissionError } = payload;

    yield put(customerTriggerSpinner({ customerLoading: true }));

    let addresses = [];

    if (hasObjectLength(params?.billingAddress)) {
        addresses.push(addressParams(params?.billingAddress, 'BILLING'));
    }

    if (hasObjectLength(params?.shippingAddress)) {
        addresses.push(addressParams(params?.shippingAddress, 'SHIPPING'));
    }

    try {
        const options = {
            path: `customers`,
            body: { ...params, addresses }
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (response?.success) {
            yield put(
                setCustomers({ customers: [response.customer], prepend: true })
            );
            onResult?.(response.customer);
        }
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* updateCustomer({ payload }) {
    const { params, navigation, submissionError } = payload;

    yield put(customerTriggerSpinner({ customerLoading: true }));

    let addresses = [];

    if (hasObjectLength(params?.billingAddress)) {
        addresses.push(addressParams(params?.billingAddress, 'BILLING'));
    }

    if (hasObjectLength(params?.shippingAddress)) {
        addresses.push(addressParams(params?.shippingAddress, 'SHIPPING'));
    }

    try {
        const options = {
            path: `customers/${params.id}`,
            body: { ...params, addresses }
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (response.success) {
            yield put(updateFromCustomers({ customer: response.customer }))
            navigation.navigate(ROUTES.MAIN_CUSTOMERS);
        }
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* getCustomerDetail({ payload }) {
    const { id, onSuccess, currencies, countries } = payload;
    try {
        if (!isArray(countries)) {
            yield call(getCountries, { payload: {} });
        }

        if (!isArray(currencies)) {
            yield call(getGeneralSetting, { payload: { url: 'currencies' } });
        }

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.CUSTOMER, limit: 'all' }
            }
        });

        const options = { path: `customers/${id}` };
        const response = yield call([Request, 'get'], options);

        onSuccess?.(response.customer);
    } catch (e) {
    } finally {
    }
}

function* removeCustomer({ payload: { id, navigation } }) {
    yield put(customerTriggerSpinner({ customerLoading: true }));

    try {
        const options = {
            path: `customers/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response?.success) {
            yield put(setCustomers({ remove: true, id }));
            navigation.navigate(ROUTES.MAIN_CUSTOMERS);
        }
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
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
