import {call, put, takeLatest} from 'redux-saga/effects';
import Request from '@/api/request';
import * as types from './constants';
import {spinner} from './actions';
import {hasTextLength} from '@/constants';
import {internalSearch} from '@/utils';
import * as req from './service';

/**
 * Fetch roles saga
 * @returns {IterableIterator<*>}
 */
function* fetchRoles(payloadData) {
  const {
    payload: {onSuccess, queryString}
  } = payloadData;

  try {
    const response = yield call(req.fetchRoles);
    let roles = response?.roles ?? [];

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
function* fetchSingleRole(payloadData) {
  const {
    payload: {id, onSuccess}
  } = payloadData;

  try {
    const response = yield call(req.fetchSingleRole, id);
    const {abilities: permissions} = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_SINGLE_ROLE_SUCCESS,
      payload: {
        permissions,
        currentPermissions: response?.role?.abilities ?? []
      }
    });
    onSuccess?.(response);
  } catch (e) {
    console.log(e);
  }
}

/**
 * Fetch permissions saga
 * @returns {IterableIterator<*>}
 */
function* fetchPermissions(payloadData) {
  const {payload} = payloadData;
  try {
    const response = yield call(req.fetchPermissions);
    yield put({
      type: types.FETCH_PERMISSIONS_SUCCESS,
      payload: response?.abilities ?? []
    });
    payload?.(response);
  } catch (e) {}
}

/**
 * Add role saga
 * @returns {IterableIterator<*>}
 */
function* addRole(payloadData) {
  const {
    payload: {params, navigation}
  } = payloadData;

  try {
    yield put(spinner({roleLoading: true}));
    const response = yield call(req.addRole, params);
    yield put({type: types.ADD_ROLE_SUCCESS, payload: response?.role});
    navigation.goBack(null);
  } catch (e) {
  } finally {
    yield put(spinner({roleLoading: false}));
  }
}

/**
 * Update role saga
 * @returns {IterableIterator<*>}
 */
function* updateRole(payloadData) {
  const {
    payload: {params, navigation}
  } = payloadData;

  try {
    yield put(spinner({roleLoading: true}));

    const response = yield call([Request, 'put'], {
      path: `roles/${params.id}`,
      body: params
    });

    yield put({type: types.UPDATE_ROLE_SUCCESS, payload: response?.role});
    navigation.goBack(null);
  } catch (e) {
  } finally {
    yield put(spinner({roleLoading: false}));
  }
}

/**
 * Remove role saga
 * @returns {IterableIterator<*>}
 */
function* removeRole(payloadData) {
  const {
    payload: {id, onSuccess}
  } = payloadData;

  try {
    yield put(spinner({roleLoading: true}));

    const response = yield call([Request, 'delete'], {
      path: `roles/delete`,
      body: {id}
    });

    if (response?.success) {
      yield put({
        type: types.REMOVE_ROLE_SUCCESS,
        payload: id
      });
    }

    onSuccess?.(response?.success);
  } catch (e) {
  } finally {
    yield put(spinner({roleLoading: false}));
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
