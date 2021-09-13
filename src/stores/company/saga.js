import {call, put, takeEvery} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import Request from 'utils/request';
import {spinner} from './actions';
import * as types from './types';
import {setI18nManagerValue} from '@/utils';
import {isEmpty} from '@/constants';
import {SET_SETTINGS} from '@/constants';

/**
 * fetch Languages saga
 * @returns {IterableIterator<*>}
 */
function* fetchLanguages() {
  try {
    const options = {path: 'config/languages'};
    const response = yield call([Request, 'get'], options);

    yield put({
      type: types.FETCH_LANGUAGES_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * fetch timezones saga
 * @returns {IterableIterator<*>}
 */
function* fetchTimezones() {
  try {
    const options = {path: 'timezones'};
    const response = yield call([Request, 'get'], options);

    yield put({
      type: types.FETCH_TIMEZONES_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * fetch Date-Formats saga
 * @returns {IterableIterator<*>}
 */
function* fetchDateFormats() {
  try {
    const options = {path: 'date/formats'};
    const response = yield call([Request, 'get'], options);
    yield put({
      type: types.FETCH_DATE_FORMATS_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * fetch Fiscal-Years saga
 * @returns {IterableIterator<*>}
 */
function* fetchFiscalYears() {
  try {
    const options = {path: 'config/fiscal/years'};
    const response = yield call([Request, 'get'], options);

    yield put({
      type: types.FETCH_FISCAL_YEARS_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * fetch Fiscal-Years saga
 * @returns {IterableIterator<*>}
 */
function* fetchRetrospective() {
  try {
    const options = {path: 'config/retrospective-edit-options'};
    const response = yield call([Request, 'get'], options);
    yield put({
      type: types.FETCH_RETROSPECTIVES_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * fetch Preferences saga
 * @returns {IterableIterator<*>}
 */
function* fetchPreferences({payload: {onSuccess}}) {
  yield put(spinner({fetchPreferencesLoading: true}));
  try {
    const options = {
      path: `company/settings`,
      axiosProps: {
        params: {settings: types.PREFERENCES_SETTING_TYPE}
      }
    };

    const response = yield call([Request, 'get'], options);
    yield call(fetchLanguages);
    yield call(fetchTimezones);
    yield call(fetchDateFormats);
    yield call(fetchFiscalYears);
    yield call(fetchRetrospective);
    onSuccess?.(response);
  } catch (e) {
  } finally {
    yield put(spinner({fetchPreferencesLoading: false}));
  }
}

/**
 * update Preferences saga
 * @returns {IterableIterator<*>}
 */
function* updatePreferences({payload}) {
  const {params, navigation, locale = 'en', currencies = null} = payload;

  yield put(spinner({updatePreferencesLoading: true}));

  try {
    const options = {
      path: `company/settings`,
      body: {settings: params}
    };

    const response = yield call([Request, 'post'], options);
    if (response?.success) {
      let selectedCurrency = null;
      if (params?.currency && !isEmpty(currencies)) {
        selectedCurrency = currencies.find(
          currency => currency?.fullItem?.id === Number(params?.currency)
        );
        selectedCurrency = selectedCurrency?.fullItem;
      }
      yield put({
        type: SET_SETTINGS,
        payload: {settings: {...params, selectedCurrency}}
      });
    }

    if (params?.language) {
      const options = {
        path: `me/settings`,
        body: {settings: {language: params?.language}}
      };
      const res = yield call([Request, 'put'], options);
      if (res.success) {
        const isRTL = params.language === 'ar';
        setI18nManagerValue({isRTL});
        if (locale === 'ar' || isRTL) {
          Updates.reloadAsync();
        }
      }
    }

    navigation.goBack(null);
  } catch (e) {
  } finally {
    yield put(spinner({updatePreferencesLoading: false}));
  }
}
export default function* companySaga() {
  yield takeEvery(types.FETCH_PREFERENCES, fetchPreferences);
  yield takeEvery(types.UPDATE_PREFERENCES, updatePreferences);
}
