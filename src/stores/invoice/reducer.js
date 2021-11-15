import * as types from './types';

const initialState = {
  invoices: [],
  isFetchingInitialData: false,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  invoiceTemplates: [],
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

    case types.ADD_INVOICE_SUCCESS:
      return {...state, invoices: [...[payload], ...state.invoices]};

    case types.FETCH_INVOICE_TEMPLATES_SUCCESS:
      return {...state, invoiceTemplates: payload};

    case types.UPDATE_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === payload.id ? payload : invoice
        )
      };

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
        isSaving: false
      };

    default:
      return state;
  }
}
