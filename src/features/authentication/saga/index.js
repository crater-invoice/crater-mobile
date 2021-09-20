import {call, put, takeLatest, delay, select} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import moment from 'moment';
import {
  saveIdToken,
  authTriggerSpinner,
  getBootstrap,
  setGlobalBootstrap,
  saveEndpointApi,
  setLastAutoUpdateDate,
  checkOTAUpdate as actionCheckOTAUpdate,
  loginSuccess
} from '../actions';
import * as TYPES from '../constants';
import {setAccountInformation} from '../../settings/actions';
import {alertMe, hasValue} from '@/constants';
import {CHECK_OTA_UPDATE} from '@/constants';
import Request from 'utils/request';
import {setI18nManagerValue} from '@/utils';
import t from 'locales/use-translation';
import {FETCH_COMPANIES_SUCCESS} from '@/features/common/constants';
import {APP_VERSION} from '../../../../config';
import {PermissionService} from '@/services';
import {navigateTo} from '@/navigation/navigation-action';
import {routes} from '@/navigation';

function* getBootstrapData(payloadData: any) {
  try {
    const options = {path: 'bootstrap'};

    const response = yield call([Request, 'get'], options);

    const {
      user,
      default_language = 'en',
      abilities = [],
      companies = []
    } = response;

    PermissionService.setPermissions(abilities);

    const isRTL = default_language === 'ar';
    setI18nManagerValue({isRTL});

    yield put(setAccountInformation({account: user}));

    yield put(setGlobalBootstrap(response));

    yield put({type: FETCH_COMPANIES_SUCCESS, payload: {companies}});

    payloadData?.payload?.onSuccess?.(response);
  } catch (e) {}
}

function* login({payload: {params, navigation}}: any) {
  yield put(authTriggerSpinner({loginLoading: true}));

  try {
    const options = {
      path: 'auth/login',
      body: params,
      isAuthRequired: false
    };

    const response = yield call([Request, 'post'], options);

    if (!response?.token) {
      alertMe({desc: t('login.invalid')});
      return;
    }

    yield put(saveIdToken({idToken: response.token, expiresIn: null}));

    yield call(getBootstrapData);

    yield put(loginSuccess());

    yield put(actionCheckOTAUpdate());
  } catch (e) {
    alertMe({desc: t('login.invalid')});
  } finally {
    yield put(authTriggerSpinner({loginLoading: false}));
  }
}

function* biometryAuthLogin({payload}: any) {
  yield put(authTriggerSpinner({loginLoading: true}));

  try {
    yield call(getBootstrapData);

    yield delay(100);

    yield put(loginSuccess());

    yield put(actionCheckOTAUpdate());
  } catch (e) {
  } finally {
    yield put(authTriggerSpinner({loginLoading: false}));
  }
}

function* checkOTAUpdate(payloadData) {
  try {
    const state = yield select();
    const lastAutoUpdateDate = state?.common?.lastAutoUpdateDate;
    const endpointApi = state?.common?.endpointApi;
    const currentDate: string = moment().format('YYYY-MM-DD');

    const isSameDate: boolean = hasValue(lastAutoUpdateDate)
      ? moment(currentDate).isSame(lastAutoUpdateDate)
      : false;

    if (isSameDate || !endpointApi) {
      return;
    }

    const options = {
      path: 'app/version',
      isAuthRequired: false
    };

    const response = yield call([Request, 'get'], options);

    const currentVersion = APP_VERSION;
    const newVersion = response?.version;

    if (
      currentVersion &&
      newVersion &&
      parseInt(currentVersion) < parseInt(newVersion)
    ) {
      yield put(setLastAutoUpdateDate(null));
      yield navigateTo({route: routes.UPDATE_APP_VERSION});
      return;
    }

    yield put(setLastAutoUpdateDate(currentDate));

    const update = yield Updates.checkForUpdateAsync();

    if (update.isAvailable) {
      yield Updates.fetchUpdateAsync();
      yield Updates.reloadAsync();
    }
  } catch (e) {}
}

// Forget Password
function* sendRecoveryMail({payload: {email, onResult}}: any) {
  yield put(authTriggerSpinner({forgetPasswordLoading: true}));

  try {
    const options = {
      path: 'auth/password/email',
      body: {email},
      isAuthRequired: false
    };

    const res = yield call([Request, 'post'], options);

    if (res?.message && res?.message.includes('Password reset email sent')) {
      onResult?.(res);
      return;
    }

    alertMe({desc: t('forgot.emailSendError')});
  } catch (e) {
    alertMe({desc: t('forgot.emailSendError')});
  } finally {
    yield put(authTriggerSpinner({forgetPasswordLoading: false}));
  }
}

function* checkEndpointApi({payload: {endpointURL, onResult}}: any) {
  try {
    yield put(authTriggerSpinner({pingEndpointLoading: true}));

    const options = {
      path: `ping`,
      isAuthRequired: false,
      isPing: `${endpointURL}/api/`
    };

    const response = yield call([Request, 'get'], options);

    let success = true;
    if (response.success === 'crater-self-hosted') {
      yield put(saveEndpointApi({endpointURL}));
      yield put({type: TYPES.PING_SUCCESS, payload: null});
    } else {
      success = false;
    }

    onResult?.(success);
  } catch (e) {
    onResult?.(false);
  } finally {
    yield put(authTriggerSpinner({pingEndpointLoading: false}));
  }
}

export default function* loginSaga() {
  yield takeLatest(TYPES.LOGIN, login);
  yield takeLatest(TYPES.BIOMETRY_AUTH_LOGIN, biometryAuthLogin);
  yield takeLatest(TYPES.GET_BOOTSTRAP, getBootstrapData);
  yield takeLatest(TYPES.SEND_FORGOT_PASSWORD_MAIL, sendRecoveryMail);
  yield takeLatest(TYPES.CHECK_ENDPOINT_API, checkEndpointApi);
  yield takeLatest(CHECK_OTA_UPDATE, checkOTAUpdate);
}
