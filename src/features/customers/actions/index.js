import {
    GET_CUSTOMERS,
    SET_CUSTOMERS,
    CUSTOMERS_TRIGGER_SPINNER,
    GET_COUNTRIES,
    SET_COUNTRIES,
    CREATE_CUSTOMER,
    SET_CREATE_CUSTOMER,
    EDIT_CUSTOMER,
    SET_EDIT_CUSTOMER,
    GET_EDIT_CUSTOMER,
    REMOVE_CUSTOMER,
    SET_REMOVE_CUSTOMER
} from '../constants';

export const getCustomers = (payload = {}) => ({
    type: GET_CUSTOMERS,
    payload
});

export const setCustomers = (payload = {}) => ({
    type: SET_CUSTOMERS,
    payload
});

export const customerTriggerSpinner = payload => ({
    type: CUSTOMERS_TRIGGER_SPINNER,
    payload
});

export const createCustomer = (payload = {}) => ({
    type: CREATE_CUSTOMER,
    payload
});

export const setCreateCustomer = (payload = {}) => ({
    type: SET_CREATE_CUSTOMER,
    payload
});

export const editCustomer = (payload = {}) => ({
    type: EDIT_CUSTOMER,
    payload
});

export const setEditCustomer = (payload = {}) => ({
    type: SET_EDIT_CUSTOMER,
    payload
});

export const setRemoveCustomer = payload => ({
    type: SET_REMOVE_CUSTOMER,
    payload
});

export const getEditCustomer = (payload = {}) => ({
    type: GET_EDIT_CUSTOMER,
    payload
});

export const removeCustomer = (payload = {}) => ({
    type: REMOVE_CUSTOMER,
    payload
});

// Address Country
// -----------------------------------------

export const getCountries = (payload = {}) => ({
    type: GET_COUNTRIES,
    payload
});

export const setCountries = (payload = {}) => ({
    type: SET_COUNTRIES,
    payload
});
