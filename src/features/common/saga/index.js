import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as TYPES from '../constants';

function* getCompanies(payloadData) {
    try {
    } catch (e) {}
}

export default function* commonSaga() {
    yield takeLatest(TYPES.GET_COMPANIES, getCompanies);
}
