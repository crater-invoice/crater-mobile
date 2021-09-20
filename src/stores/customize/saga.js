import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {routes} from '@/navigation';
import {getCustomFields} from '@/features/settings/saga/custom-fields';

/**
 * fetch customization saga
 * @returns {*}
 */
function* fetchCustomizeSettings({payload}) {
  yield put(spinner({fetchCustomizeLoading: true}));
  try {
    yield call(getCustomFields, {
      payload: {
        queryString: {limit: 'all'}
      }
    });
    const response = yield call(req.fetchCustomizeSettings, payload);
    yield put({
      type: types.FETCH_CUSTOMIZE_SETTINGS_SUCCESS,
      payload: response
    });
  } catch (e) {
  } finally {
    yield put(spinner({fetchCustomizeLoading: false}));
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
      navigation.navigate(routes.CUSTOMIZE_LIST);
      yield put({
        type: types.FETCH_CUSTOMIZE_SETTINGS_SUCCESS,
        payload: null
      });
    }
  } catch (e) {
  } finally {
    yield put(spinner({customizeLoading: false}));
  }
}

/**
 * fetch Next-Number saga
 * @returns {*}
 */
export function* fetchNextNumber({payload: {params, onSuccess}}) {
  try {
    const response = yield call(req.fetchNextNumber, params);
    onSuccess?.(response);
  } catch (e) {}
}

export default function* customizeSaga() {
  yield takeEvery(types.FETCH_CUSTOMIZE_SETTINGS, fetchCustomizeSettings);
  yield takeEvery(types.UPDATE_CUSTOMIZE_SETTINGS, updateCustomizeSettings);
  yield takeEvery(types.FETCH_NEXT_NUMBER, fetchNextNumber);
}
