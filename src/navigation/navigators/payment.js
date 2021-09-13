import {routes} from '../routes';
import {generateStackNavigation} from '../actions';
import PaymentContainer from '../../features/payments/containers/Payment';

export const PaymentNavigator = {
  [routes.PAYMENT]: generateStackNavigation(routes.PAYMENT, PaymentContainer)
};
