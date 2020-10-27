import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import { GET_NOTES, CREATE_NOTES } from '../../constants';
import { setNotes, createNotes } from '../../actions';
import * as queryStrings from 'query-string';

function* getUserNotes({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    console.log('inside saga');

    try {
        const options = {
            path: `notes?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        console.log(response);

        if (response?.notes) {
            const { data } = response.notes;
            yield put(setNotes({ notes: data, fresh }));
        }

        onSuccess(response?.notes);
    } catch (e) {
    } finally {
    }
}

function* createUserNotes({ payload }) {
    const { params, onSuccess } = payload;

    yield put(settingsTriggerSpinner({ getNotesLoading: true }));

    try {
        const options = {
            path: 'notes',
            body: params
        };

        const response = yield call([Request, 'post'], options);

        yield put(createNotes({ notes: [response.notes] }));

        onSuccess(response.notes);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getNotesLoading: false }));
    }
}

export default function* notesSaga() {
    yield takeEvery(GET_NOTES, getUserNotes);
    yield takeEvery(CREATE_NOTES, createUserNotes);
}
