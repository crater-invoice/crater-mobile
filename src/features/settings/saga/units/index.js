import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import { getTitleByLanguage } from '@/utils';
import Request from '@/api/request';
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
        if (response?.units) {
            const { data } = response.units;
            yield put(setItemUnits({ units: data, fresh }));
        }

        onSuccess?.(response?.units);
    } catch (e) {}
}

function* createItemUnit({ payload: { params } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put(setItemUnit({ unit: [response.unit], isCreated: true }));
    } catch (e) {
    } finally {
        yield put(spinner({ itemUnitLoading: false }));
    }
}

function* editItemUnit({ payload: { id, params } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units/${id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield put(setItemUnit({ unit: [response.unit], isUpdated: true }));
    } catch (e) {
    } finally {
        yield put(spinner({ itemUnitLoading: false }));
    }
}

function* removeItemUnit({ payload: { id } }) {
    yield put(spinner({ itemUnitLoading: true }));

    try {
        const options = {
            path: `units/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) yield put(setItemUnit({ id, isRemove: true }));

        if (response.error && response.error === 'items_attached')
            setTimeout(() => {
                alertMe({
                    title: getTitleByLanguage('items.alreadyInUseUnit')
                });
            }, 1000);
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
