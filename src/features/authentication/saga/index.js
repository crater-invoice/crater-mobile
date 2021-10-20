import {call, put, takeLatest, delay, select} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import moment from 'moment';
import {
  saveIdToken,
  setGlobalBootstrap,
  saveEndpointApi,
  setLastAutoUpdateDate,
  checkOTAUpdate as actionCheckOTAUpdate,
  loginSuccess
} from '../actions';
import * as TYPES from '../constants';
import {setAccountInformation} from '../../settings/actions';
import {hasValue} from '@/constants';
import {CHECK_OTA_UPDATE} from '@/constants';
import Request from 'utils/request';
import {setI18nManagerValue} from '@/utils';
import t from 'locales/use-translation';
import {FETCH_COMPANIES_SUCCESS} from '@/features/common/constants';
import {APP_VERSION} from '../../../../config';
import {PermissionService} from '@/services';
import {navigateTo} from '@/navigation/navigation-action';
import {routes} from '@/navigation';
import {showNotification} from '@/utils';

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

function* login({payload}: any) {
  const {params, onResult} = payload;
  try {
    const options = {
      path: 'auth/login',
      body: params,
      isAuthRequired: false
    };
    const response = yield call([Request, 'post'], options);
    yield put(saveIdToken({idToken: response.token, expiresIn: null}));
    yield call(getBootstrapData, null);
    yield put(loginSuccess());
    yield put(actionCheckOTAUpdate());
    onResult?.();
  } catch (e) {
    showNotification({message: t('login.invalid'), type: 'error'});
    onResult?.();
  }
}

function* biometryAuthLogin({payload}) {
  try {
    yield call(getBootstrapData, null);
    yield delay(100);
    yield put(loginSuccess());
    yield put(actionCheckOTAUpdate());
    payload?.();
  } catch (e) {
    payload?.();
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

    const options = {path: 'app/version', isAuthRequired: false};
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

function* sendRecoveryMail({payload}) {
  const {email, onSuccess, onFail} = payload;
  try {
    const options = {
      path: 'auth/password/email',
      body: {email},
      isAuthRequired: false
    };
    yield call([Request, 'post'], options);
    onSuccess?.();
  } catch (e) {
    showNotification({message: t('forgot.emailSendError'), type: 'error'});
    onFail?.();
  }
}

function* checkEndpointApi({payload}: any) {
  const {endpointURL, navigation, onResult} = payload;
  try {
    const options = {
      path: `ping`,
      isAuthRequired: false,
      isPing: `${endpointURL}/api/`
    };
    yield call([Request, 'get'], options);
    yield put(saveEndpointApi({endpointURL}));
    yield put({type: TYPES.PING_SUCCESS, payload: null});
    navigation.navigate(routes.LOGIN);
    onResult?.();
  } catch (e) {
    showNotification({message: t('endpoint.alertInvalidUrl'), type: 'error'});
    onResult?.();
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
