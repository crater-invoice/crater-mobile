import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as TYPES from '../../constants';
import { CUSTOM_FIELD_TYPES, FORMAT_CUSTOMER_FIELDS } from '../../constants';
import * as queryStrings from 'query-string';
import { getCustomFields } from '../custom-fields';
import { isArray } from '@/constants';
import {
    saveNoteFields,
    setNotes,
    settingsTriggerSpinner as spinner,
    createFromNotes,
    removeFromNotes,
    updateFromNotes
} from '../../actions';

const getNoteFields = (fields, type = null) => {
    const selectedFields = [];
    const customerFields = [];

    fields.map(field => {
        if (type && field.model_type === type) {
            selectedFields.push({
                label: field?.label,
                value: field.slug
            });
        }

        if (field.model_type === CUSTOM_FIELD_TYPES.CUSTOMER) {
            customerFields.push({
                label: field?.label,
                value: field.slug
            });
        }
    });

    const SELECTED_TYPE_FIELDS = type
        ? {
              label: `${type.toUpperCase()} CUSTOM`,
              fields: [
                  ...selectedFields,
                  {
                      label: `${type} Link`,
                      value: `${type.toUpperCase()}_LINK`
                  }
              ]
          }
        : {};

    const CUSTOMER_TYPE_FIELDS = {
        label: `CUSTOMER CUSTOM`,
        fields: customerFields
    };

    const list = [FORMAT_CUSTOMER_FIELDS];

    isArray(customerFields) && list.push(CUSTOMER_TYPE_FIELDS);
    isArray(selectedFields) && list.push(SELECTED_TYPE_FIELDS);

    return list;
};

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
        const fields = yield call(getCustomFields, {
            payload: {
                queryString: { limit: 'all' },
                returnResponse: true
            }
        });

        if (!isArray(fields)) {
            yield put(saveNoteFields({ noteFields: [FORMAT_CUSTOMER_FIELDS] }));
            onSuccess?.();
            return;
        }

        const list = getNoteFields(fields);

        yield put(saveNoteFields({ noteFields: list }));
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
            yield put(createFromNotes({ note: response.note }))
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
            yield put(removeFromNotes({ id }))
            navigation.goBack(null);
        } else {
            onResult?.(response);
        }
    } catch (e) {
    } finally {
        yield put(spinner({ getNotesLoading: false }));
    }
}

function* getNoteDetail({ payload: { type, onSuccess } }: any) {
    try {
        const fields = yield call(getCustomFields, {
            payload: {
                queryString: { limit: 'all' },
                returnResponse: true
            }
        });

        if (!isArray(fields)) {
            yield put(saveNoteFields({ noteFields: [FORMAT_CUSTOMER_FIELDS] }));
            onSuccess?.();
            return;
        }

        const list = getNoteFields(fields, type);

        yield put(saveNoteFields({ noteFields: list }));
        onSuccess?.();
    } catch (e) {}
}

function* editNote({ payload: { note, navigation, onResult } }: any) {
    yield put(spinner({ getNotesLoading: true }));

    try {
        const options = {
            path: `notes/${note.id}`,
            body: note
        };

        const response = yield call([Request, 'put'], options);
        if (response.note) {
            yield put(updateFromNotes({ note: response.note }))
            navigation.goBack();
        }
        
        onResult(response);
    } catch (e) {
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
