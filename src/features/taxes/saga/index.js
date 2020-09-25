import { call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
} from '../../settings/actions';
import {
    setTaxes,
    setTax,
    setEditTax,
    setRemoveTax,
} from '../actions';

import {
    GET_TAXES,
    REMOVE_TAX,
    TAX_ADD,
    TAX_EDIT,
    // Endpoint Api URL
    GET_SALES_TAXES_URL,
    CREATE_SALES_TAX_URL,
    EDIT_SALES_TAX_URL,
    REMOVE_SALES_TAX_URL,
} from '../constants';

import Request from '../../../api/request';


function* getTaxTypes({ payload: { onResult } = {} }) {

    yield put(settingsTriggerSpinner({ getTaxesLoading: true }));

    try {

        const options = {
            path: GET_SALES_TAXES_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setTaxes({ taxTypes: response.taxTypes }));

        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ getTaxesLoading: false }));
    }
}

function* addTax({ payload: { tax, onResult } }) {

    yield put(settingsTriggerSpinner({ addTaxLoading: true }));

    try {

        const options = {
            path: CREATE_SALES_TAX_URL(),
            body: tax
        };

        const response = yield call([Request, 'post'], options);

        yield put(setTax({ taxType: [response.taxType] }));

        onResult && onResult(response.taxType);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ addTaxLoading: false }));
    }
}

function* editTaxType({ payload: { tax, onResult } }) {

    yield put(settingsTriggerSpinner({ editTaxLoading: true }));

    try {

        const options = {
            path: EDIT_SALES_TAX_URL(tax),
            body: tax
        };

        const response = yield call([Request, 'put'], options);

        yield put(setEditTax({ taxType: [response.taxType], taxId: tax.id }));

        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ editTaxLoading: false }));
    }
}

function* removeTax({ payload: { id, onResult } }) {

    yield put(settingsTriggerSpinner({ removeTaxLoading: true }));

    try {

        const options = {
            path: REMOVE_SALES_TAX_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success)
            yield put(setRemoveTax({ taxId: id }));

        onResult && onResult(response.success);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ removeTaxLoading: false }));

    }
}


export default function* taxesSaga() {
    // Tax Types
    // -----------------------------------------
    yield takeEvery(GET_TAXES, getTaxTypes);
    yield takeEvery(TAX_ADD, addTax);
    yield takeEvery(TAX_EDIT, editTaxType);
    yield takeEvery(REMOVE_TAX, removeTax);
}
