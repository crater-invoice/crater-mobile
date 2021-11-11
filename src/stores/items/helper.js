import * as InvoicesAction from 'stores/invoice/actions';
import * as EstimatesAction from 'stores/estimate/actions';
import * as RecurringInvoicesAction from 'stores/recurring-invoice/actions';
import * as itemAction from './actions';

export const itemActions = {
  item: {
    addItem: itemAction.addItem,
    setItems: itemAction.updateItem,
    removeItem: itemAction.removeItem
  },
  invoice: {
    addItem: InvoicesAction.addInvoiceItem,
    setItems: InvoicesAction.setInvoiceItems,
    removeItem: InvoicesAction.removeInvoiceItem
  },
  estimate: {
    addItem: EstimatesAction.addEstimateItem,
    setItems: EstimatesAction.setEstimateItems,
    removeItem: EstimatesAction.removeEstimateItem
  },
  recurring_invoice: {
    addItem: RecurringInvoicesAction.addRecurringInvoiceItem,
    setItems: RecurringInvoicesAction.setRecurringInvoiceItems,
    removeItem: RecurringInvoicesAction.removeRecurringInvoiceItem
  }
};
