import {routes} from '../routes';
import {generateStackNavigation} from '../actions';
import CustomerContainer from '../../features/customers/containers/Customer';

export const CustomerNavigator = {
  [routes.CUSTOMER]: generateStackNavigation(routes.CUSTOMER, CustomerContainer)
};
