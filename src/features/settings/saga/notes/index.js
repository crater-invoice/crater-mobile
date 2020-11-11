import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as TYPES from '../../constants';
import * as queryStrings from 'query-string';
import { getCustomFields } from '../custom-fields';
import {
    setNotes,
    settingsTriggerSpinner as spinner,
    createFromNotes,
    removeFromNotes,
    updateFromNotes
} from '../../actions';

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

function* getCreateNote({ payload: { onSuccess } }: any) {
    try {
        yield call(getCustomFields, {
            payload: {
                queryString: { limit: 'all' }
            }
        });

        onSuccess?.();
    } catch (e) {}
}

function* createNote({ payload }: any) {
    const { params, navigation } = payload;

    yield put(spinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.note) {
            yield put(createFromNotes({ note: response.note }));
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(spinner({ getNotesLoading: false }));
    }
}

function* removeNote({ payload: { id, navigation, onResult } }: any) {
    yield put(spinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            yield put(removeFromNotes({ id }));
            navigation.goBack(null);
        } else {
            onResult?.(response);
        }
    } catch (e) {
    } finally {
        yield put(spinner({ getNotesLoading: false }));
    }
}

function* getNoteDetail({ payload: { onSuccess } }: any) {
    try {
        yield call(getCustomFields, {
            payload: {
                queryString: { limit: 'all' }
            }
        });
        onSuccess?.();
    } catch (e) {}
}

function* editNote({ payload: { params, navigation, onSuccess } }: any) {
    yield put(spinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes/${params.id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);
        if (response.note) {
            yield put(updateFromNotes({ note: response.note }));
            navigation.goBack();
        }

        onSuccess(response);
    } catch (e) {
        console.log({ e });
    } finally {
        yield put(spinner({ getNotesLoading: false }));
    }
}

export default function* notesSaga() {
    yield takeEvery(TYPES.GET_NOTES, getNotes);
    yield takeEvery(TYPES.GET_CREATE_NOTE, getCreateNote);
    yield takeEvery(TYPES.CREATE_NOTE, createNote);
    yield takeEvery(TYPES.REMOVE_NOTE, removeNote);
    yield takeEvery(TYPES.GET_NOTE_DETAIL, getNoteDetail);
    yield takeEvery(TYPES.UPDATE_NOTE, editNote);
}
