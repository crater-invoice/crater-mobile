import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import t from 'locales/use-translation';
import Request from 'utils/request';
import { alertMe } from '@/constants';
import * as TYPES from '../../constants';
import {
    settingsTriggerSpinner as spinner,
    setItemUnits,
    setItemUnit
} from '../../actions';

export function* getItemUnits({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;
    try {
        const options = {
            path: `units?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);
        if (response?.data) {
            const data = response.data;
            yield put(setItemUnits({ units: data, fresh }));
        }

        onSuccess?.(response?.data);
    } catch (e) {}
}

function* createItemUnit({ payload: { params, onSuccess } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data) {
            yield put(setItemUnit({ unit: [response.data], isCreated: true }));
            onSuccess?.();
            return;
        }

        if (response?.data?.errors?.name) {
            alertMe({
                desc: response?.data?.errors.name[0]
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ itemUnitLoading: false }));
    }
}

function* editItemUnit({ payload: { params, onSuccess } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units/${params.id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data) {
            yield put(setItemUnit({ unit: response.data, isUpdated: true }));
            onSuccess?.();
            return;
        }

        if (response?.data?.errors?.name) {
            alertMe({
                desc: response?.data?.errors.name[0]
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ itemUnitLoading: false }));
    }
}

function* removeItemUnit({ payload: { id, onSuccess } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            yield put(setItemUnit({ id, isRemove: true }));
            onSuccess?.();
            return;
        }

        if (response.error && response.error === 'items_attached') {
            alertMe({
                title: t('items.alreadyInUseUnit')
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ itemUnitLoading: false }));
    }
}

export default function* itemUnitsSaga() {
    yield takeEvery(TYPES.GET_ITEM_UNITS, getItemUnits);
    yield takeEvery(TYPES.CREATE_ITEM_UNIT, createItemUnit);
    yield takeEvery(TYPES.EDIT_ITEM_UNIT, editItemUnit);
    yield takeEvery(TYPES.REMOVE_ITEM_UNIT, removeItemUnit);
}
