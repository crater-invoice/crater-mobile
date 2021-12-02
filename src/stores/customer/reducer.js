import * as types from './types';

const initialState = {
  customers: [],
  isSaving: false,
  isDeleting: false
};

export default function customerReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_CUSTOMERS_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          customers: payload.customers,
          isSaving: false,
          isDeleting: false
        };
      }
      return {
        ...state,
        customers: [...state.customers, ...payload.customers]
      };

    case types.ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...[payload], ...state.customers]
      };

    case types.UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id === payload.id ? payload : customer
        )
      };

    case types.REMOVE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
