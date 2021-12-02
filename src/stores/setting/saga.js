import {call, put, takeLatest, select} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import t from 'locales/use-translation';
import {handleError} from '@/utils';
import {hasObjectLength} from '@/constants';

/**
 * Fetch mail configuration saga
 * @returns {IterableIterator<*>}
 */
function* fetchMailConfig({payload}) {
  try {
    const state = yield select();
    const emailConfig = state.setting?.emailConfig;

    if (hasObjectLength(emailConfig)) {
      payload?.(emailConfig);
      return;
    }

    const response = yield call(req.fetchMailConfig);
    yield put({type: types.FETCH_MAIL_CONFIG_SUCCESS, payload: response});
    payload?.(response);
  } catch (e) {
    handleError(e);
  } finally {
  }
}

export default function* settingSaga() {
  yield takeLatest(types.FETCH_MAIL_CONFIG, fetchMailConfig);
}
