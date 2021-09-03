import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {
  setCustomizeSettings,
  settingsTriggerSpinner as spinner
} from './actions';
import {ROUTES} from '@/navigation';
import {getCustomFields} from '@/features/settings/saga/custom-fields';
import Request from '@/utils/request';

/**
 * Customize Settings
 */
function* getCustomizeSettings(payloadData) {
  yield put(spinner({getCustomizeLoading: true}));

  try {
    yield call(getCustomFields, {
      payload: {
        queryString: {limit: 'all'}
      }
    });

    const options = {
      path: `company/settings`,
      axiosProps: {
        params: {settings: types.COMPANY_SETTINGS_TYPE}
      }
    };
    const response = yield call([Request, 'get'], options);

    yield put(setCustomizeSettings({customizes: response}));
  } catch (e) {
  } finally {
    yield put(spinner({getCustomizeLoading: false}));
  }
}

function* editCustomizeSettings({payload: {params, navigation}}) {
  yield put(spinner({customizeLoading: true}));

  try {
    const settings = {
      settings: params
    };
    const options = {
      path: `company/settings`,
      body: settings
    };

    const response = yield call([Request, 'post'], options);

    if (response.success) {
      navigation.navigate(ROUTES.CUSTOMIZE_LIST);
      yield put(setCustomizeSettings({customizes: null}));
    }
  } catch (e) {
  } finally {
    yield put(spinner({customizeLoading: false}));
  }
}
export default function* customizeSaga() {
  // Customize
  // -----------------------------------------
  yield takeEvery(types.GET_CUSTOMIZE_SETTINGS, getCustomizeSettings);
  yield takeEvery(types.EDIT_CUSTOMIZE_SETTINGS, editCustomizeSettings);
}
