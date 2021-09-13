import InvoiceContainer from '../../features/invoices/containers/Invoice';
import InvoiceItemContainer from '../../features/invoices/containers/Item';
import {routes} from '../routes';
import {generateStackNavigation} from '../actions';

export const InvoiceNavigator = {
  [routes.INVOICE]: generateStackNavigation(routes.INVOICE, InvoiceContainer),
  [routes.INVOICE_ITEM]: generateStackNavigation(
    routes.INVOICE_ITEM,
    InvoiceItemContainer
  )
};
