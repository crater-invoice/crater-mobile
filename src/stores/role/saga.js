import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';
import {navigation} from '@/navigation';

/**
 * Fetch roles saga
 * @returns {IterableIterator<*>}
 */
function* fetchRoles({payload}) {
  const {fresh = true, onSuccess, onFail, queryString} = payload;
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
  try {
    const {params, onSuccess} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.addRole, params);
    yield put({type: types.ADD_ROLE_SUCCESS, payload: data});
    onSuccess?.(data);
    showNotification({message: t('notification.role_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update role saga
 * @returns {IterableIterator<*>}
 */
function* updateRole({payload}) {
  try {
    const {id, params} = payload;
    yield put(spinner('isSaving', true));
    const {data} = yield call(req.updateRole, id, params);
    yield put({type: types.UPDATE_ROLE_SUCCESS, payload: data});
    navigation.goBack();
    showNotification({message: t('notification.role_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Remove role saga
 * @returns {IterableIterator<*>}
 */
function* removeRole({payload}) {
  const {id} = payload;
  try {
    yield put(spinner('isDeleting', true));
    yield call(req.removeRole, id);
    yield put({type: types.REMOVE_ROLE_SUCCESS, payload: id});
    navigation.goBack();
    showNotification({message: t('notification.role_deleted')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isDeleting', false));
  }
}

export default function* roleSaga() {
  yield takeLatest(types.FETCH_ROLES, fetchRoles);
  yield takeLatest(types.FETCH_SINGLE_ROLE, fetchSingleRole);
  yield takeLatest(types.FETCH_PERMISSIONS, fetchPermissions);
  yield takeLatest(types.ADD_ROLE, addRole);
  yield takeLatest(types.UPDATE_ROLE, updateRole);
  yield takeLatest(types.REMOVE_ROLE, removeRole);
}
