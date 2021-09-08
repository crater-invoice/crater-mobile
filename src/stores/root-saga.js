import {all, takeEvery, select, put} from 'redux-saga/effects';
import {REHYDRATE} from 'redux-persist/src/constants';
import {NavigationActions} from 'react-navigation';

import auth from '@/features/authentication/saga';
import invoices from '@/features/invoices/saga';
import estimates from '@/features/estimates/saga';
import customers from '@/features/customers/saga';
import expenses from '@/features/expenses/saga';
import payments from '@/features/payments/saga';
import settings from '@/features/settings/saga';
import more from '@/features/more/saga';
import company from '@/features/common/saga';
import roles from 'stores/roles/saga';
import users from 'stores/users/saga';
import {ROUTES} from '@/navigation';
import {resetAuthLoaders} from '@/features/authentication/actions';
import {getActiveMainTab} from './common/helpers';
import {PermissionService} from '@/services';

export default function* rootSaga() {
  yield takeEvery(REHYDRATE, function* boot() {
    const reduxStore = yield select();
    const routes = reduxStore?.nav?.routes ?? [];
    const currentRoteBlock = routes[routes.length - 1];
    const currentRouteBlockName = currentRoteBlock.routeName;

    if (currentRouteBlockName !== ROUTES.AUTH) {
      const abilities = reduxStore?.common?.abilities;
      PermissionService.setPermissions(abilities);
      const tab = getActiveMainTab();
      yield put(NavigationActions.navigate({routeName: tab}));
    } else {
      const {endpointApi, endpointURL} = reduxStore.common;
      if (!endpointApi || !endpointURL) {
        yield put(NavigationActions.navigate({routeName: ROUTES.ENDPOINTS}));
      }
      yield put(resetAuthLoaders());
    }

    yield all([
      auth(),
      invoices(),
      estimates(),
      customers(),
      more(),
      expenses(),
      payments(),
      settings(),
      company(),
      roles(),
      users(),
      customize(),
      paymentModes(),
      itemUnits()
    ]);
  });
}
