import {combineReducers} from 'redux';
import {createNavigationReducer} from 'react-navigation-redux-helpers';
import {reducer as formReducer} from 'redux-form';

import auth from '@/features/authentication/reducers';
import invoices from '@/features/invoices/reducers';
import estimates from '@/features/estimates/reducers';
import customers from '@/features/customers/reducers';
import payments from '@/features/payments/reducers';
import more from '@/features/more/reducers';
import settings from '@/features/settings/reducers';
import expenses from '@/features/expenses/reducers';
import common from '@/features/common/reducers';
import global from 'stores/common/reducer';
import roles from 'stores/roles/reducer';
import users from 'stores/users/reducer';
import navigationData from '../navigation/reducers';
import Navigator from '../navigation/navigators';

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
  users,
  nav: createNavigationReducer(Navigator)
});
