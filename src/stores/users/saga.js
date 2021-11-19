import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';
import {fetchCompanies} from '../company/saga';

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
    const {data} = yield call(req.fetchSingleUser, id);
    yield call(fetchCompanies);
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add user saga
 * @returns {IterableIterator<*>}
 */
function* addUser({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addUser, payload.params);
    yield put({type: types.ADD_USER_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.user_created')});
  } catch (e) {
    handleError(e);
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
    yield put(spinner('isSaving', true));
    const {id, params} = payload;
    const {data} = yield call(req.updateUser, id, params);
    yield put({type: types.UPDATE_USER_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.user_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove user saga
 * @returns {IterableIterator<*>}
 */
function* removeUser({payload}) {
  try {
    yield put(spinner('isDeleting', true));
    const {id} = payload;
    yield call(req.removeUser, id);
    yield put({type: types.REMOVE_USER_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.user_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

/**
 * Fetch user initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchUserInitialDetails({payload}) {
  yield call(fetchCompanies);
  payload?.();
}

export default function* usersSaga() {
  yield takeLatest(types.FETCH_USERS, fetchUsers);
  yield takeLatest(types.FETCH_SINGLE_USER, fetchSingleUser);
  yield takeLatest(types.FETCH_INITIAL_DETAILS, fetchUserInitialDetails);
  yield takeLatest(types.ADD_USER, addUser);
  yield takeLatest(types.UPDATE_USER, updateUser);
  yield takeLatest(types.REMOVE_USER, removeUser);
}
