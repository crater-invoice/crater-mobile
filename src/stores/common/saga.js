import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';

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

export default function* commonSaga() {
  yield takeEvery(
    types.FETCH_TAX_AND_DISCOUNT_PER_ITEM,
    fetchTaxAndDiscountPerItem
  );
}
