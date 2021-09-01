import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './constants';
import * as req from './service';
import {spinner} from './actions';
import {hasTextLength} from '@/constants';
import {internalSearch} from '@/utils';

/**
 * Fetch users saga
 * @returns {IterableIterator<*>}
 */
function* fetchUsers({payload}) {
  try {
    const {onSuccess, queryString} = payload;
    const response = yield call(req.fetchUsers, queryString);
    let users = response?.data ?? [];

    if (hasTextLength(queryString?.search)) {
      const {search} = queryString;
      users = internalSearch({
        items: users,
        search,
        searchFields: ['name']
      });
    }

    yield put({type: types.FETCH_USERS_SUCCESS, payload: users});
    onSuccess?.(response);
  } catch (e) {}
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
    yield put(spinner(true));
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
    yield put(spinner(false));
  }
}

/**
 * Update user saga
 * @returns {IterableIterator<*>}
 */
function* updateUser({payload}) {
  try {
    const {userId, params, navigation, submissionError} = payload;
    yield put(spinner(true));
    const response = yield call(req.updateUser, userId, params);
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
    yield put(spinner(false));
  }
}

/**
 * Remove user saga
 * @returns {IterableIterator<*>}
 */
function* removeUser({payload}) {
  try {
    const {id, onSuccess} = payload;
    const body = {users: [id]};
    yield put(spinner(true));
    const response = yield call(req.removeUser, body);
    if (response?.success) {
      yield put({type: types.REMOVE_USER_SUCCESS, payload: id});
    }
    onSuccess?.(response?.success);
  } catch (e) {
  } finally {
    yield put(spinner(false));
  }
}

export default function* usersSaga() {
  yield takeLatest(types.FETCH_USERS, fetchUsers);
  yield takeLatest(types.FETCH_SINGLE_USER, fetchSingleUser);
  yield takeLatest(types.ADD_USER, addUser);
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.REMOVE_USER, removeUser);
}
