import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import {
    expenseTriggerSpinner,
    setExpenses,
    showImageOnEdit,
    createFromExpense,
    updateFromExpense,
    removeFromExpense
} from '../actions';
import { getCustomers } from '@/features/customers/saga';
import { getExpenseCategories } from '@/features/settings/saga/categories';
import { getCustomFields } from '@/features/settings/saga/custom-fields';
import { CUSTOM_FIELD_TYPES } from '@/features/settings/constants';
import { isArray } from '@/constants';

function* getCreateExpense({ payload: { onSuccess } }) {
    try {
        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.EXPENSE, limit: 'all' }
            }
        });

        onSuccess?.();
    } catch (e) {}
}

function* getExpenses({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `expenses?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.data) {
            const data = response.data;
            yield put(setExpenses({ expenses: data, fresh }));
        }

        onSuccess?.(response);
    } catch (e) {}
}

function* createExpense({ payload }) {
    const { params, attachmentReceipt, navigation } = payload;

    yield put(expenseTriggerSpinner({ expenseLoading: true }));

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

        if (response.data) {
            yield put(createFromExpense({ expense: response.data }));
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
            body: { ...params, _method: 'PUT' },
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

        if (response.data) {
            yield put(updateFromExpense({ expense: response.data }));
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

        const options2 = {
            path: `expenses/${id}/show/receipt`
        };

        const response2 = yield call([Request, 'get'], options2);

        yield call(getCustomers, {
            payload: { queryString: { limit: 'all' } }
        });

        yield call(getExpenseCategories, {
            payload: { queryString: { limit: 'all' } }
        });

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.EXPENSE, limit: 'all' }
            }
        });

        onSuccess?.(response.data, response2);
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
            yield put(removeFromExpense({ id }));
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(expenseTriggerSpinner({ expenseLoading: false }));
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
