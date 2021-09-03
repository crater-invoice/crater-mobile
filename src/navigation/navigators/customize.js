import {ROUTES} from '../routes';
import {
  CustomizeList,
  CustomizeInvoice,
  CustomizeEstimate,
  CustomizePayment
} from 'screens/customize';
import {ItemUnits} from '/screens/item-units';
import {PaymentModes} from '/screens/payment-modes';
export const CustomizeNavigator = {
  [ROUTES.CUSTOMIZE_LIST]: generateStackNavigation(
    ROUTES.CUSTOMIZE_LIST,
    CustomizeList
  ),
  [ROUTES.CUSTOMIZE_INVOICE]: generateStackNavigation(
    ROUTES.CUSTOMIZE_INVOICE,
    CustomizeInvoice
  ),
  [ROUTES.CUSTOMIZE_ESTIMATE]: generateStackNavigation(
    ROUTES.CUSTOMIZE_ESTIMATE,
    CustomizeEstimate
  ),
  [ROUTES.CUSTOMIZE_PAYMENT]: generateStackNavigation(
    ROUTES.CUSTOMIZE_PAYMENT,
    CustomizePayment
  ),
  [ROUTES.PAYMENT_MODES]: generateStackNavigation(
    ROUTES.PAYMENT_MODES,
    ItemUnits
  ),
  [ROUTES.ITEM_UNITS]: generateStackNavigation(ROUTES.ITEM_UNITS, PaymentModes)
};
