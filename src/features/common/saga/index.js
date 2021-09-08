import { call, put, takeLatest } from 'redux-saga/effects';
import Request from 'utils/request';
import * as Actions from '../constants';
import { spinner } from '../actions';
import { hasTextLength } from '@/constants';
import { internalSearch } from '@/utils';

function* fetchCompaniesSaga(payloadData) {
    const {
        payload: { onSuccess, onFail, queryString }
    } = payloadData;

    try {
        const response = yield call([Request, 'get'], {
            path: `companies/get`
        });

        let companies = response?.data ?? [];

        if (hasTextLength(queryString?.search)) {
            const { search } = queryString;
            companies = internalSearch({
                items: companies,
                search,
                searchFields: ['name']
            });
        }

        yield put({
            type: Actions.FETCH_COMPANIES_SUCCESS,
            payload: { companies }
        });

        onSuccess?.(response);
    } catch (e) {
        onFail?.();
    }
}

function* uploadCompanyLogo(payloadData) {
    const { logo, id } = payloadData;

    if (!logo || !id) {
        return;
    }

    const options = {
        path: `company/upload-logo`,
        image: logo,
        imageName: 'company_logo',
        headers: { company: id }
    };

    yield call([Request, 'post'], options);
}

function* addCompanySaga(payloadData) {
    const {
        payload: { params, logo, onSuccess }
    } = payloadData;

    yield put(spinner({ companyLoading: true }));

    try {
        const options = {
            path: `companies`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield call(uploadCompanyLogo, { logo, id: response?.data?.id });

        yield put({
            type: Actions.ADD_COMPANY_SUCCESS,
            payload: response?.data
        });

        onSuccess?.(response?.data);
    } catch (e) {
    } finally {
        yield put(spinner({ companyLoading: false }));
    }
}

function* updateCompanySaga(payloadData) {
    const {
        payload: { params, logo, onSuccess }
    } = payloadData;

    yield put(spinner({ companyLoading: true }));

    try {
        const options = {
            path: `companies/${params.id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        yield call(uploadCompanyLogo, { logo, id: response?.company?.id });

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

export default function* companySaga() {
    yield takeLatest(Actions.FETCH_COMPANIES, fetchCompaniesSaga);
    yield takeLatest(Actions.ADD_COMPANY, addCompanySaga);
    yield takeLatest(Actions.UPDATE_COMPANY, updateCompanySaga);
    yield takeLatest(Actions.REMOVE_COMPANY, removeCompanySaga);
}
