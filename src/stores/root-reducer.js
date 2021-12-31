import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

import auth from 'stores/auth/reducer';
import invoice from 'stores/invoice/reducer';
import estimate from 'stores/estimate/reducer';
import customer from 'stores/customer/reducer';
import expense from 'stores/expense/reducer';
import payment from 'stores/payment/reducer';
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
import taxation from 'stores/taxation/reducer';
import customField from 'stores/custom-field/reducer';
import setting from 'stores/setting/reducer';

export default combineReducers({
  auth,
  invoice,
  estimate,
  customer,
  expense,
  payment,
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
  taxation,
  customField,
  setting,
  form: formReducer
});
