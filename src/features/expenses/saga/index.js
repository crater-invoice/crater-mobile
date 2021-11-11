import {call, put, takeEvery} from 'redux-saga/effects';
import Request from 'utils/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import {fetchCategories} from 'stores/category/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {fetchCustomers} from 'stores/customer/saga';
import {fetchCustomFields} from 'stores/custom-field/saga';
import {
  setExpenses,
  expenseTriggerSpinner,
  createFromExpense,
  updateFromExpense,
  removeFromExpense
} from '../actions';
import {routes} from '@/navigation';
import {modalTypes} from 'stores/custom-field/helpers';

function* getCreateExpense({payload: {onSuccess}}) {
  try {
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.EXPENSE, limit: 'all'}}
    });
    onSuccess?.();
  } catch (e) {}
}

function* getExpenses({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const options = {path: `expenses?${queryStrings.stringify(queryString)}`};
    const response = yield call([Request, 'get'], options);
    yield put(setExpenses({expenses: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* createExpense({payload}) {
  const {params, attachmentReceipt, navigation} = payload;
  yield put(expenseTriggerSpinner({expenseLoading: true}));
  try {
    const options = {
      path: `expenses`,
      body: params,
      withMultipartFormData: false
    };
    const response = yield call([Request, 'post'], options);
    if (attachmentReceipt && response?.data?.id) {
      const options2 = {
        path: `expenses/${response.data.id}/upload/receipts`,
        image: attachmentReceipt,
        type: 'create',
        imageName: 'attachment_receipt'
      };
      yield call([Request, 'post'], options2);
    }
    yield put(createFromExpense({expense: response.data}));
    navigation.navigate(routes.MAIN_EXPENSES);
    showNotification({message: t('notification.expense_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(expenseTriggerSpinner({expenseLoading: false}));
  }
}

function* updateExpense({payload}) {
  const {params, id, attachmentReceipt, navigation} = payload;
  yield put(expenseTriggerSpinner({expenseLoading: true}));
  try {
    const options = {
      path: `expenses/${id}`,
      body: {...params, _method: 'PUT'},
      withMultipartFormData: false
    };
    const response = yield call([Request, 'post'], options);
    if (attachmentReceipt && response?.data) {
      const options2 = {
        path: `expenses/${id}/upload/receipts`,
        image: attachmentReceipt,
        type: 'edit',
        imageName: 'attachment_receipt'
      };
      yield call([Request, 'post'], options2);
    }
    yield put(updateFromExpense({expense: response.data}));
    navigation.goBack(null);
    showNotification({message: t('notification.expense_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(expenseTriggerSpinner({expenseLoading: false}));
  }
}

function* getExpenseDetail({payload: {id, onSuccess}}) {
  try {
    const options = {path: `expenses/${id}`};
    const response = yield call([Request, 'get'], options);
    const options2 = {path: `expenses/${id}/show/receipt`, throw_error: false};
    const response2 = yield call([Request, 'get'], options2);
    yield call(fetchCustomers, {payload: {queryString: {limit: 'all'}}});
    yield call(fetchCategories, {payload: {queryString: {limit: 'all'}}});
    yield call(fetchCustomFields, {
      payload: {queryString: {type: modalTypes.EXPENSE, limit: 'all'}}
    });
    onSuccess?.(response.data, response2);
  } catch (e) {}
}

function* removeExpense({payload: {id, navigation}}) {
  yield put(expenseTriggerSpinner({expenseLoading: true}));
  try {
    const options = {path: `expenses/delete`, body: {ids: [id]}};
    yield call([Request, 'post'], options);
    yield put(removeFromExpense({id}));
    navigation.goBack(null);
    showNotification({message: t('notification.expense_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(expenseTriggerSpinner({expenseLoading: false}));
  }
}

export default function* expensesSaga() {
  yield takeEvery(TYPES.GET_CREATE_EXPENSE, getCreateExpense);
  yield takeEvery(TYPES.GET_EXPENSES, getExpenses);
  yield takeEvery(TYPES.CREATE_EXPENSE, createExpense);
  yield takeEvery(TYPES.GET_EXPENSE_DETAIL, getExpenseDetail);
  yield takeEvery(TYPES.UPDATE_EXPENSE, updateExpense);
  yield takeEvery(TYPES.REMOVE_EXPENSE, removeExpense);
}
