import {call, put, takeEvery, select} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import * as types from './types';
import * as req from './service';
import {spinner} from './actions';
import {isEmpty} from '@/constants';
import {SET_SETTINGS} from '@/constants';
import t from 'locales/use-translation';
import {setI18nManagerValue, showNotification, handleError} from '@/utils';

/**
 * fetch Languages saga
 * @returns {IterableIterator<*>}
 */
function* fetchCurrencies() {
  try {
    const {data} = yield call(req.fetchCurrencies);
    yield put({type: types.FETCH_CURRENCIES_SUCCESS, payload: data});
  } catch (e) {}
}

/**
 * fetch Languages saga
 * @returns {IterableIterator<*>}
 */
function* fetchLanguages() {
  try {
    const {languages} = yield call(req.fetchLanguages);
    yield put({type: types.FETCH_LANGUAGES_SUCCESS, payload: languages});
  } catch (e) {}
}

/**
 * fetch timezones saga
 * @returns {IterableIterator<*>}
 */
function* fetchTimezones() {
  try {
    const {time_zones} = yield call(req.fetchTimezones);
    yield put({type: types.FETCH_TIMEZONES_SUCCESS, payload: time_zones});
  } catch (e) {}
}

/**
 * fetch Date-Formats saga
 * @returns {IterableIterator<*>}
 */
function* fetchDateFormats() {
  try {
    const {date_formats} = yield call(req.fetchDateFormats);
    yield put({type: types.FETCH_DATE_FORMATS_SUCCESS, payload: date_formats});
  } catch (e) {}
}

/**
 * fetch Fiscal-Years saga
 * @returns {IterableIterator<*>}
 */
function* fetchFiscalYears() {
  try {
    const {fiscal_years} = yield call(req.fetchFiscalYears);
    yield put({type: types.FETCH_FISCAL_YEARS_SUCCESS, payload: fiscal_years});
  } catch (e) {}
}

/**
 * fetch Preferences saga
 * @returns {IterableIterator<*>}
 */
function* fetchPreferences({payload}) {
  try {
    const response = yield call(req.fetchPreferences);
    const store = yield select();
    const {
      currencies,
      languages,
      timezones,
      dateFormats,
      fiscalYears
    } = store.company;

    yield isEmpty(currencies) && call(fetchCurrencies);
    yield isEmpty(languages) && call(fetchLanguages);
    yield isEmpty(timezones) && call(fetchTimezones);
    yield isEmpty(dateFormats) && call(fetchDateFormats);
    yield isEmpty(fiscalYears) && call(fetchFiscalYears);
    payload?.onSuccess?.(response);
  } catch (e) {}
}

/**
 * update Preferences saga
 * @returns {IterableIterator<*>}
 */
function* updatePreferences({payload}) {
  try {
    const {
      params,
      navigation,
      locale = 'en',
      currencies = null,
      onResult
    } = payload;

    yield put(spinner('isSaving', true));

    const body = {settings: params};
    yield call(req.updatePreferences, body);

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

    onResult?.();

    showNotification({message: t('notification.preference_updated')});

    if (params?.language) {
      const isRTL = params.language === 'ar';
      setI18nManagerValue({isRTL});
      if (locale === 'ar' || isRTL) {
        Updates.reloadAsync();
      }
    }
    navigation?.goBack?.(null);
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

export default function* companySaga() {
  yield takeEvery(types.FETCH_PREFERENCES, fetchPreferences);
  yield takeEvery(types.UPDATE_PREFERENCES, updatePreferences);
}
