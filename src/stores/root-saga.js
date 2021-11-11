import {all, takeEvery, select} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/src/constants';

import auth from 'stores/auth/saga';
import invoices from 'stores/invoices/saga';
import estimates from 'stores/estimates/saga';
import customer from 'stores/customer/saga';
import expenses from '@/features/expenses/saga';
import payments from '@/features/payments/saga';
import settings from '@/features/settings/saga';
import company from 'stores/company/saga';
import role from 'stores/role/saga';
import users from 'stores/users/saga';
import user from 'stores/user/saga';

import paymentMode from 'stores/payment-mode/saga';
import itemUnit from 'stores/item-unit/saga';
import common from 'stores/common/saga';
import recurringInvoices from 'stores/recurring-invoices/saga';
import category from 'stores/category/saga';
import items from 'stores/items/saga';
import note from 'stores/note/saga';
import taxes from 'stores/taxes/saga';
import customField from 'stores/custom-field/saga';
import {PermissionService} from '@/services';

export default function* rootSaga() {
  yield takeEvery(REHYDRATE, function* boot() {
    const reduxStore = yield select();
    const abilities = reduxStore?.user?.currentAbilities;
    PermissionService.setPermissions(abilities);

    yield all([
      auth(),
      invoices(),
      estimates(),
      customer(),
      expenses(),
      payments(),
      settings(),
      company(),
      role(),
      users(),
      user(),
      category(),
      paymentMode(),
      itemUnit(),
      recurringInvoices(),
      items(),
      common(),
      note(),
      taxes(),
      customField()
    ]);
  });
}
