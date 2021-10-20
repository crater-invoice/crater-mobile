import {
  SET_INVOICES,
  INVOICES_TRIGGER_SPINNER,
  SET_INVOICE_ITEMS,
  REMOVE_INVOICE_ITEM,
  SET_EDIT_INVOICE,
  REMOVE_INVOICE_ITEMS,
  CLEAR_INVOICE,
  SET_INVOICE,
  REMOVE_FROM_INVOICES,
  SET_RECURRING_INVOICES,
  UPDATE_FROM_INVOICES
} from '../constants';

const initialState = {
  invoices: [],
  filterInvoices: [],
  createInvoiceItem: {
    invoiceTemplates: []
  },
  isFetchingInitialData: false,
  isLoading: false,
  isDeleting: false,
  isSaving: false,
  invoiceData: {
    invoice: null,
    invoiceTemplates: []
  },
  selectedItems: []
};

export default function invoicesReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case SET_INVOICES:
      let {invoices, fresh, prepend} = payload;

      if (prepend) {
        return {...state, invoices: [...invoices, ...state.invoices]};
      }

      if (!fresh) {
        return {...state, invoices: [...state.invoices, ...invoices]};
      }

      return {...state, invoices};

    case CLEAR_INVOICE:
      return {
        ...state,
        selectedItems: [],
        invoiceData: {
          invoice: null,
          invoiceTemplates: []
        }
      };

    case SET_INVOICE:
      return {...state, invoiceData: payload};

    case SET_EDIT_INVOICE:
      return {...state, ...payload};

    case INVOICES_TRIGGER_SPINNER:
      return {...state, [payload.name]: payload.value};

    case SET_INVOICE_ITEMS:
      return {
        ...state,
        selectedItems: [...state.selectedItems, ...payload]
      };

    case REMOVE_INVOICE_ITEM:
      const {id} = payload;

      const selectedItems = state.selectedItems.filter(
        val => (val.item_id || val.id) !== id
      );

      return {...state, selectedItems};

    case REMOVE_INVOICE_ITEMS:
      return {...state, selectedItems: []};

    case REMOVE_FROM_INVOICES:
      const newInvoices = state.invoices.filter(val => val.id !== payload.id);

      return {...state, invoices: newInvoices};

    case SET_RECURRING_INVOICES:
      if (payload.prepend) {
        return {
          ...state,
          invoices: [...payload.invoices, ...state.invoices]
        };
      }

      if (!payload.fresh) {
        return {
          ...state,
          invoices: [...state.invoices, ...payload.invoices]
        };
      }

      return {...state, invoices: payload.invoices};

    case UPDATE_FROM_INVOICES: {
      const invoiceMainData = payload.invoice;

      const invoicesList = [];

      if (state.invoices) {
        state.invoices.map(invoice => {
          const {id} = invoice;
          let value = invoice;

          if (id === invoiceMainData.id) {
            value = {
              ...invoiceMainData
            };
          }
          invoicesList.push(value);
        });
      }

      return {
        ...state,
        invoices: invoicesList
      };
    }

    default:
      return state;
  }
}
