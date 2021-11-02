import {
  SET_PAYMENTS,
  PAYMENTS_TRIGGER_SPINNER,
  SAVE_UNPAID_INVOICES,
  CREATE_FROM_PAYMENTS,
  UPDATE_FROM_PAYMENTS,
  REMOVE_FROM_PAYMENTS
} from '../constants';

const initialState = {
  payments: [],
  errors: null,
  unPaidInvoices: [],
  loading: {
    paymentLoading: false,
    sendReceiptLoading: false,
    getUnpaidInvoicesLoading: false
  }
};

export default function paymentsReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case PAYMENTS_TRIGGER_SPINNER:
      return {...state, loading: {...payload}};

    case SET_PAYMENTS:
      let {payments, fresh} = payload;

      if (!fresh) {
        return {...state, payments: [...state.payments, ...payments]};
      }

      return {...state, payments};

    case SAVE_UNPAID_INVOICES:
      if (!payload.fresh) {
        return {
          ...state,
          unPaidInvoices: [...state.unPaidInvoices, ...payload.invoices]
        };
      }

      return {...state, unPaidInvoices: payload.invoices};

    case CREATE_FROM_PAYMENTS:
      return {
        ...state,
        payments: [...[payload.payment], ...state.payments]
      };

    case UPDATE_FROM_PAYMENTS: {
      const paymentData = payload.payment;
      const paymentsList = [];

      if (state.payments) {
        state.payments.map(payment => {
          const {id} = payment;
          let value = payment;

          if (id === paymentData.id) {
            value = {
              ...paymentData
            };
          }
          paymentsList.push(value);
        });
      }

      return {
        ...state,
        payments: paymentsList
      };
    }

    case REMOVE_FROM_PAYMENTS: {
      const id = payload.id;

      const filterPayment = state.payments.filter(payment => payment.id !== id);

      return {
        ...state,
        payments: filterPayment
      };
    }

    default:
      return state;
  }
}
