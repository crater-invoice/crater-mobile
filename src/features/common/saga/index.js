import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as Actions from '../constants';
import { spinner } from '../actions';
import { hasTextLength } from '@/constants';
import { internalSearch } from '@/utils';

function* fetchCompaniesSaga(payloadData) {
    const {
        payload: { onSuccess, queryString }
    } = payloadData;

    try {
        if (!hasTextLength(queryString?.search)) {
            const response = yield call([Request, 'get'], {
                path: `companies/get`
            });

            yield put({
                type: Actions.FETCH_COMPANIES_SUCCESS,
                payload: { companies: response?.companies ?? [] }
            });

            onSuccess?.(response);
            return;
        }

        const { search, companies } = queryString;
        const filterData = internalSearch({
            items: companies,
            search,
            searchFields: ['name']
        });

        yield put({
            type: Actions.FETCH_COMPANIES_SUCCESS,
            payload: { companies: filterData }
        });

        onSuccess?.({});
    } catch (e) {}
}

function* addCompanySaga(payloadData) {
    const {
        payload: { params, onSuccess }
    } = payloadData;

    yield put(spinner({ companyLoading: true }));

    try {
        const options = {
            path: `companies`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put({
            type: Actions.ADD_COMPANY_SUCCESS,
            payload: response?.company
        });

        onSuccess?.(response?.company);
    } catch (e) {
    } finally {
        yield put(spinner({ companyLoading: false }));
    }
}

function* updateCompanySaga(payloadData) {
    const {
        payload: { params, onSuccess }
    } = payloadData;

    yield put(spinner({ companyLoading: true }));

    try {
        const options = {
            path: `companies/${params.id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield put({
            type: Actions.UPDATE_COMPANY_SUCCESS,
            payload: response?.company
        });

        onSuccess?.(response?.company);
    } catch (e) {
    } finally {
        yield put(spinner({ companyLoading: false }));
    }
}

function* removeCompanySaga(payloadData) {
    const {
        payload: { id, onSuccess }
    } = payloadData;

    yield put(spinner({ companyLoading: true }));

    try {
        const response = yield call([Request, 'delete'], {
            path: `companies/delete`,
            headers: { company: id }
        });

        if (response?.success) {
            yield put({
                type: Actions.REMOVE_COMPANY_SUCCESS,
                payload: id
            });
        }

        onSuccess?.(response?.success);
    } catch (e) {
    } finally {
        yield put(spinner({ companyLoading: false }));
    }
}

export default function* commonSaga() {
    yield takeLatest(Actions.FETCH_COMPANIES, fetchCompaniesSaga);
    yield takeLatest(Actions.ADD_COMPANY, addCompanySaga);
    yield takeLatest(Actions.UPDATE_COMPANY, updateCompanySaga);
    yield takeLatest(Actions.REMOVE_COMPANY, removeCompanySaga);
}
