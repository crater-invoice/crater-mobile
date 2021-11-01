import t from 'locales/use-translation';

// Forms
// -----------------------------------------
export const CUSTOMER_SEARCH = 'customers/CUSTOMER_SEARCH';
export const CUSTOMER_FORM = 'customers/CUSTOMER_FORM';
export const CUSTOMER_ADDRESS = 'customers/CUSTOMER_ADDRESS';

// Types
// -----------------------------------------
export const GET_CUSTOMERS = 'customers/GET_CUSTOMERS';
export const SET_CUSTOMERS = 'customers/SET_CUSTOMERS';
export const CREATE_CUSTOMER = 'customers/CREATE_CUSTOMER';
export const UPDATE_CUSTOMER = 'customers/UPDATE_CUSTOMER';
export const GET_CREATE_CUSTOMER = 'customers/GET_CREATE_CUSTOMER';
export const GET_CUSTOMER_DETAIL = 'customers/GET_CUSTOMER_DETAIL';

export const CUSTOMERS_TRIGGER_SPINNER = 'customers/CUSTOMERS_TRIGGER_SPINNER';
export const REMOVE_CUSTOMER = 'customers/REMOVE_CUSTOMER';

export const UPDATE_FROM_CUSTOMERS = 'customers/UPDATE_FROM_CUSTOMERS';

export const ACTIONS_VALUE = {
  REMOVE: 'remove'
};

export const CUSTOMER_ACTIONS = () => {
  return [
    {
      label: t('customers.remove_customer'),
      value: ACTIONS_VALUE.REMOVE
    }
  ];
};
export const isAddress = object => {
  return object?.address_street_1 ||
    object?.address_street_2 ||
    object?.city ||
    object?.country_id ||
    object?.name ||
    object?.phone ||
    object?.state ||
    object?.zip
    ? true
    : false;
};
// Customer Fields
// -----------------------------------------
export const CUSTOMER_FIELDS = {
  NAME: 'name',
  CONTACT_NAME: 'contact_name',
  EMAIL: 'email',
  PHONE: 'phone',
  WEBSITE: 'website',
  CURRENCY: 'currency_id',
  BILLING: 'billingAddress',
  SHIPPING: 'shippingAddress',
  ENABLE_PORTAL: 'enable_portal',
  CUSTOM_FIELDS: 'customFields'
};
