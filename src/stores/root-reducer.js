import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from 'stores/auth/reducer';
import invoice from 'stores/invoice/reducer';
import estimate from 'stores/estimate/reducer';
import customer from 'stores/customer/reducer';
import payments from '@/features/payments/reducers';
import expenses from '@/features/expenses/reducers';
import common from 'stores/common/reducer';
import role from 'stores/role/reducer';
import users from 'stores/users/reducer';
import user from 'stores/user/reducer';
import company from 'stores/company/reducer';
import itemUnit from 'stores/item-unit/reducer';
import paymentMode from 'stores/payment-mode/reducer';
import recurringInvoice from 'stores/recurring-invoice/reducer';
import item from 'stores/item/reducer';
import category from 'stores/category/reducer';
import note from 'stores/note/reducer';
import taxType from 'stores/tax-type/reducer';
import customField from 'stores/custom-field/reducer';

export default combineReducers({
  auth,
  invoice,
  estimate,
  customer,
  expenses,
  payments,
  common,
  role,
  users,
  user,
  company,
  itemUnit,
  paymentMode,
  recurringInvoice,
  item,
  category,
  note,
  taxType,
  customField,
  form: formReducer
});
