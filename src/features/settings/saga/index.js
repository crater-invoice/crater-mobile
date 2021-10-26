import {all, call, put, takeEvery} from 'redux-saga/effects';
import {
  settingsTriggerSpinner as spinner,
  setCompanyInformation,
  setAccountInformation,
  setSettings
} from '../actions';
import {
  GET_COMPANY_INFO,
  EDIT_COMPANY_INFO,
  GET_ACCOUNT_INFO,
  EDIT_ACCOUNT_INFO,
  GET_SETTING_ITEM,
  EDIT_SETTING_ITEM,
  COMPANY_SETTINGS_TYPE,
  NOTIFICATION_MAIL_TYPE
} from '../constants';

import taxes from './taxes';
import currencies from './currencies';
import customFields from './custom-fields';
import Request from 'utils/request';
import General from './general';
import Notes from './notes';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

function* getCompanyInformation({payload: {onResult}}) {
  yield put(spinner({getCompanyInfoLoading: true}));
  try {
    const options = {path: `current-company`};

    const response = yield call([Request, 'get'], options);
    yield put(setCompanyInformation({company: response.data}));

    onResult?.(response.data);
  } catch (e) {
  } finally {
    yield put(spinner({getCompanyInfoLoading: false}));
  }
}

function* editCompanyInformation({payload}) {
  const {params, navigation, logo} = payload;

  yield put(spinner({editCompanyInfoLoading: true}));

  try {
    const options = {
      path: `company`,
      body: params
    };

    const response = yield call([Request, 'put'], options);

    if (logo) {
      const options2 = {
        path: `company/upload-logo`,
        image: logo,
        imageName: 'company_logo'
      };

      yield call([Request, 'post'], options2);
    }

    yield put(setCompanyInformation({company: response.company}));
    navigation?.goBack?.(null);
    showNotification({message: t('notification.company_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner({editCompanyInfoLoading: false}));
  }
}

function* getAccountInformation({payload: {onResult}}) {
  yield put(spinner({getAccountInfoLoading: true}));
  try {
    const options = {path: `me`};

    const response = yield call([Request, 'get'], options);

    yield put(setAccountInformation({account: response.data}));

    onResult?.(response.data);
  } catch (e) {
  } finally {
    yield put(spinner({getAccountInfoLoading: false}));
  }
}

function* editAccountInformation({payload}) {
  const {params, navigation, avatar} = payload;

  yield put(spinner({editAccountInfoLoading: true}));

  try {
    const options = {
      path: `me`,
      body: params
    };

    const response = yield call([Request, 'put'], options);

    yield put(setAccountInformation({account: response.data}));

    if (avatar) {
      const options2 = {
        path: `me/upload-avatar`,
        image: avatar,
        imageName: 'admin_avatar'
      };

      yield call([Request, 'post'], options2);
    }

    navigation?.goBack?.(null);
    showNotification({message: t('notification.account_updated')});
  } catch (e) {
  } finally {
    yield put(spinner({editAccountInfoLoading: false}));
  }
}

function* getSettingItem({payload: {onResult = null}}) {
  yield put(spinner({getSettingItemLoading: true}));

  try {
    const options = {
      path: `company/settings`,
      axiosProps: {
        params: {settings: NOTIFICATION_MAIL_TYPE}
      }
    };

    const response = yield call([Request, 'get'], options);
    onResult?.(response);
  } catch (e) {
  } finally {
    yield put(spinner({getSettingItemLoading: false}));
  }
}

function* editSettingItem({payload}) {
  const {
    params,
    navigation = null,
    onResult = null,
    hasCustomize = false
  } = payload;

  yield put(spinner({editSettingItemLoading: true}));

  try {
    const options = {
      path: `company/settings`,
      body: params
    };

    const response = yield call([Request, 'post'], options);

    if (response.success) {
      if (!hasCustomize) {
        yield put(setSettings({settings: params}));
      }
      onResult?.();
    }

    if (navigation) navigation.goBack(null);
    showNotification({message: t('notification.setting_updated')});
  } catch (e) {
  } finally {
    yield put(spinner({editSettingItemLoading: false}));
  }
}

export default function* settingsSaga() {
  yield takeEvery(GET_COMPANY_INFO, getCompanyInformation);
  yield takeEvery(EDIT_COMPANY_INFO, editCompanyInformation);
  yield takeEvery(GET_ACCOUNT_INFO, getAccountInformation);
  yield takeEvery(EDIT_ACCOUNT_INFO, editAccountInformation);
  yield takeEvery(GET_SETTING_ITEM, getSettingItem);
  yield takeEvery(EDIT_SETTING_ITEM, editSettingItem);

  yield all([taxes(), currencies(), customFields(), General(), Notes()]);
}
