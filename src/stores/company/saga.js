import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import * as Updates from 'expo-updates';
import * as types from './types';
import * as req from './service';
import {CompanyServices} from './service';
import {setSelectedCompany, spinner} from './actions';
import t from 'locales/use-translation';
import {setI18nManagerValue, showNotification, handleError} from '@/utils';
import {fetchCountries} from '../common/saga';
import {navigation} from '@/navigation';

/**
 * Fetch companies saga
 * @returns {IterableIterator<*>}
 */
function* fetchCompanies(payload) {
  try {
    const {data} = yield call(req.fetchCompanies);
    yield put({type: types.FETCH_COMPANIES_SUCCESS, payload: data});
    yield put(spinner('isSaving', false));
  } catch (e) {}
}

/**
 * Fetch Currencies saga
 * @returns {IterableIterator<*>}
 */
export function* fetchCurrencies() {
  try {
    if (CompanyServices.isCurrenciesItemLoaded) {
      return;
    }
    const {data} = yield call(req.fetchCurrencies);
    yield put({type: types.FETCH_CURRENCIES_SUCCESS, payload: data});
    CompanyServices.setIsCurrenciesItemLoaded();
  } catch (e) {}
}

/**
 * Fetch Languages saga
 * @returns {IterableIterator<*>}
 */
export function* fetchLanguages() {
  try {
    const {languages} = yield call(req.fetchLanguages);
    yield put({type: types.FETCH_LANGUAGES_SUCCESS, payload: languages});
  } catch (e) {}
}

/**
 * Fetch timezones saga
 * @returns {IterableIterator<*>}
 */
function* fetchTimezones() {
  try {
    const {time_zones} = yield call(req.fetchTimezones);
    yield put({type: types.FETCH_TIMEZONES_SUCCESS, payload: time_zones});
  } catch (e) {}
}

/**
 * Fetch Date-Formats saga
 * @returns {IterableIterator<*>}
 */
function* fetchDateFormats() {
  try {
    const {date_formats} = yield call(req.fetchDateFormats);
    yield put({type: types.FETCH_DATE_FORMATS_SUCCESS, payload: date_formats});
  } catch (e) {}
}

/**
 * Fetch Fiscal-Years saga
 * @returns {IterableIterator<*>}
 */
function* fetchFiscalYears() {
  try {
    const {fiscal_years} = yield call(req.fetchFiscalYears);
    yield put({type: types.FETCH_FISCAL_YEARS_SUCCESS, payload: fiscal_years});
  } catch (e) {}
}

/**
 * Fetch Preferences saga
 * @returns {IterableIterator<*>}
 */
function* fetchPreferences({payload}) {
  try {
    const response = yield call(req.fetchPreferences);

    if (!CompanyServices.isPreferencesItemLoaded) {
      yield call(fetchCurrencies);
      yield call(fetchTimezones);
      yield call(fetchDateFormats);
      yield call(fetchFiscalYears);
      yield call(fetchLanguages);
      CompanyServices.setIsPreferencesItemLoaded();
    }

    yield put(spinner('isSaving', false));
    payload?.onSuccess?.(response);
  } catch (e) {}
}

/**
 * Update Preferences saga
 * @returns {IterableIterator<*>}
 */
function* updatePreferences({payload}) {
  try {
    const {params, navigation, locale = 'en', onResult} = payload;

    yield put(spinner('isSaving', true));

    const body = {settings: params};
    yield call(req.updatePreferences, body);

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

/**
 * Fetch company initial details saga
 * @returns {IterableIterator<*>}
 */
function* fetchCompanyInitialDetails({payload}) {
  try {
    const {isCreateScreen, onSuccess} = payload;
    yield call(fetchCurrencies);
    yield call(fetchCountries);
    let data = null;
    if (!isCreateScreen) {
      const response = yield call(req.fetchCompany);
      data = response.data;
      yield put(setSelectedCompany(data));
    }
    yield put(spinner('isSaving', false));
    onSuccess?.(data);
  } catch (e) {}
}

/**
 * Add company saga
 * @returns {IterableIterator<*>}
 */
function* addCompany({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, logo} = payload;
    const {data} = yield call(req.addCompany, params);
    if (logo) {
      yield call(req.uploadCompanyLogo, logo, data?.id);
    }
    navigation.goBack();
    showNotification({message: t('notification.company_created')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

/**
 * Update company saga
 * @returns {IterableIterator<*>}
 */
function* updateCompany({payload}) {
  try {
    yield put(spinner('isSaving', true));
    const {params, logo} = payload;
    const {data} = yield call(req.updateCompany, params);
    yield put(setSelectedCompany(data));
    if (logo) {
      yield call(req.uploadCompanyLogo, logo, data?.id);
    }
    navigation.goBack();
    showNotification({message: t('notification.company_updated')});
  } catch (e) {
    handleError(e);
  } finally {
    yield put(spinner('isSaving', false));
  }
}

export default function* companySaga() {
  yield takeEvery(types.FETCH_PREFERENCES, fetchPreferences);
  yield takeEvery(types.UPDATE_PREFERENCES, updatePreferences);
  yield takeEvery(types.FETCH_COMPANIES, fetchCompanies);
  yield takeLatest(types.ADD_COMPANY, addCompany);
  yield takeLatest(types.UPDATE_COMPANY, updateCompany);
  yield takeEvery(
    types.FETCH_COMPANY_INITIAL_DETAILS,
    fetchCompanyInitialDetails
  );
}
