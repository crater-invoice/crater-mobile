import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {
  setCustomizeSettings,
  settingsTriggerSpinner as spinner
} from './actions';
import {ROUTES} from '@/navigation';
import {getCustomFields} from '@/features/settings/saga/custom-fields';

/**
 * get customization saga
 * @returns {*}
 */
function* getCustomizeSettings(payloadData) {
  yield put(spinner({getCustomizeLoading: true}));

  try {
    yield call(getCustomFields, {
      payload: {
        queryString: {limit: 'all'}
      }
    });
    const response = yield call(req.getCustomizeSettings);

    yield put(setCustomizeSettings({customizes: response}));
  } catch (e) {
  } finally {
    yield put(spinner({getCustomizeLoading: false}));
  }
}

/**
 * Update customization saga
 * @returns {*}
 */
function* editCustomizeSettings({payload: {params, navigation}}) {
  yield put(spinner({customizeLoading: true}));

  try {
    const body = {settings: params};
    const response = yield call(req.editCustomizeSettings, body);

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
  yield takeEvery(types.GET_CUSTOMIZE_SETTINGS, getCustomizeSettings);
  yield takeEvery(types.EDIT_CUSTOMIZE_SETTINGS, editCustomizeSettings);
}
