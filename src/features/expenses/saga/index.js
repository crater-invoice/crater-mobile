import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import { expenseTriggerSpinner, setExpenses } from '../actions';
import { getCustomers } from '@/features/customers/saga';
import { getExpenseCategories } from '@/features/settings/saga/categories';

function* getExpenses({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `expenses?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.expenses) {
            const { data } = response.expenses;
            yield put(setExpenses({ expenses: data, fresh }));
        }

        onSuccess?.(response?.expenses);
    } catch (e) {}
}

function* createExpense({ payload }) {
    const { params, attachmentReceipt, navigation } = payload;

    yield put(expenseTriggerSpinner({ expenseLoading: true }));

    try {
        const options = {
            path: `expenses`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (attachmentReceipt && response?.expense?.id) {
            const options2 = {
                path: `expenses/${response.expense.id}/upload/receipts`,
                image: attachmentReceipt,
                type: 'create',
                imageName: 'attachment_receipt'
            };

            yield call([Request, 'post'], options2);
        }

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(expenseTriggerSpinner({ expenseLoading: false }));
    }
}

function* updateExpense({ payload }) {
    const { params, id, attachmentReceipt, navigation } = payload;

    yield put(expenseTriggerSpinner({ expenseLoading: true }));

    try {
        const options = {
            path: `expenses/${id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (attachmentReceipt && response?.expense) {
            const options2 = {
                path: `expenses/${id}/upload/receipts`,
                image: attachmentReceipt,
                type: 'edit',
                imageName: 'attachment_receipt'
            };

            yield call([Request, 'post'], options2);
        }

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(expenseTriggerSpinner({ expenseLoading: false }));
    }
}

function* getExpenseDetail({ payload: { id, onSuccess } }) {
    try {
        const options = { path: `expenses/${id}` };

        const response = yield call([Request, 'get'], options);

        yield call(getCustomers, {
            payload: { queryString: { limit: 'all' } }
        });

        yield call(getExpenseCategories, {
            payload: { queryString: { limit: 'all' } }
        });

        onSuccess?.(response.expense);
    } catch (e) {}
}

function* removeExpense({ payload: { id, navigation } }) {
    yield put(expenseTriggerSpinner({ expenseLoading: true }));

    try {
        const options = {
            path: `expenses/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(expenseTriggerSpinner({ expenseLoading: false }));
    }
}

export default function* expensesSaga() {
    yield takeEvery(TYPES.GET_EXPENSES, getExpenses);
    yield takeEvery(TYPES.CREATE_EXPENSE, createExpense);
    yield takeEvery(TYPES.GET_EXPENSE_DETAIL, getExpenseDetail);
    yield takeEvery(TYPES.UPDATE_EXPENSE, updateExpense);
    yield takeEvery(TYPES.REMOVE_EXPENSE, removeExpense);
}
