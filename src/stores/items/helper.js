import * as InvoicesAction from '@/features/invoices/actions';
import * as EstimatesAction from '@/features/estimates/actions';
import * as RecurringInvoicesAction from 'stores/recurring-invoices/actions';

export const itemActions = {
  invoice: {
    addItem: InvoicesAction.addItem,
    setItems: InvoicesAction.setInvoiceItems,
    removeItem: InvoicesAction.removeInvoiceItem
  },
  estimate: {
    addItem: EstimatesAction.addItem,
    setItems: EstimatesAction.setEstimateItems,
    removeItem: EstimatesAction.removeEstimateItem
  },
  recurring_invoice: {
    addItem: RecurringInvoicesAction.addRecurringInvoiceItem,
    setItems: RecurringInvoicesAction.setRecurringInvoiceItems,
    removeItem: RecurringInvoicesAction.removeRecurringInvoiceItem
  }
};
