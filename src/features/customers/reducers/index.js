import { isArray } from '@/constants';
import {
    CUSTOMERS_TRIGGER_SPINNER,
    SET_CUSTOMERS,
    SET_COUNTRIES,
    UPDATE_FROM_CUSTOMERS
} from '../constants';

const formatCustomers = customers => {
    if (!isArray(customers)) {
        return [];
    }

    return customers.map(customer => {
        return {
            title: customer?.name,
            subtitle: {
                title: customer?.contact_name || ''
            },
            leftAvatar: customer?.name.toUpperCase().charAt(0),
            fullItem: customer
        };
    });
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
            const customerList = formatCustomers(payload?.customers);

            if (payload?.prepend) {
                return {
                    ...state,
                    customers: [...customerList, ...state.customers]
                };
            }

            if (payload?.remove) {
                const remainCustomers = state.customers.filter(
                    ({ fullItem }) => fullItem.id !== payload.id
                );

                return { ...state, customers: remainCustomers };
            }

            if (!payload?.fresh) {
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

        case UPDATE_FROM_CUSTOMERS: {
            const customerData = formatCustomers([payload.customer])[0]
            const customersDataList = []

            if (state.customers) {
                state.customers.map((customer) => {
                    const { id } = customer.fullItem
                    let value = customer

                    if (id === payload.customer.id) {
                        value = {
                            ...customerData
                        }
                    }
                    customersDataList.push(value)
                })
            }

            return {
                ...state,
                customers: customersDataList
            }
        }

        default:
            return state;
    }
}
