import Request from '@/api/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import {
    settingsTriggerSpinner,
    setTaxes,
    setTax,
    setEditTax,
    setRemoveTax
} from '../../actions';
import {
    GET_TAXES,
    REMOVE_TAX,
    TAX_ADD,
    TAX_EDIT,
    // Endpoint Api URL
    CREATE_SALES_TAX_URL,
    EDIT_SALES_TAX_URL,
    REMOVE_SALES_TAX_URL
} from '../../constants';

function* getTaxTypes({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `tax-types?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.taxTypes) {
            const { data } = response.taxTypes;
            yield put(setTaxes({ taxTypes: data, fresh }));
        }

        onSuccess?.(response?.taxTypes);
    } catch (e) {
    } finally {
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
    } catch (e) {
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
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ editTaxLoading: false }));
    }
}

function* removeTax({ payload: { id, onResult } }) {
    yield put(settingsTriggerSpinner({ removeTaxLoading: true }));

    try {
        const options = {
            path: REMOVE_SALES_TAX_URL(id)
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) yield put(setRemoveTax({ taxId: id }));

        onResult && onResult(response.success);
    } catch (e) {
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
