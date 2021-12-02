import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {showNotification, handleError} from '@/utils';
import t from 'locales/use-translation';
import {fetchTaxAndDiscountPerItem} from 'stores/common/actions';
import {navigation} from '@/navigation';
import {fetchCustomFields} from '../custom-field/saga';
import {modalTypes} from '../custom-field/helpers';

/**
 * Fetch items saga
 * @returns {IterableIterator<*>}
 */
function* fetchItems({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    yield put(fetchTaxAndDiscountPerItem());
    const response = yield call(req.fetchItems, queryString);
    const items = response?.data ?? [];
    yield put({type: types.FETCH_ITEMS_SUCCESS, payload: {items, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Add item saga
 * @returns {IterableIterator<*>}
 */
export function* addItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {item, onSuccess, returnCallback} = payload;
    const {data} = yield call(req.addItem, item);
    let items = {...data, item_id: data.id, ...item};
    const exchangePrice = item?.exchangePrice;
    yield put({type: types.ADD_ITEM_SUCCESS, payload: [items]});
    if (exchangePrice) {
      items = {...items, price: exchangePrice, total: exchangePrice};
    }
    showNotification({message: t('notification.item_created')});
    if (returnCallback) {
      return [items];
    }
    onSuccess?.([items]);
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update item saga
 * @returns {IterableIterator<*>}
 */
function* updateItem({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateItem, ...payload);
    yield put({type: types.UPDATE_ITEM_SUCCESS, payload: data});
    showNotification({message: t('notification.item_updated')});
    navigation.goBack();
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove item saga
 * @returns {IterableIterator<*>}
 */
function* removeItem({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id} = payload;
    yield call(req.removeItem, id);
    yield put({type: types.REMOVE_ITEM_SUCCESS, payload: id});
    showNotification({message: t('notification.item_deleted')});
    navigation.goBack();
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Fetch item initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchItemInitialDetails({payload}) {
  // yield call(fetchCustomFields, {
  //   payload: {queryString: {type: modalTypes.ITEM, limit: 'all'}}
  // });
  payload?.();
}

export default function* itemSaga() {
  yield takeLatest(types.FETCH_ITEMS, fetchItems);
  yield takeLatest(types.ADD_ITEM, addItem);
  yield takeLatest(types.UPDATE_ITEM, updateItem);
  yield takeLatest(types.REMOVE_ITEM, removeItem);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchItemInitialDetails);
}
