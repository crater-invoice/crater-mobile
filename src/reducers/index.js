import {combineReducers} from 'redux';
import auth from '../features/authentication/reducers';
import invoices from '../features/invoices/reducers';
import estimates from '../features/estimates/reducers';
import customers from '../features/customers/reducers';
import payments from '../features/payments/reducers';
import more from '../features/more/reducers';
import settings from '../features/settings/reducers';
import expenses from '../features/expenses/reducers';
import common from '../features/common/reducers';
import global from './global';
import roles from 'modules/roles/reducer';
import navigationData from '../navigation/reducers';
import {reducer as formReducer} from 'redux-form';
import Navigator from '../navigation/navigators';
import {createNavigationReducer} from 'react-navigation-redux-helpers';

export default combineReducers({
  auth,
  invoices,
  estimates,
  customers,
  more,
  expenses,
  payments,
  navigationData,
  form: formReducer,
  global,
  settings,
  common,
  roles,
  nav: createNavigationReducer(Navigator)
});
