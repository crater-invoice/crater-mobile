import { call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
} from '../../settings/actions';
import {
    setExpenseCategories,
    setCreateExpenseCategories,
    setEditExpenseCategories,
    setRemoveExpenseCategories,
} from '../actions';

import {
    GET_EXPENSE_CATEGORIES,
    CREATE_EXPENSE_CATEGORY,
    GET_CREATE_EXPENSE_CATEGORY,
    EDIT_EXPENSE_CATEGORY,
    REMOVE_EXPENSE_CATEGORY,
    // Endpoint Api URL
    GET_EXPENSE_CATEGORIES_URL,
    CREATE_EXPENSE_CATEGORIES_URL,
    GET_EDIT_EXPENSE_CATEGORIES_URL,
    EDIT_EXPENSE_CATEGORIES_URL,
    REMOVE_EXPENSE_CATEGORIES_URL,
} from '../constants';

import Request from '../../../api/request';
import { ROUTES } from '../../../navigation/routes';


function* getExpenseCategories(payloadData) {

    yield put(settingsTriggerSpinner({ expensesCategoryLoading: true }));

    try {

        const options = {
            path: GET_EXPENSE_CATEGORIES_URL(),
        };

        const response = yield call([Request, 'get'], options);
        yield put(setExpenseCategories({ categories: response.categories }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expensesCategoryLoading: false }));
    }
}

function* createExpenseCategory({ payload: { params, onResult } }) {

    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: CREATE_EXPENSE_CATEGORIES_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put(setCreateExpenseCategories({ categories: [response.category] }));

        onResult && onResult(response.category)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}

function* getEditExpenseCategory({ payload: { id, onResult } }) {

    yield put(settingsTriggerSpinner({ initExpenseCategoryLoading: true }));

    try {

        const options = {
            path: GET_EDIT_EXPENSE_CATEGORIES_URL(id),
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.category)

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ initExpenseCategoryLoading: false }));
    }
}

function* editExpenseCategory(payloadData) {
    const {
        payload: { id, params, navigation },
    } = payloadData;


    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: EDIT_EXPENSE_CATEGORIES_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        navigation.navigate(ROUTES.CATEGORIES)
        yield put(setEditExpenseCategories({ categories: [response.category], id }));

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}

function* removeExpenseCategory(payloadData) {
    const {
        payload: { id, navigation, onResult },
    } = payloadData;

    yield put(settingsTriggerSpinner({ expenseCategoryLoading: true }));

    try {

        const options = {
            path: REMOVE_EXPENSE_CATEGORIES_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CATEGORIES)
            yield put(setRemoveExpenseCategories({ id }));
        }
        else
            onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ expenseCategoryLoading: false }));
    }
}


export default function* categoriesSaga() {
    // Expense Categories
    // -----------------------------------------
    yield takeEvery(GET_EXPENSE_CATEGORIES, getExpenseCategories);
    yield takeEvery(CREATE_EXPENSE_CATEGORY, createExpenseCategory);
    yield takeEvery(GET_CREATE_EXPENSE_CATEGORY, getEditExpenseCategory);
    yield takeEvery(EDIT_EXPENSE_CATEGORY, editExpenseCategory);
    yield takeEvery(REMOVE_EXPENSE_CATEGORY, removeExpenseCategory);
}
