import {call, put, takeEvery} from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import {
  settingsTriggerSpinner as spinner,
  setExpenseCategories,
  setCreateExpenseCategories,
  setEditExpenseCategories,
  setRemoveExpenseCategories
} from '../../actions';
import {
  GET_EXPENSE_CATEGORIES,
  CREATE_EXPENSE_CATEGORY,
  GET_CREATE_EXPENSE_CATEGORY,
  EDIT_EXPENSE_CATEGORY,
  REMOVE_EXPENSE_CATEGORY
} from '../../constants';
import {routes} from '@/navigation';
import Request from 'utils/request';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

export function* getExpenseCategories({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const options = {
      path: `categories?${queryStrings.stringify(queryString)}`
    };
    const response = yield call([Request, 'get'], options);
    yield put(setExpenseCategories({categories: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* createExpenseCategory({payload: {params, onResult}}) {
  try {
    yield put(spinner({expenseCategoryLoading: true}));
    const options = {path: `categories`, body: params};
    const {data} = yield call([Request, 'post'], options);
    yield put(setCreateExpenseCategories({categories: [data]}));
    onResult?.(data);
    showNotification({message: t('notification.expense_category_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({expenseCategoryLoading: false}));
  }
}

function* getEditExpenseCategory({payload: {id, onResult}}) {
  try {
    yield put(spinner({initExpenseCategoryLoading: true}));
    const options = {
      path: `categories/${id}`
    };
    const {data} = yield call([Request, 'get'], options);
    onResult?.(data);
  } catch (e) {
  } finally {
    yield put(spinner({initExpenseCategoryLoading: false}));
  }
}

function* editExpenseCategory({payload: {id, params, navigation}}) {
  try {
    yield put(spinner({expenseCategoryLoading: true}));
    const options = {
      path: `categories/${id}`,
      body: params
    };
    const {data} = yield call([Request, 'put'], options);
    yield put(setEditExpenseCategories({categories: [data], id}));
    navigation.navigate(routes.CATEGORIES);
    showNotification({message: t('notification.expense_category_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({expenseCategoryLoading: false}));
  }
}

function* removeExpenseCategory({payload: {id, navigation, onResult}}) {
  try {
    yield put(spinner({expenseCategoryLoading: true}));
    const options = {
      path: `categories/${id}`
    };
    yield call([Request, 'delete'], options);
    navigation.navigate(routes.CATEGORIES);
    yield put(setRemoveExpenseCategories({id}));
    showNotification({message: t('notification.expense_category_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({expenseCategoryLoading: false}));
  }
}

export default function* categoriesSaga() {
  yield takeEvery(GET_EXPENSE_CATEGORIES, getExpenseCategories);
  yield takeEvery(CREATE_EXPENSE_CATEGORY, createExpenseCategory);
  yield takeEvery(GET_CREATE_EXPENSE_CATEGORY, getEditExpenseCategory);
  yield takeEvery(EDIT_EXPENSE_CATEGORY, editExpenseCategory);
  yield takeEvery(REMOVE_EXPENSE_CATEGORY, removeExpenseCategory);
}
