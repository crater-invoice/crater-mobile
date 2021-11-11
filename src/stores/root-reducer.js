import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from 'stores/auth/reducer';
import invoices from 'stores/invoices/reducer';
import estimates from 'stores/estimates/reducer';
import customers from 'stores/customers/reducer';
import payments from '@/features/payments/reducers';
import more from '@/features/more/reducers';
import settings from '@/features/settings/reducers';
import expenses from '@/features/expenses/reducers';
import common from 'stores/common/reducer';
import roles from 'stores/roles/reducer';
import users from 'stores/users/reducer';
import user from 'stores/user/reducer';
import company from 'stores/company/reducer';
import itemUnits from 'stores/item-units/reducer';
import paymentModes from 'stores/payment-modes/reducer';
import recurringInvoices from 'stores/recurring-invoices/reducer';
import items from 'stores/items/reducer';
import categories from 'stores/categories/reducer';
import notes from 'stores/notes/reducer';
import taxes from 'stores/taxes/reducer';
import customField from 'stores/custom-field/reducer';

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
  roles,
  users,
  user,
  company,
  itemUnits,
  paymentModes,
  recurringInvoices,
  items,
  categories,
  notes,
  taxes,
  customField
});
