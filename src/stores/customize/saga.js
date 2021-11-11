import {call, put, takeEvery} from 'redux-saga/effects';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {routes} from '@/navigation';
import {fetchCustomFields} from 'stores/custom-field/saga';
import t from 'locales/use-translation';
import {showNotification, handleError} from '@/utils';

/**
 * fetch customization saga
 * @returns {*}
 */
function* fetchCustomizeSettings({payload}) {
  try {
    const {keys, onSuccess} = payload;
    yield call(fetchCustomFields, {payload: {queryString: {limit: 'all'}}});
    const response = yield call(req.fetchCustomizeSettings, keys);
    onSuccess?.(response);
  } catch (e) {}
}

/**
 * Update customization saga
 * @returns {*}
 */
function* updateCustomizeSettings({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, navigation} = payload;
    yield call(req.updateCustomizeSettings, params);
    navigation.navigate(routes.CUSTOMIZE_LIST);
    payload?.successMessage &&
      showNotification({message: t(payload?.successMessage)});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * fetch Next-Number saga
 * @returns {*}
 */
export function* fetchNextNumber({payload}) {
  try {
    const {params, onSuccess} = payload;
    const response = yield call(req.fetchNextNumber, params);
    onSuccess?.(response);
  } catch (e) {}
}

export default function* customizeSaga() {
  yield takeEvery(types.FETCH_CUSTOMIZE_SETTINGS, fetchCustomizeSettings);
  yield takeEvery(types.UPDATE_CUSTOMIZE_SETTINGS, updateCustomizeSettings);
  yield takeEvery(types.FETCH_NEXT_NUMBER, fetchNextNumber);
}
