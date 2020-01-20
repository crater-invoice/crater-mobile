import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import Request from '../../../api/request';
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
    REMOVE_CUSTOMER_URL,
} from '../constants';

import {
    customerTriggerSpinner,
    setCustomers,
    setCountries,
    setCreateCustomer,
    setEditCustomer,
    setRemoveCustomer,
    setFilterCustomers,
} from '../actions';
import { ROUTES } from '../../../navigation/routes';
import { alertMe } from '../../../api/global';
import { getTitleByLanguage } from '../../../navigation/actions';


const addressParams = (address, type) => {
    let params = {
        name: address.name ? address.name : null,
        address_street_1: address.address_street_1 ? address.address_street_1 : null,
        address_street_2: address.address_street_2 ? address.address_street_2 : null,
        city: address.city ? address.city : null,
        state: address.state ? address.state : null,
        country_id: address.country_id ? address.country_id : null,
        zip: address.zip ? address.zip : null,
        phone: address.phone ? address.phone : null,
        type: type,
    }
    return params
}

function* getCustomers(payloadData) {
    const {
        payload: {
            onResult = null,
            fresh = true,
            onMeta = null,
            params = null,
            filter = false,
            pagination: { page = 1, limit = 10 } = {},
        } = {},
    } = payloadData;


    yield put(customerTriggerSpinner({ customersLoading: true }));

    try {

        let param = {
            ...params,
            page,
            limit
        }
        const options = {
            path: GET_CUSTOMERS_URL(param),
        };
        const response = yield call([Request, 'get'], options);

        if (!filter)
            yield put(setCustomers({ customers: response.customers.data, fresh }));

        else
            yield put(setFilterCustomers({ customers: response.customers.data, fresh }));

        onMeta && onMeta(response.customers);

        onResult && onResult(true);
    } catch (error) {
        onResult && onResult(false);
    } finally {
        yield put(customerTriggerSpinner({ customersLoading: false }));
    }
}

function* getCountries(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(customerTriggerSpinner({ countriesLoading: true }));

    try {

        const options = {
            path: GET_COUNTRIES_URL(),
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
            },
            onResult,
            navigation
        },
    } = payloadData;

    let addresses = []

    if (typeof billingAddress !== 'undefined' && (billingAddress && Object.keys(billingAddress).length !== 0)) {
        let billing = addressParams(billingAddress, "BILLING")
        addresses.push(billing)
    }
    if (typeof shippingAddress !== 'undefined' && (shippingAddress && Object.keys(shippingAddress).length !== 0)) {
        let shipping = addressParams(shippingAddress, "SHIPPING")
        addresses.push(shipping)
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
                addresses
            }
        };

        const response = yield call([Request, 'post'], options);

        if (response.error) {
            alertMe({ desc: getTitleByLanguage('customers.alertEmailAlreadyInUse') })
        }

        yield put(setCreateCustomer({ customers: [response.customer] }));
        onResult && onResult(response.customer)

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
                id
            },
            navigation
        },
    } = payloadData;

    let addresses = []

    if (typeof billingAddress !== 'undefined' && (billingAddress && Object.keys(billingAddress).length !== 0)) {
        let billing = addressParams(billingAddress, "BILLING")
        addresses.push(billing)
    }
    if (typeof shippingAddress !== 'undefined' && (shippingAddress && Object.keys(shippingAddress).length !== 0)) {
        let shipping = addressParams(shippingAddress, "SHIPPING")
        addresses.push(shipping)
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
                addresses
            }
        };

        const response = yield call([Request, 'put'], options);

        if (response.error) {
            alertMe({ desc: getTitleByLanguage('customers.alertEmailAlreadyInUse') })
        }

        if (response.success) {
            navigation.navigate(ROUTES.MAIN_CUSTOMERS)
            yield put(setEditCustomer({ customers: [response.customer], id: id }));
        }
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ customerLoading: false }));
    }
}



function* getEditCustomer(payloadData) {
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(customerTriggerSpinner({ getEditCustomerLoading: true }));

    try {

        const options = {
            path: GET_EDIT_CUSTOMER_URL(id),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.customer)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(customerTriggerSpinner({ getEditCustomerLoading: false }));
    }
}

function* removeCustomer(payloadData) {
    const {
        payload: { id, navigation },
    } = payloadData;

    yield put(customerTriggerSpinner({ customerLoading: true }));

    try {

        const options = {
            path: REMOVE_CUSTOMER_URL(id),
        };

        const response = yield call([Request, 'delete'], options);


        navigation.navigate(ROUTES.MAIN_CUSTOMERS)
        if (response.success)
            yield put(setRemoveCustomer({ id }));

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
