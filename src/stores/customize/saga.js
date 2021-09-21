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
  const {keys, onSuccess} = payload;

  try {
    yield call(getCustomFields, {payload: {queryString: {limit: 'all'}}});
    const response = yield call(req.fetchCustomizeSettings, keys);
    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Update customization saga
 * @returns {*}
 */
function* updateCustomizeSettings({payload}) {
  const {params, navigation} = payload;

  yield put(spinner({customizeLoading: true}));

  try {
    const body = {settings: params};
    const response = yield call(req.updateCustomizeSettings, body);

    if (response.success) {
      navigation.navigate(routes.CUSTOMIZE_LIST);
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
export function* fetchNextNumber({payload}) {
  const {params, onSuccess} = payload;

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
