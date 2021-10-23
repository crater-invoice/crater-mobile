import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {showNotification} from '@/utils';
import t from 'locales/use-translation';
import {PING_SUCCESS} from '@/features/authentication/constants';
import {routes} from '@/navigation';

/**
 * Fetch Tax And Discount Per item saga.
 * @returns {*}
 */
export function* fetchTaxAndDiscountPerItem() {
  try {
    const response = yield call(req.fetchTaxAndDiscountPerItem);
    yield put({
      type: types.FETCH_TAX_AND_DISCOUNT_PER_ITEM_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * Save endpoint url saga
 * @returns {IterableIterator<*>}
 */
function* saveEndpointURL({payload}) {
  const {url, navigation, onResult} = payload;
  try {
    yield call(req.pingUrl, url);
    yield put({type: types.SAVE_ENDPOINT_URL_SUCCESS, payload: url});
    yield put({type: PING_SUCCESS, payload: null});
    navigation.navigate(routes.LOGIN);
    onResult?.();
  } catch (e) {
    showNotification({message: t('endpoint.alertInvalidUrl'), type: 'error'});
    onResult?.();
  }
}

export default function* commonSaga() {
  yield takeEvery(types.SAVE_ENDPOINT_URL, saveEndpointURL);
  yield takeEvery(
    types.FETCH_TAX_AND_DISCOUNT_PER_ITEM,
    fetchTaxAndDiscountPerItem
  );
}
