import {call, put, takeLatest} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

/**
 * Fetch mail configuration saga
 * @returns {IterableIterator<*>}
 */
function* fetchMailConfiguration({payload}) {
  try {
  } catch (e) {
    handleError(e);
  } finally {
  }
}

export default function* settingSaga() {
  yield takeLatest(types.FETCH_MAIL_CONFIGURATION, fetchMailConfiguration);
}
