import {call, put, takeEvery} from 'redux-saga/effects';
import Request from 'utils/request';
import * as TYPES from '../../constants';
import * as queryStrings from 'query-string';
import {getCustomFields} from '../custom-fields';
import {
  setNotes,
  settingsTriggerSpinner as spinner,
  createFromNotes,
  removeFromNotes,
  updateFromNotes
} from '../../actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

function* getNotes({payload}: any) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const options = {
      path: `notes?${queryStrings.stringify(queryString)}`
    };
    const response = yield call([Request, 'get'], options);
    yield put(setNotes({notes: response.data, fresh}));
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

function* getCreateNote({payload: {onSuccess}}: any) {
  try {
    yield call(getCustomFields, {payload: {queryString: {limit: 'all'}}});
    onSuccess?.();
  } catch (e) {}
}

function* createNote({payload}: any) {
  try {
    const {params, onSuccess} = payload;
    yield put(spinner({getNotesLoading: true}));
    const options = {path: `notes`, body: params};
    const {data} = yield call([Request, 'post'], options);
    yield put(createFromNotes({note: data}));
    onSuccess?.(data);
    showNotification({message: t('notification.note_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({getNotesLoading: false}));
  }
}

function* removeNote({payload: {id, navigation}}: any) {
  try {
    yield put(spinner({getNotesLoading: true}));
    const options = {path: `notes/${id}`};
    yield call([Request, 'delete'], options);
    yield put(removeFromNotes({id}));
    navigation.goBack(null);
    showNotification({message: t('notification.note_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({getNotesLoading: false}));
  }
}

function* getNoteDetail({payload: {onSuccess}}: any) {
  try {
    yield call(getCustomFields, {payload: {queryString: {limit: 'all'}}});
    onSuccess?.();
  } catch (e) {}
}

function* editNote({payload: {params, onSuccess}}: any) {
  try {
    yield put(spinner({getNotesLoading: true}));
    const options = {
      path: `notes/${params.id}`,
      body: params
    };
    const {data} = yield call([Request, 'put'], options);
    yield put(updateFromNotes({note: data}));
    onSuccess?.(data);
    showNotification({message: t('notification.note_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({getNotesLoading: false}));
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
