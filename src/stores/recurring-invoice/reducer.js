import * as types from './types';

const initialState = {
  invoices: [],
  items: [],
  selectedItems: [],
  invoiceTemplates: [],
  isSaving: false,
  isDeleting: false
};

export default function recurringInvoiceReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_INVOICE_TEMPLATES_SUCCESS:
      return {...state, invoiceTemplates: payload};

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
      return {
        ...state,
        invoices: state.invoices.map(invoice =>
          invoice.id === payload.id ? payload : invoice
        )
      };

    case types.REMOVE_RECURRING_INVOICE_SUCCESS:
      return {
        ...state,
        invoices: state.invoices.filter(({id}) => id !== payload)
      };

    case types.ADD_RECURRING_INVOICE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItems: [...state.selectedItems, ...payload]
      };

    case types.REMOVE_RECURRING_INVOICE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItems: state.selectedItems.filter(({id}) => id !== payload)
      };

    case types.CLEAR_RECURRING_INVOICE:
      return {
        ...state,
        isSaving: false,
        isDeleting: false,
        selectedItems: []
      };

    default:
      return state;
  }
}
