import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';

/**
 * Fetch items saga
 * @returns {IterableIterator<*>}
 */
function* fetchItems({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;

  try {
    const options = {
      path: `items?${queryStrings.stringify(queryString)}`
    };

    const response = yield call([Request, 'get'], options);

    if (response?.data) {
      const data = response.data;
      yield put(setItems({items: data, fresh}));
    }

    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single item saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleItem({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleitem, id);
    onSuccess?.(response?.data);
  } catch (e) {}
}

/**
 * Add item saga
 * @returns {IterableIterator<*>}
 */
function* addItem({payload: {item, onResult, setItems}}) {
  yield put(spinner({itemLoading: true}));

  try {
    const {price, name, description, taxes, unit_id} = item;

    const options = {
      path: `items`,
      body: {
        name,
        description,
        price,
        unit_id,
        taxes
      }
    };

    const response = yield call([Request, 'post'], options);

    const items = [
      {
        ...response.data,
        item_id: response.data.id,
        ...item
      }
    ];

    yield put(setItems({items}));

    onResult?.();
  } catch (e) {}
}

/**
 * Update item saga
 * @returns {IterableIterator<*>}
 */
function* updateItem({payload: {item, onResult}}) {
  try {
    const {price, name, description, item_id} = item;

    const options = {
      path: `items/${item_id}`,
      body: {
        name,
        description,
        price
      }
    };

    const response = yield call([Request, 'put'], options);

    const invoiceItem = [
      {
        ...response.item,
        ...item
      }
    ];

    yield put(removeInvoiceItem({id: invoiceItem.id}));

    yield put(setInvoiceItems({invoiceItem}));

    onResult?.();
  } catch (e) {}
}

/**
 * Remove item saga
 * @returns {IterableIterator<*>}
 */
function* removeItem({payload}) {
  try {
    yield put(removeInvoiceItem({id}));
    onResult?.();
  } catch (e) {}
}

export default function* itemsSaga() {
  yield takeLatest(types.FETCH_ITEMS, fetchItems);
  yield takeLatest(types.FETCH_SINGLE_ITEM, fetchSingleItem);
  yield takeLatest(types.ADD_ITEM, addItem);
  yield takeLatest(types.UPDATE_ITEM, updateItem);
  yield takeLatest(types.REMOVE_ITEM, removeItem);
}
