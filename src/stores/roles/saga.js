import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';

/**
 * Fetch roles saga
 * @returns {IterableIterator<*>}
 */
function* fetchRoles({payload}) {
  const {fresh, onSuccess, onFail, queryString} = payload;
  try {
    const response = yield call(req.fetchRoles, queryString);
    const roles = response?.data ?? [];
    yield put({type: types.FETCH_ROLES_SUCCESS, payload: {roles, fresh}});
    onSuccess?.(response);
  } catch (e) {
    onFail?.();
  }
}

/**
 * Fetch single role saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleRole({payload}) {
  try {
    const {id, onSuccess} = payload;
    const {data} = yield call(req.fetchSingleRole, id);
    const {abilities: permissions} = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_SINGLE_ROLE_SUCCESS,
      payload: {permissions, currentPermissions: data?.abilities ?? []}
    });
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Fetch permissions saga
 * @returns {IterableIterator<*>}
 */
function* fetchPermissions({payload}) {
  try {
    const response = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_PERMISSIONS_SUCCESS,
      payload: response.abilities ?? []
    });
    payload?.(response);
  } catch (e) {}
}

/**
 * Add role saga
 * @returns {IterableIterator<*>}
 */
function* addRole({payload}) {
  const {params, onSuccess, submissionError} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addRole, params);
    yield put({type: types.ADD_ROLE_SUCCESS, payload: data});
    onSuccess?.(data);
  } catch (e) {
    submissionError?.(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update role saga
 * @returns {IterableIterator<*>}
 */
function* updateRole({payload}) {
  const {id, params, navigation, submissionError} = payload;
  try {
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateRole, id, params);
    yield put({type: types.UPDATE_ROLE_SUCCESS, payload: data});
    navigation.goBack(null);
  } catch (e) {
    submissionError?.(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove role saga
 * @returns {IterableIterator<*>}
 */
function* removeRole({payload}) {
  const {id, navigation, onFail} = payload;
  try {
    yield put(spinner('isDeleting', true));
    yield call(req.removeRole, id);
    yield put({type: types.REMOVE_ROLE_SUCCESS, payload: id});
    navigation.goBack(null);
  } catch (e) {
    onFail?.();
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* rolesSaga() {
  yield takeLatest(types.FETCH_ROLES, fetchRoles);
  yield takeLatest(types.FETCH_SINGLE_ROLE, fetchSingleRole);
  yield takeLatest(types.FETCH_PERMISSIONS, fetchPermissions);
  yield takeLatest(types.ADD_ROLE, addRole);
  yield takeLatest(types.UPDATE_ROLE, updateRole);
  yield takeLatest(types.REMOVE_ROLE, removeRole);
}
