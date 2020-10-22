import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    GET_CUSTOMERS,
    GET_COUNTRIES,
    CREATE_CUSTOMER,
    EDIT_CUSTOMER,
    GET_EDIT_CUSTOMER,
    REMOVE_CUSTOMER,
    // Endpoint Api URL
    GET_CUSTOMERS_URL,
    GET_COUNTRIES_URL,
    CREATE_CUSTOMER_URL,
    EDIT_CUSTOMER_URL,
    GET_EDIT_CUSTOMER_URL,
    REMOVE_CUSTOMER_URL
} from '../constants';

import {
    customerTriggerSpinner,
    setCustomers,
    setCountries,
    setCreateCustomer,
    setEditCustomer,
    setRemoveCustomer
} from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe } from '@/constants';
import { getTitleByLanguage } from '@/utils';

const addressParams = (address, type) => {
    let params = {
        name: address.name ? address.name : null,
        address_street_1: address.address_street_1
            ? address.address_street_1
            : null,
        address_street_2: address.address_street_2
            ? address.address_street_2
            : null,
        city: address.city ? address.city : null,
        state: address.state ? address.state : null,
        country_id: address.country_id ? address.country_id : null,
        zip: address.zip ? address.zip : null,
        phone: address.phone ? address.phone : null,
        type: type
    };
    return params;
};

function* getCustomers({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: GET_CUSTOMERS_URL(queryString)
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

function* getCountries(payloadData) {
    const {
        payload: { onResult }
    } = payloadData;

    yield put(customerTriggerSpinner({ countriesLoading: true }));

    try {
        const options = {
            path: GET_COUNTRIES_URL()
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response);
        yield put(setCountries({ countries: response.countries }));
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ countriesLoading: false }));
    }
}

function* createCustomer(payloadData) {
    const {
        payload: {
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
            onResult,
            navigation
        }
    } = payloadData;

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
            path: CREATE_CUSTOMER_URL(),
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

        yield put(setCreateCustomer({ customers: [response.customer] }));
        onResult && onResult(response.customer);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* editCustomer(payloadData) {
    const {
        payload: {
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
        }
    } = payloadData;

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
            path: EDIT_CUSTOMER_URL(id),
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
            yield put(
                setEditCustomer({ customers: [response.customer], id: id })
            );
        }
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

function* getEditCustomer(payloadData) {
    const {
        payload: { id, onResult }
    } = payloadData;

    yield put(customerTriggerSpinner({ getEditCustomerLoading: true }));

    try {
        const options = {
            path: GET_EDIT_CUSTOMER_URL(id)
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.customer);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ getEditCustomerLoading: false }));
    }
}

function* removeCustomer(payloadData) {
    const {
        payload: { id, navigation }
    } = payloadData;

    yield put(customerTriggerSpinner({ customerLoading: true }));

    try {
        const options = {
            path: REMOVE_CUSTOMER_URL(id)
        };

        const response = yield call([Request, 'delete'], options);

        navigation.navigate(ROUTES.MAIN_CUSTOMERS);
        if (response.success) yield put(setRemoveCustomer({ id }));
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}

export default function* customersSaga() {
    yield takeLatest(GET_CUSTOMERS, getCustomers);
    yield takeLatest(GET_COUNTRIES, getCountries);
    yield takeLatest(CREATE_CUSTOMER, createCustomer);
    yield takeLatest(EDIT_CUSTOMER, editCustomer);
    yield takeLatest(GET_EDIT_CUSTOMER, getEditCustomer);
    yield takeLatest(REMOVE_CUSTOMER, removeCustomer);
}
