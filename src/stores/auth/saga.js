import {call, put, takeLatest} from 'redux-saga/effects';
import t from 'locales/use-translation';
import * as types from './types';
import * as req from './service';
import {showNotification} from '@/utils';
import {loginSuccess, saveIdToken} from './actions';
import {checkOTAUpdate} from '../common/actions';
import {fetchBootstrap} from '../common/saga';

/**
 * Login saga
 * @returns {IterableIterator<*>}
 */
function* login({payload}) {
  const {params, onResult} = payload;
  try {
    const {token} = yield call(req.login, params);
    yield put(saveIdToken(token));
    showNotification({message: t('notification.login_success')});
    yield call(fetchBootstrap, null);
    yield put(loginSuccess());
    yield put(checkOTAUpdate());
    onResult?.();
  } catch (e) {
    showNotification({message: t('login.invalid'), type: 'error'});
    onResult?.();
  }
}

/**
 * Biometry login saga
 * @returns {IterableIterator<*>}
 */
function* biometryLogin({payload}) {
  try {
    const isSuccess = yield call(fetchBootstrap, {returnResponse: true});
    if (!isSuccess) {
      payload?.();
      showNotification({message: t('login.invalid_biometry'), type: 'error'});
      return;
    }
    showNotification({message: t('notification.login_success')});
    yield put(loginSuccess());
    yield put(checkOTAUpdate());
    payload?.();
  } catch (e) {
    payload?.();
  }
}

/**
 * Send recovery mail saga
 * @returns {IterableIterator<*>}
 */
function* sendRecoveryMail({payload}) {
  const {email, onSuccess, onFail} = payload;
  try {
    yield call(req.sendRecoveryEmail, email);
    showNotification({message: t('notification.password_reset_link')});
    onSuccess?.();
  } catch (e) {
    showNotification({message: t('forgot.email_send_error'), type: 'error'});
    onFail?.();
  }
}

export default function* authSaga() {
  yield takeLatest(types.LOGIN, login);
  yield takeLatest(types.BIOMETRY_AUTH_LOGIN, biometryLogin);
  yield takeLatest(types.SEND_FORGOT_PASSWORD_MAIL, sendRecoveryMail);
}
