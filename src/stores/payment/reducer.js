import * as types from './types';

const initialState = {
  payments: [],
  paymentInvoices: [],
  isSaving: false,
  isDeleting: false,
  isLoading: false
};

export default function paymentReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_PAYMENTS_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          payments: payload.payments,
          paymentInvoices: [],
          isSaving: false,
          isDeleting: false,
          isLoading: false
        };
      }
      return {
        ...state,
        payments: [...state.payments, ...payload.payments]
      };

    case types.ADD_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: [...[payload], ...state.payments]
      };

    case types.UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.map(payment =>
          payment.id === payload.id ? payload : payment
        )
      };

    case types.REMOVE_PAYMENT_SUCCESS:
      return {
        ...state,
        payments: state.payments.filter(({id}) => id !== payload)
      };

    case types.FETCH_PAYMENT_INVOICES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          paymentInvoices: payload.paymentInvoices
        };
      }
      return {
        ...state,
        paymentInvoices: [...state.paymentInvoices, ...payload.paymentInvoices]
      };

    default:
      return state;
  }
}
