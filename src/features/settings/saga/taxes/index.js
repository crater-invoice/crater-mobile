import Request from '@/api/request';
import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import {
    settingsTriggerSpinner as spinner,
    setTaxes,
    setTax,
    setEditTax,
    setRemoveTax
} from '../../actions';
import { GET_TAXES, REMOVE_TAX, TAX_ADD, TAX_EDIT } from '../../constants';

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
    } catch (e) {}
}

function* addTax({ payload: { tax, onResult } }) {
    yield put(spinner({ addTaxLoading: true }));

    try {
        const options = {
            path: `tax-types`,
            body: tax
        };

        const response = yield call([Request, 'post'], options);

        yield put(setTax({ taxType: [response.taxType] }));

        onResult && onResult(response.taxType);
    } catch (e) {
    } finally {
        yield put(spinner({ addTaxLoading: false }));
    }
}

function* editTaxType({ payload: { tax, onResult } }) {
    yield put(spinner({ editTaxLoading: true }));

    try {
        const options = {
            path: `tax-types/${tax.id}`,
            body: tax
        };

        const response = yield call([Request, 'put'], options);

        yield put(setEditTax({ taxType: [response.taxType], taxId: tax.id }));

        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(spinner({ editTaxLoading: false }));
    }
}

function* removeTax({ payload: { id, onResult } }) {
    yield put(spinner({ removeTaxLoading: true }));

    try {
        const options = {
            path: `tax-types/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) yield put(setRemoveTax({ taxId: id }));

        onResult && onResult(response.success);
    } catch (e) {
    } finally {
        yield put(spinner({ removeTaxLoading: false }));
    }
}

export default function* taxesSaga() {
    yield takeEvery(GET_TAXES, getTaxTypes);
    yield takeEvery(TAX_ADD, addTax);
    yield takeEvery(TAX_EDIT, editTaxType);
    yield takeEvery(REMOVE_TAX, removeTax);
}
