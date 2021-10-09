import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';

/**
 * Fetch users saga
 * @returns {IterableIterator<*>}
 */
function* fetchUsers({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchUsers, queryString);
    const users = response?.data ?? [];
    yield put({type: types.FETCH_USERS_SUCCESS, payload: {users, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single user saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleUser({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleUser, id);
    onSuccess?.(response?.data);
  } catch (e) {}
}

/**
 * Add user saga
 * @returns {IterableIterator<*>}
 */
function* addUser({payload}) {
  try {
    const {params, navigation, submissionError} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.addUser, params);
    if (response?.data?.errors) {
      submissionError?.(response?.data?.errors);
      return;
    }
    if (response?.data) {
      yield put({
        type: types.ADD_USER_SUCCESS,
        payload: response?.data
      });
      navigation.goBack(null);
    }
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update user saga
 * @returns {IterableIterator<*>}
 */
function* updateUser({payload}) {
  try {
    const {id, params, navigation, submissionError} = payload;
    yield put(spinner('isSaving', true));
    const response = yield call(req.updateUser, id, params);
    if (response?.data?.errors) {
      submissionError?.(response?.data?.errors);
      return;
    }
    if (response?.data) {
      yield put({
        type: types.UPDATE_USER_SUCCESS,
        payload: response?.data
      });
      navigation.goBack(null);
    }
  } catch (e) {
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove user saga
 * @returns {IterableIterator<*>}
 */
function* removeUser({payload}) {
  const {id, navigation, onFail} = payload;
  try {
    yield put(spinner('isDeleting', true));
    const body = {users: [id]};
    yield call(req.removeUser, body);
    yield put({type: types.REMOVE_USER_SUCCESS, payload: id});
    navigation.goBack(null);
  } catch (e) {
    onFail?.(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* usersSaga() {
  yield takeLatest(types.FETCH_USERS, fetchUsers);
  yield takeLatest(types.FETCH_SINGLE_USER, fetchSingleUser);
  yield takeLatest(types.ADD_USER, addUser);
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.REMOVE_USER, removeUser);
}
