import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {
  setCustomizeSettings,
  spinner
} from './actions';
import {ROUTES} from '@/navigation';
import {getCustomFields} from '@/features/settings/saga/custom-fields';

/**
 * get customization saga
 * @returns {*}
 */
function* fetchCustomizeSettings(payloadData) {
  yield put(spinner({getCustomizeLoading: true}));

  try {
    yield call(getCustomFields, {
      payload: {
        queryString: {limit: 'all'}
      }
    });
    const response = yield call(req.fetchCustomizeSettings);

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
function* updateCustomizeSettings({payload: {params, navigation}}) {
  yield put(spinner({customizeLoading: true}));

  try {
    const body = {settings: params};
    const response = yield call(req.updateCustomizeSettings, body);

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
  yield takeEvery(types.FETCH_CUSTOMIZE_SETTINGS, fetchCustomizeSettings);
  yield takeEvery(types.UPDATE_CUSTOMIZE_SETTINGS, updateCustomizeSettings);
}
