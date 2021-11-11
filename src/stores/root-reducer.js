import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import auth from 'stores/auth/reducer';
import invoices from 'stores/invoices/reducer';
import estimates from 'stores/estimates/reducer';
import customer from 'stores/customer/reducer';
import payments from '@/features/payments/reducers';
import settings from '@/features/settings/reducers';
import expenses from '@/features/expenses/reducers';
import common from 'stores/common/reducer';
import role from 'stores/role/reducer';
import users from 'stores/users/reducer';
import user from 'stores/user/reducer';
import company from 'stores/company/reducer';
import itemUnit from 'stores/item-unit/reducer';
import paymentMode from 'stores/payment-mode/reducer';
import recurringInvoices from 'stores/recurring-invoices/reducer';
import items from 'stores/items/reducer';
import category from 'stores/category/reducer';
import note from 'stores/note/reducer';
import taxType from 'stores/tax-type/reducer';
import customField from 'stores/custom-field/reducer';

export default combineReducers({
  auth,
  invoices,
  estimates,
  customer,
  expenses,
  payments,
  form: formReducer,
  common,
  settings,
  role,
  users,
  user,
  company,
  itemUnit,
  paymentMode,
  recurringInvoices,
  items,
  category,
  note,
  taxType,
  customField
});
