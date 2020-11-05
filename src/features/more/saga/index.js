import { call, put, takeEvery } from 'redux-saga/effects';
import { resetIdToken } from '../../authentication/actions';
import { ROUTES } from '@/navigation';
import Request from '@/api/request';
import { moreTriggerSpinner, setItems, setItem, deleteItem } from '../actions';
import * as queryStrings from 'query-string';
import {
    LOGOUT,
    GET_ITEMS,
    ITEM_ADD,
    GET_EDIT_ITEM,
    ITEM_EDIT,
    REMOVE_ITEM,
    GET_MAIL_CONFIGURATION
} from '../constants';

function* logout({ payload: { navigation } }) {
    yield put(moreTriggerSpinner({ logoutLoading: true }));

    try {
        yield put(resetIdToken());

        navigation.navigate(ROUTES.AUTH);
    } catch (error) {
        alert('something went wrong');
    } finally {
        yield put(moreTriggerSpinner({ logoutLoading: false }));
    }
}

/**
 * Global Items.
 */
function* getItems({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `items?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.items) {
            const { data } = response.items;
            yield put(setItems({ items: data, fresh }));
        }

        onSuccess?.(response?.items);
    } catch (e) {
    } finally {
    }
}

function* getEditItem({ payload: { id, onResult } }) {
    yield put(moreTriggerSpinner({ getItemLoading: true }));

    try {
        const options = {
            path: `items/${id}`
        };

        const response = yield call([Request, 'get'], options);

        yield put(setItem(response));

        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(moreTriggerSpinner({ getItemLoading: false }));
    }
}

function* addItem({ payload: { item, onResult } }) {
    yield put(moreTriggerSpinner({ itemLoading: true }));

    try {
        const options = {
            path: `items`,
            body: item
        };

        const res = yield call([Request, 'post'], options);

        yield put(setItems({ items: [res.item], prepend: true }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(moreTriggerSpinner({ itemLoading: false }));
    }
}

function* editItem({ payload: { item, id, onResult } }) {
    yield put(moreTriggerSpinner({ itemLoading: true }));

    try {
        const options = {
            path: `items/${id}`,
            body: item
        };

        const response = yield call([Request, 'put'], options);

        yield put(deleteItem({ id }));

        yield put(setItems({ items: [response.item], prepend: true }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(moreTriggerSpinner({ itemLoading: false }));
    }
}

function* removeItem({ payload: { id, onResult } }) {
    yield put(moreTriggerSpinner({ itemLoading: true }));

    try {
        const options = {
            path: `items/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(deleteItem({ id }));
        }

        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(moreTriggerSpinner({ itemLoading: false }));
    }
}

function* getMailConfiguration({ payload: { onSuccess } }) {
    try {
        const options = { path: 'mail/config' };

        const response = yield call([Request, 'get'], options);

        onSuccess?.(response);
    } catch (e) {}
}

export default function* moreSaga() {
    yield takeEvery(LOGOUT, logout);

    // Items
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(ITEM_ADD, addItem);
    yield takeEvery(ITEM_EDIT, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(GET_EDIT_ITEM, getEditItem);

    // Mail Configuration
    yield takeEvery(GET_MAIL_CONFIGURATION, getMailConfiguration);
}
