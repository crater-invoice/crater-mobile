import {call, put, takeEvery, select} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import {spinner} from './actions';
import * as types from './types';
import * as req from './service';
import {setI18nManagerValue} from '@/utils';
import {isEmpty} from '@/constants';
import {SET_SETTINGS} from '@/constants';

/**
 * fetch Languages saga
 * @returns {IterableIterator<*>}
 */
function* fetchCurrencies() {
  try {
    const response = yield call(req.fetchCurrencies);

    yield put({
      type: types.FETCH_CURRENCIES_SUCCESS,
      payload: response?.data
    });
  } catch (e) {}
}

/**
 * fetch Languages saga
 * @returns {IterableIterator<*>}
 */
function* fetchLanguages() {
  try {
    const response = yield call(req.fetchLanguages);

    yield put({
      type: types.FETCH_LANGUAGES_SUCCESS,
      payload: response?.languages
    });
  } catch (e) {}
}

/**
 * fetch timezones saga
 * @returns {IterableIterator<*>}
 */
function* fetchTimezones() {
  try {
    const response = yield call(req.fetchTimezones);

    yield put({
      type: types.FETCH_TIMEZONES_SUCCESS,
      payload: response?.time_zones
    });
  } catch (e) {}
}

/**
 * fetch Date-Formats saga
 * @returns {IterableIterator<*>}
 */
function* fetchDateFormats() {
  try {
    const response = yield call(req.fetchDateFormats);
    yield put({
      type: types.FETCH_DATE_FORMATS_SUCCESS,
      payload: response?.date_formats
    });
  } catch (e) {}
}

/**
 * fetch Fiscal-Years saga
 * @returns {IterableIterator<*>}
 */
function* fetchFiscalYears() {
  try {
    const response = yield call(req.fetchFiscalYears);

    yield put({
      type: types.FETCH_FISCAL_YEARS_SUCCESS,
      payload: response?.fiscal_years
    });
  } catch (e) {}
}

/**
 * fetch Retrospective-edits saga
 * @returns {IterableIterator<*>}
 */
function* fetchRetrospectives() {
  try {
    const response = yield call(req.fetchRetrospectives);
    yield put({
      type: types.FETCH_RETROSPECTIVES_SUCCESS,
      payload: response?.retrospective_edits
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
    const response = yield call(req.fetchPreferences);

    const store = yield select();
    const {
      currencies,
      languages,
      timezones,
      dateFormats,
      fiscalYears,
      retrospectiveEdits
    } = store.company;

    yield isEmpty(currencies) && call(fetchCurrencies);
    yield isEmpty(languages) && call(fetchLanguages);
    yield isEmpty(timezones) && call(fetchTimezones);
    yield isEmpty(dateFormats) && call(fetchDateFormats);
    yield isEmpty(fiscalYears) && call(fetchFiscalYears);
    yield isEmpty(retrospectiveEdits) && call(fetchRetrospectives);

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
  const {
    params,
    navigation,
    locale = 'en',
    currencies = null,
    onResult
  } = payload;

  yield put(spinner({updatePreferencesLoading: true}));

  try {
    const body = {settings: params};
    const response = yield call(req.updatePreferences, body);

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
    onResult?.();
    if (params?.language) {
      const isRTL = params.language === 'ar';
      setI18nManagerValue({isRTL});
      if (locale === 'ar' || isRTL) {
        Updates.reloadAsync();
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
