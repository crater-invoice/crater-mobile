import { all, takeEvery, select, put } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/src/constants';
import { NavigationActions } from 'react-navigation';
import auth from '../features/authentication/saga';
import invoices from '../features/invoices/saga';
import estimates from '../features/estimates/saga';
import customers from '../features/customers/saga';
import expenses from '../features/expenses/saga';
import payments from '../features/payments/saga';
import settings from '../features/settings/saga';
import categories from '../features/categories/saga';
import items from '../features/items/saga';
import taxes from '../features/taxes/saga';
import more from '../features/more/saga';
import { ROUTES } from '../navigation/routes';
import { store } from '../store';
import moment from 'moment';

export default function* rootSaga() {
    yield takeEvery(REHYDRATE, function* boot() {
        const { routes } = yield select((state) => state.nav);
        const currentRoteBlock = routes[routes.length - 1];
        const currentRouteBlockName = currentRoteBlock.routeName;

        const reduxStore = store.getState();

        if (currentRouteBlockName !== ROUTES.AUTH) {
            yield put(NavigationActions.navigate({ routeName: ROUTES.MAIN_INVOICES }));
        } else {
            const { endpointApi, endpointURL } = reduxStore.global

            if (!endpointApi || !endpointURL) {
                yield put(NavigationActions.navigate({ routeName: ROUTES.ENDPOINTS }));
            }

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
            categories(),
            items(),
            taxes(),
        ]);
    });
}
