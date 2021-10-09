import * as types from './types';
import {isEmpty} from '@/constants';

const initialState = {
  invoices: [],
  isSaving: false,
  isDeleting: false
};

export default function recurringInvoicesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_RECURRING_INVOICES_SUCCESS:
      if (payload.fresh) {
        return {...state, invoices: payload.invoices};
      }

      return {
        ...state,
        invoices: [...state.invoices, ...payload.invoices]
      };

    case types.ADD_RECURRING_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: [...[payload], ...state.invoices]
      };

    case types.UPDATE_RECURRING_INVOICE_SUCCESS:
      const invoiceData = payload;
      const invoiceList = [];

      if (isEmpty(state.invoices)) {
        return state;
      }

      state.invoices.map(invoice => {
        const {id} = invoice;
        let value = invoice;

        if (id === invoiceData.id) {
          value = invoiceData;
        }
        invoiceList.push(value);
      });

      return {...state, invoices: invoiceList};

    case types.REMOVE_RECURRING_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
