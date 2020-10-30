import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    GET_NOTES,
    CREATE_NOTES,
    REMOVE_NOTES,
    UPDATE_NOTES,
    EDIT_NOTE_URL
} from '../../constants';
import { setNotes, settingsTriggerSpinner } from '../../actions';
import * as queryStrings from 'query-string';

function* getNotes({ payload }: any) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `notes?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.notes) {
            const { data } = response.notes;
            yield put(setNotes({ notes: data, fresh }));
        }

        onSuccess(response?.notes);
    } catch (e) {
    } finally {
    }
}

function* createNote({ payload }: any) {
    const { params, navigation } = payload;

    yield put(settingsTriggerSpinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.note) {
            navigation.goBack(null);
        }
    } catch (e) {
        console.log(e);
    } finally {
        yield put(settingsTriggerSpinner({ getNotesLoading: false }));
    }
}

function* removeNote({ payload: { id, navigation, onResult } }: any) {
    yield put(settingsTriggerSpinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.goBack(null);
        } else {
            onResult?.(response);
        }
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getNotesLoading: false }));
    }
}

function* editNote({ payload: { note, navigation, onResult } }: any) {
    yield put(settingsTriggerSpinner({ getNotesLoading: true }));

    try {
        const options = {
            path: EDIT_NOTE_URL(note),
            body: note
        };

        const response = yield call([Request, 'put'], options);
        navigation.goBack();
        onResult(response);
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ getNotesLoading: false }));
    }
}

export default function* notesSaga() {
    yield takeEvery(GET_NOTES, getNotes);
    yield takeEvery(CREATE_NOTES, createNote);
    yield takeEvery(REMOVE_NOTES, removeNote);
    yield takeEvery(UPDATE_NOTES, editNote);
}
