import {
    CUSTOMERS_TRIGGER_SPINNER,
    SET_CUSTOMERS,
    SET_COUNTRIES
} from '../constants';

const formatCustomers = customers => {
    let customerList = [];
    if (typeof customers !== 'undefined' && customers.length != 0) {
        customerList = customers.map(customer => {
            return {
                title: customer.name,
                subtitle: {
                    title: customer.contact_name || ''
                },
                leftAvatar: customer.name.toUpperCase().charAt(0),
                fullItem: customer
            };
        });
    }
    return customerList;
};

const initialState = {
    customers: [],
    countries: [],
    errors: null,
    loading: {
        customerLoading: false,
        countriesLoading: false
    }
};

export default function customersReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {
        case SET_CUSTOMERS:
            let { customers, fresh } = payload;
            let customerList = formatCustomers(customers);
            if (!fresh) {
                return {
                    ...state,
                    customers: [...state.customers, ...customerList]
                };
            }

            return { ...state, customers: customerList };

        case SET_COUNTRIES:
            return { ...state, ...payload };

        case CUSTOMERS_TRIGGER_SPINNER:
            return { ...state, loading: { ...payload } };

        default:
            return state;
    }
}
