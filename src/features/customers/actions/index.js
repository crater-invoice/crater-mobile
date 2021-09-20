import {
  GET_CUSTOMERS,
  SET_CUSTOMERS,
  CUSTOMERS_TRIGGER_SPINNER,
  GET_COUNTRIES,
  SET_COUNTRIES,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_CUSTOMER_DETAIL,
  REMOVE_CUSTOMER,
  GET_CREATE_CUSTOMER,
  UPDATE_FROM_CUSTOMERS
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

export const getCreateCustomer = (payload = {}) => ({
  type: GET_CREATE_CUSTOMER,
  payload
});

export const createCustomer = (payload = {}) => ({
  type: CREATE_CUSTOMER,
  payload
});

export const updateCustomer = (payload = {}) => ({
  type: UPDATE_CUSTOMER,
  payload
});

export const getCustomerDetail = (payload = {}) => ({
  type: GET_CUSTOMER_DETAIL,
  payload
});

export const removeCustomer = (payload = {}) => ({
  type: REMOVE_CUSTOMER,
  payload
});

export const updateFromCustomers = (payload = {}) => ({
  type: UPDATE_FROM_CUSTOMERS,
  payload
});

export const getCountries = (payload = {}) => ({
  type: GET_COUNTRIES,
  payload
});

export const setCountries = (payload = {}) => ({
  type: SET_COUNTRIES,
  payload
});
