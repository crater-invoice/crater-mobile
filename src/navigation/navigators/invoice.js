import InvoiceContainer from '../../features/invoices/containers/Invoice';
import InvoiceItemContainer from '../../features/invoices/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";
import RecurringInvoicesContainer from '../../features/invoices/containers/RecurringInvoices';
import RecurringInvoiceContainer from '../../features/invoices/containers/RecurringInvoice';

export const InvoiceNavigator = {

    [ROUTES.INVOICE]: generateStackNavigation(
        ROUTES.INVOICE,
        InvoiceContainer,
    ),
    [ROUTES.INVOICE_ITEM]: generateStackNavigation(
        ROUTES.INVOICE_ITEM,
        InvoiceItemContainer,
    ),
    // Recurring Invoices
    // -----------------------------------------
    [ROUTES.RECURRING_INVOICES]: generateStackNavigation(
        ROUTES.RECURRING_INVOICES,
        RecurringInvoicesContainer,
    ),
    [ROUTES.RECURRING_INVOICE]: generateStackNavigation(
        ROUTES.RECURRING_INVOICE,
        RecurringInvoiceContainer,
    ),
}
