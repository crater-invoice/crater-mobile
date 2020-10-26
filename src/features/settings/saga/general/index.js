import { call, takeEvery } from 'redux-saga/effects';
import { GET_NEXT_NUMBER } from '../../constants';
import Request from '@/api/request';

function* getNextNumber({ payload }) {
    const { key = null, onSuccess = null } = ({} = payload);

    try {
        const options = {
            path: `next-number?key=${key}`
        };

        const response = yield call([Request, 'get'], options);

        onSuccess(response);
    } catch (e) {
    } finally {
    }
}

export default function* preferencesSaga() {
    yield takeEvery(GET_NEXT_NUMBER, getNextNumber);
}
