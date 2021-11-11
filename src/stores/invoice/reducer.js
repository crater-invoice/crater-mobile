import {isEmpty} from '@/constants';
import * as types from './types';

const initialState = {
  invoices: [],
  isFetchingInitialData: false,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  invoiceData: {
    nextNumber: null,
    prefix: null,
    separator: null,
    invoice_auto_generate: null,
    invoiceTemplates: []
  },
  selectedItems: []
};

export default function invoiceReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_INVOICES_SUCCESS:
      if (payload.fresh) {
        return {...state, invoices: payload.invoices};
      }

      return {...state, invoices: [...state.invoices, ...payload.invoices]};

    case types.FETCH_INVOICE_DATA_SUCCESS:
      return {...state, invoiceData: payload};

    case types.ADD_INVOICE_SUCCESS:
      return {...state, invoices: [...[payload], ...state.invoices]};

    case types.UPDATE_INVOICE_SUCCESS:
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

    case types.REMOVE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(({id}) => id !== payload)
      };

    case types.ADD_INVOICE_ITEM_SUCCESS:
      return {...state, selectedItems: [...state.selectedItems, ...payload]};

    case types.REMOVE_INVOICE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(({id}) => id !== payload)
      };

    case types.CLEAR_INVOICE:
      return {
        ...state,
        selectedItems: [],
        isFetchingInitialData: false,
        isLoading: false,
        isDeleting: false,
        isSaving: false,
        invoiceData: {
          nextNumber: null,
          prefix: null,
          separator: null,
          invoice_auto_generate: null,
          invoiceTemplates: []
        }
      };

    default:
      return state;
  }
}
