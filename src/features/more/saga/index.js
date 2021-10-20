import {call, put, takeEvery} from 'redux-saga/effects';
import Request from 'utils/request';
import {moreTriggerSpinner, setItems, setItem, deleteItem} from '../actions';
import * as queryStrings from 'query-string';
import {fetchItemUnits} from 'stores/item-units/saga';
import {getSettingInfo} from '@/features/settings/saga/general';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {
  GET_ITEMS,
  ITEM_ADD,
  GET_EDIT_ITEM,
  ITEM_EDIT,
  REMOVE_ITEM,
  GET_MAIL_CONFIGURATION
} from '../constants';

function* getItems({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const options = {path: `items?${queryStrings.stringify(queryString)}`};
    const response = yield call([Request, 'get'], options);
    yield put(setItems({items: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* getEditItem({payload: {id, onResult}}) {
  try {
    const options = {path: `items/${id}`};
    const {data} = yield call([Request, 'get'], options);
    yield put(setItem({item: data}));
    yield call(fetchItemUnits, {payload: {queryString: {limit: 'all'}}});
    onResult?.(data);
  } catch (e) {}
}

function* addItem({payload: {item, onResult}}) {
  try {
    yield put(moreTriggerSpinner({itemLoading: true}));
    const options = {path: `items`, body: item};
    const {data} = yield call([Request, 'post'], options);
    yield put(setItems({items: [data], prepend: true}));
    onResult?.();
    showNotification({message: t('notification.item_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(moreTriggerSpinner({itemLoading: false}));
  }
}

function* editItem({payload: {item, id, onResult}}) {
  try {
    yield put(moreTriggerSpinner({itemLoading: true}));
    const options = {path: `items/${id}`, body: item};
    const {data} = yield call([Request, 'put'], options);
    yield put(deleteItem({id}));
    yield put(setItems({items: [data], prepend: true}));
    onResult?.();
    showNotification({message: t('notification.item_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(moreTriggerSpinner({itemLoading: false}));
  }
}

function* removeItem({payload: {id, onResult}}) {
  try {
    yield put(moreTriggerSpinner({itemLoading: true}));
    const options = {path: `items/delete`, body: {ids: [id]}};
    const response = yield call([Request, 'post'], options);
    yield put(deleteItem({id}));
    onResult?.(response);
    showNotification({message: t('notification.item_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(moreTriggerSpinner({itemLoading: false}));
  }
}

function* getMailConfiguration({payload: {body, onSuccess}}) {
  try {
    const options = {path: 'mail/config'};
    const emailConfig = yield call([Request, 'get'], options);
    const emailBody = yield call(getSettingInfo, {payload: {key: body}});
    onSuccess?.({...emailConfig, emailBody});
  } catch (e) {}
}

export default function* moreSaga() {
  yield takeEvery(GET_ITEMS, getItems);
  yield takeEvery(ITEM_ADD, addItem);
  yield takeEvery(ITEM_EDIT, editItem);
  yield takeEvery(REMOVE_ITEM, removeItem);
  yield takeEvery(GET_EDIT_ITEM, getEditItem);
  yield takeEvery(GET_MAIL_CONFIGURATION, getMailConfiguration);
}
