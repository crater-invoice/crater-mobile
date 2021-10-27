import * as InvoicesAction from 'stores/invoices/actions';
import * as EstimatesAction from 'stores/estimates/actions';
import * as RecurringInvoicesAction from 'stores/recurring-invoices/actions';

export const itemActions = {
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
