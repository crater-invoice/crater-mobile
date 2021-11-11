import {all, takeEvery, select} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/src/constants';

import auth from 'stores/auth/saga';
import invoices from 'stores/invoices/saga';
import estimates from 'stores/estimates/saga';
import customers from 'stores/customers/saga';
import expenses from '@/features/expenses/saga';
import payments from '@/features/payments/saga';
import settings from '@/features/settings/saga';
import company from 'stores/company/saga';
import roles from 'stores/roles/saga';
import users from 'stores/users/saga';
import user from 'stores/user/saga';

import paymentModes from 'stores/payment-modes/saga';
import itemUnits from 'stores/item-units/saga';
import common from 'stores/common/saga';
import recurringInvoices from 'stores/recurring-invoices/saga';
import categories from 'stores/categories/saga';
import items from 'stores/items/saga';
import notes from 'stores/notes/saga';
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
      customers(),
      expenses(),
      payments(),
      settings(),
      company(),
      roles(),
      users(),
      user(),
      categories(),
      paymentModes(),
      itemUnits(),
      recurringInvoices(),
      items(),
      common(),
      notes(),
      taxes(),
      customField()
    ]);
  });
}
