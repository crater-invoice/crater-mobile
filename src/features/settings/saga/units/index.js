import { call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setItemUnits,
    setItemUnit,
} from '../../actions';

import {
    GET_ITEM_UNITS,
    CREATE_ITEM_UNIT,
    EDIT_ITEM_UNIT,
    REMOVE_ITEM_UNIT,
    // Endpoint Api URL
    GET_ITEM_UNITS_URL,
    CREATE_ITEM_UNIT_URL,
    EDIT_ITEM_UNIT_URL,
    REMOVE_ITEM_UNIT_URL,
} from '../../constants';
import { getTitleByLanguage } from '@/utils';
import Request from '@/api/request';
import { alertMe, hasValue } from '@/constants';


const alreadyInUse = (error) => {

    if (error.includes("errors") && error.includes("name")) {

        setTimeout(() => {
            alertMe({
                desc: getTitleByLanguage('alert.alreadyInUse', "\"Name\"")
            })
        }, 1000);

        return true;
    }
}

function* getItemUnits(payloadData = {}) {

    yield put(settingsTriggerSpinner({ itemUnitsLoading: true }));

    try {
        const options = {
            path: GET_ITEM_UNITS_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setItemUnits({ units: response.units }));

    } catch (error) {
        console.log(error)
    } finally {
        yield put(settingsTriggerSpinner({ itemUnitsLoading: false }));
    }
}

function* createItemUnit({ payload: { params } }) {

    yield put(settingsTriggerSpinner({ itemUnitLoading: true }));

    try {

        const options = {
            path: CREATE_ITEM_UNIT_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put(setItemUnit({ unit: [response.unit], isCreated: true }));

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
    } finally {
        yield put(settingsTriggerSpinner({ itemUnitLoading: false }));
    }
}

function* editItemUnit({ payload: { id, params } }) {

    yield put(settingsTriggerSpinner({ itemUnitLoading: true }));

    try {

        const options = {
            path: EDIT_ITEM_UNIT_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield put(setItemUnit({ unit: [response.unit], isUpdated: true }));

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
    } finally {
        yield put(settingsTriggerSpinner({ itemUnitLoading: false }));
    }
}

function* removeItemUnit({ payload: { id } }) {

    yield put(settingsTriggerSpinner({ itemUnitLoading: true }));

    try {

        const options = {
            path: REMOVE_ITEM_UNIT_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success)
            yield put(setItemUnit({ id, isRemove: true }));

        if (response.error && response.error === "items_attached")
            setTimeout(() => {
                alertMe({
                    title: getTitleByLanguage("items.alreadyInUseUnit")
                })
            }, 1000);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ itemUnitLoading: false }));
    }
}

export default function* itemUnitsSaga() {
    // Item Units
    // -----------------------------------------
    yield takeEvery(GET_ITEM_UNITS, getItemUnits);
    yield takeEvery(CREATE_ITEM_UNIT, createItemUnit);
    yield takeEvery(EDIT_ITEM_UNIT, editItemUnit);
    yield takeEvery(REMOVE_ITEM_UNIT, removeItemUnit);
}
