import InvoiceContainer from '../../features/invoices/containers/Invoice';
import InvoiceItemContainer from '../../features/invoices/containers/Item';
import { ROUTES } from "../routes";
import { generateStackNavigation } from "../actions";

export const InvoiceNavigator = {

    [ROUTES.INVOICE]: generateStackNavigation(
        ROUTES.INVOICE,
        InvoiceContainer,
    ),
    [ROUTES.INVOICE_ITEM]: generateStackNavigation(
        ROUTES.INVOICE_ITEM,
        InvoiceItemContainer,
    ),
}
