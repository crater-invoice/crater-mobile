import {
    CUSTOMERS_TRIGGER_SPINNER,
    SET_CUSTOMERS,
    SET_COUNTRIES,
    SET_CREATE_CUSTOMER,
    SET_EDIT_CUSTOMER,
    SET_REMOVE_CUSTOMER,
    SET_FILTER_CUSTOMERS
} from "../constants";

const formatCustomers = (customers) => {

    let customerList = []
    if (typeof customers !== 'undefined' && customers.length != 0) {
        customerList = customers.map((customer) => {

            return {
                title: customer.name,
                subtitle: {
                    title: customer.contact_name || '',
                },
                leftAvatar: customer.name.toUpperCase().charAt(0),
                fullItem: customer,
            }
        })
    }
    return customerList
}

const initialState = {
    customers: [],
    filterCustomers: [],
    countries: [],
    errors: null,
    loading: {
        customersLoading: false,
        customerLoading: false,
        getEditCustomerLoading: false,
        countriesLoading: false
    }
};

export default function customersReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {


        case SET_CUSTOMERS:

            let { customers, fresh } = payload;
            let customerList = formatCustomers(customers)
            if (!fresh) {
                return {
                    ...state,
                    customers: [...state.customers, ...customerList]
                };
            }

            return { ...state, customers: customerList };

        case SET_FILTER_CUSTOMERS:

            let filterCustomerList = formatCustomers(payload.customers)

            if (!payload.fresh) {
                return {
                    ...state,
                    filterCustomers: [...state.filterCustomers, ...filterCustomerList]
                };
            }

            return { ...state, filterCustomers: filterCustomerList };

        case SET_EDIT_CUSTOMER:

            let editCustomer = formatCustomers(payload.customers)

            const customersList = state.customers.filter(({ fullItem }) =>
                (fullItem.id !== payload.id))

            return {
                ...state,
                customers: [...editCustomer, ...customersList]
            };

        case SET_CREATE_CUSTOMER:

            let newCustomer = formatCustomers(payload.customers)

            return {
                ...state,
                customers: [...newCustomer, ...state.customers]
            };

        case SET_REMOVE_CUSTOMER:

            const remainCustomers = state.customers.filter(({ fullItem }) =>
                (fullItem.id !== payload.id))

            return { ...state, customers: remainCustomers };

        case SET_COUNTRIES:
            return { ...state, ...payload };

        case CUSTOMERS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        default:
            return state;
    }
}
