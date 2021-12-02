import {call, put, takeLatest} from 'redux-saga/effects';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {modalTypes} from '../custom-field/helpers';
import {navigation} from '@/navigation';
import {fetchCurrencies} from '../company/saga';

/**
 * Fetch expense templates saga
 * @returns {IterableIterator<*>}
 */
function* fetchExpenseData() {
  try {
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.EXPENSE, limit: 'all'}}
    });
    yield call(fetchCurrencies);
  } catch (e) {}
}

/**
 * Fetch recurring expense initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchExpenseInitialDetails({payload}) {
  yield call(fetchExpenseData);
  payload?.();
}

/**
 * Fetch expenses saga
 * @returns {IterableIterator<*>}
 */
function* fetchExpenses({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchExpenses, queryString);
    const expenses = response?.data ?? [];
    yield put({
      type: types.FETCH_EXPENSES_SUCCESS,
      payload: {expenses, fresh}
    });
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single expense saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleExpense({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleExpense, id);
    yield call(fetchExpenseData);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add expense saga
 * @returns {IterableIterator<*>}
 */
function* addExpense({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, attachmentReceipt} = payload;
    const {data} = yield call(req.addExpense, params);
    if (attachmentReceipt && data?.id) {
      yield call(
        req.uploadAttachmentReceipt,
        data.id,
        attachmentReceipt,
        'create'
      );
    }
    yield put({type: types.ADD_EXPENSE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.expense_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update expense saga
 * @returns {IterableIterator<*>}
 */
function* updateExpense({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, id, attachmentReceipt} = payload;
    const {data} = yield call(req.updateExpense, id, params);
    if (attachmentReceipt) {
      yield call(req.uploadAttachmentReceipt, id, attachmentReceipt, 'edit');
    }
    yield put({type: types.UPDATE_EXPENSE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.expense_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove expense saga
 * @returns {IterableIterator<*>}
 */
function* removeExpense({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id, navigation} = payload;
    yield call(req.removeExpense, id);
    yield put({type: types.REMOVE_EXPENSE_SUCCESS, payload: id});
    navigation.goBack(null);
    showNotification({message: t('notification.expense_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* expenseSaga() {
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchExpenseInitialDetails);
  yield takeLatest(types.FETCH_EXPENSES, fetchExpenses);
  yield takeLatest(types.FETCH_SINGLE_EXPENSE, fetchSingleExpense);
  yield takeLatest(types.ADD_EXPENSE, addExpense);
  yield takeLatest(types.UPDATE_EXPENSE, updateExpense);
  yield takeLatest(types.REMOVE_EXPENSE, removeExpense);
}
