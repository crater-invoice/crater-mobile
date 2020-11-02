import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import { customerTriggerSpinner, setCustomers, setCountries } from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe } from '@/constants';
import { getTitleByLanguage } from '@/utils';
import * as TYPES from '../constants';

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

function* getCustomers({ payload }) {
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
    } catch (error) {
    } finally {
    }
}

function* getCountries({ payload: { onResult } }) {
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

function* createCustomer({ payload }) {
    const {
        params: {
            website,
            phone,
            name,
            email,
            enable_portal,
            billingAddress,
            shippingAddress,
            contact_name,
            currency_id,
            password,
            customFields
        },
        onResult
    } = payload;

    let addresses = [];

    if (
        typeof billingAddress !== 'undefined' &&
        (billingAddress && Object.keys(billingAddress).length !== 0)
    ) {
        let billing = addressParams(billingAddress, 'BILLING');
        addresses.push(billing);
    }
    if (
        typeof shippingAddress !== 'undefined' &&
        (shippingAddress && Object.keys(shippingAddress).length !== 0)
    ) {
        let shipping = addressParams(shippingAddress, 'SHIPPING');
        addresses.push(shipping);
    }

    yield put(customerTriggerSpinner({ customerLoading: true }));

    try {
        const options = {
            path: `customers`,
            body: {
                name,
                currency_id,
                email,
                phone,
                contact_name,
                website,
                enable_portal,
                password,
                addresses,
                customFields
            }
        };

        const response = yield call([Request, 'post'], options);

        if (response.error) {
            alertMe({
                desc: getTitleByLanguage('customers.alertEmailAlreadyInUse')
            });
        }

        onResult?.(response.customer);
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* editCustomer({ payload }) {
    const {
        params: {
            website,
            phone,
            name,
            email,
            enable_portal,
            password,
            billingAddress,
            shippingAddress,
            contact_name,
            currency_id,
            id,
            customFields
        },
        navigation
    } = payload;

    let addresses = [];

    if (
        typeof billingAddress !== 'undefined' &&
        (billingAddress && Object.keys(billingAddress).length !== 0)
    ) {
        let billing = addressParams(billingAddress, 'BILLING');
        addresses.push(billing);
    }
    if (
        typeof shippingAddress !== 'undefined' &&
        (shippingAddress && Object.keys(shippingAddress).length !== 0)
    ) {
        let shipping = addressParams(shippingAddress, 'SHIPPING');
        addresses.push(shipping);
    }

    yield put(customerTriggerSpinner({ customerLoading: true }));

    try {
        const options = {
            path: `customers/${id}`,
            body: {
                name,
                currency_id,
                email,
                phone,
                contact_name,
                website,
                enable_portal,
                password,
                addresses,
                customFields
            }
        };

        const response = yield call([Request, 'put'], options);

        if (response.error) {
            alertMe({
                desc: getTitleByLanguage('customers.alertEmailAlreadyInUse')
            });
        }

        if (response.success) {
            navigation.navigate(ROUTES.MAIN_CUSTOMERS);
        }
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* getEditCustomer({ payload: { id, onResult } }) {
    yield put(customerTriggerSpinner({ getEditCustomerLoading: true }));

    try {
        const options = {
            path: `customers/${id}`,
            body: [id]
        };

        const response = yield call([Request, 'get'], options);

        onResult?.(response.customer);
    } catch (e) {
    } finally {
        yield put(customerTriggerSpinner({ getEditCustomerLoading: false }));
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
    yield takeLatest(TYPES.CREATE_CUSTOMER, createCustomer);
    yield takeLatest(TYPES.EDIT_CUSTOMER, editCustomer);
    yield takeLatest(TYPES.GET_EDIT_CUSTOMER, getEditCustomer);
    yield takeLatest(TYPES.REMOVE_CUSTOMER, removeCustomer);
}
