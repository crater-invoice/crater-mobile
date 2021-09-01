import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './constants';
import * as req from './service';
import {spinner} from './actions';
import {hasTextLength} from '@/constants';
import {internalSearch} from '@/utils';

/**
 * Fetch roles saga
 * @returns {IterableIterator<*>}
 */
function* fetchRoles({payload}) {
  try {
    const {onSuccess, queryString} = payload;
    const response = yield call(req.fetchRoles, queryString);
    let roles = response?.data ?? [];

    if (hasTextLength(queryString?.search)) {
      const {search} = queryString;
      roles = internalSearch({
        items: roles,
        search,
        searchFields: ['title']
      });
    }

    yield put({type: types.FETCH_ROLES_SUCCESS, payload: roles});
    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Fetch single role saga
 * @returns {IterableIterator<*>}
 */
function* fetchSingleRole({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.fetchSingleRole, id);
    const {abilities: permissions} = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_SINGLE_ROLE_SUCCESS,
      payload: {
        permissions,
        currentPermissions: response?.abilities ?? []
      }
    });
    onSuccess?.(response?.data);
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
  try {
    const {params, navigation, onResult} = payload;
    yield put(spinner(true));
    const response = yield call(req.addRole, params);
    yield put({type: types.ADD_ROLE_SUCCESS, payload: response?.data});
    onResult?.(response?.data);
  } catch (e) {
  } finally {
    yield put(spinner(false));
  }
}

/**
 * Update role saga
 * @returns {IterableIterator<*>}
 */
function* updateRole({payload}) {
  try {
    const {roleId, params, navigation} = payload;
    yield put(spinner(true));
    const response = yield call(req.updateRole, roleId, params);
    yield put({type: types.UPDATE_ROLE_SUCCESS, payload: response?.data});
    navigation.goBack(null);
  } catch (e) {
  } finally {
    yield put(spinner(false));
  }
}

/**
 * Remove role saga
 * @returns {IterableIterator<*>}
 */
function* removeRole({payload}) {
  try {
    const {id, onSuccess} = payload;
    yield put(spinner(true));
    const response = yield call(req.removeRole, id);
    if (response?.success) {
      yield put({type: types.REMOVE_ROLE_SUCCESS, payload: id});
    }
    onSuccess?.(response?.success);
  } catch (e) {
  } finally {
    yield put(spinner(false));
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
