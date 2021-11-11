import {all, call, put, takeEvery} from 'redux-saga/effects';
import {settingsTriggerSpinner as spinner} from '../actions';
import {
  GET_SETTING_ITEM,
  EDIT_SETTING_ITEM,
  NOTIFICATION_MAIL_TYPE
} from '../constants';

import Request from 'utils/request';
import General from './general';
import t from 'locales/use-translation';
import {showNotification} from '@/utils';

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
  const {params, navigation = null, onResult = null} = payload;

  yield put(spinner({editSettingItemLoading: true}));

  try {
    const options = {
      path: `company/settings`,
      body: params
    };

    const response = yield call([Request, 'post'], options);

    if (response.success) {
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
  yield takeEvery(GET_SETTING_ITEM, getSettingItem);
  yield takeEvery(EDIT_SETTING_ITEM, editSettingItem);

  yield all([General()]);
}
