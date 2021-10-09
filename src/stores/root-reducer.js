import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from '@/features/authentication/reducers';
import invoices from '@/features/invoices/reducers';
import estimates from '@/features/estimates/reducers';
import customers from '@/features/customers/reducers';
import payments from '@/features/payments/reducers';
import more from '@/features/more/reducers';
import settings from '@/features/settings/reducers';
import expenses from '@/features/expenses/reducers';
import company_old from '@/features/common/reducers';
import common from 'stores/common/reducer';
import roles from 'stores/roles/reducer';
import users from 'stores/users/reducer';
import company from 'stores/company/reducer';
import customizes from 'stores/customize/reducer';
import itemUnits from 'stores/item-units/reducer';
import paymentModes from 'stores/payment-modes/reducer';
import recurringInvoices from './recurring-invoices/reducer';

export default combineReducers({
  auth,
  invoices,
  estimates,
  customers,
  more,
  expenses,
  payments,
  form: formReducer,
  common,
  settings,
  company_old,
  roles,
  users,
  company,
  customizes,
  itemUnits,
  paymentModes,
  recurringInvoices
});
