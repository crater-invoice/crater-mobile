import {put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

/**
 * Fetch taxation saga
 * @returns {IterableIterator<*>}
 */
function* fetchTaxation({payload}) {
  try {
    // const {data} = yield call(req.fetchTaxation, queryString);
    // yield put({
    //   type: types.FETCH_TAXATION_SUCCESS,
    //   payload: {taxationType: data}
    // });
    payload?.onSuccess?.();
  } catch (e) {
    handleError(e);
  }
}

/**
 * Update taxation saga
 * @returns {IterableIterator<*>}
 */
function* updateTaxationType({payload}) {
  try {
    const {params} = payload;
    yield put(spinner('isSaving', true));
    // const {data} = yield call(req.updateTaxationType, params);
    // yield put({type: types.UPDATE_TAXATION_SUCCESS, payload: data});
    showNotification({message: t('notification.taxation_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield setTimeout(() => {
      put(spinner('isSaving', false));
    }, 5000);
  }
}

export default function* taxationSaga() {
  yield takeLatest(types.FETCH_TAXATION, fetchTaxation);
  yield takeLatest(types.UPDATE_TAXATION, updateTaxationType);
}
