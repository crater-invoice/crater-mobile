import {call, put, takeEvery, select} from 'redux-saga/effects';
import moment from 'moment';
import * as Updates from 'expo-updates';
import * as types from './types';
import * as req from './service';
import {setI18nManagerValue, showNotification} from '@/utils';
import t from 'locales/use-translation';
import {routes, resetNavigation} from '@/navigation';
import {hasValue} from '@/constants';
import {APP_VERSION} from '../../../config';
import {navigateTo} from '@/navigation/navigation-action';
import {setLastOTACheckDate} from './actions';
import {PermissionService} from '@/services';
import {PING_SUCCESS} from '../auth/types';
import {FETCH_COMPANIES_SUCCESS} from '../company/types';
import {setCompanySetting, setSelectedCompany} from '../company/actions';
import {setUserSetting} from '../user/actions';
import {CommonServices} from './service';
import {TranslationService} from 'locales/use-translation';

/**
 * Fetch Tax And Discount Per item saga.
 * @returns {*}
 */
export function* fetchTaxAndDiscountPerItem() {
  try {
    const response = yield call(req.fetchTaxAndDiscountPerItem);
    yield put({
      type: types.FETCH_TAX_AND_DISCOUNT_PER_ITEM_SUCCESS,
      payload: response
    });
  } catch (e) {}
}

/**
 * Save endpoint url saga
 * @returns {IterableIterator<*>}
 */
function* saveEndpointURL({payload}) {
  const {url, navigation, onResult} = payload;
  try {
    yield call(req.pingUrl, url);
    yield put({type: types.SAVE_ENDPOINT_URL_SUCCESS, payload: url});
    yield put({type: PING_SUCCESS, payload: null});
    navigation.navigate(routes.LOGIN);
    onResult?.();
  } catch (e) {
    showNotification({message: t('endpoint.alert_invalid_url'), type: 'error'});
    onResult?.();
  }
}

/**
 * Check exchange rate saga
 * @returns {IterableIterator<*>}
 */
function* checkExchangeRate({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.checkExchangeRate, id);
    onSuccess?.(response);
  } catch (e) {
    payload?.onFail?.();
  }
}

/**
 * Check exchange rate provider saga
 * @returns {IterableIterator<*>}
 */
function* checkExchangeRateProvider({payload}) {
  try {
    const {id, onSuccess} = payload;
    const response = yield call(req.checkExchangeRateProvider, id);
    onSuccess?.(response);
  } catch (e) {
    payload?.onFail?.();
  }
}

/**
 * Check OTA update saga
 * @returns {IterableIterator<*>}
 */
function* checkOTAUpdate(payload) {
  try {
    const state = yield select();
    const lastOTACheckDate = state?.common?.lastOTACheckDate;
    const endpointApi = state?.common?.endpointApi;
    const currentDate: string = moment().format('YYYY-MM-DD');
    const isSameDate: boolean = hasValue(lastOTACheckDate)
      ? moment(currentDate).isSame(lastOTACheckDate)
      : false;

    if (!endpointApi) {
      return;
    }

    const response = yield call(req.checkAppVersion);
    const currentVersion = APP_VERSION;
    const newVersion = response?.version;

    if (
      currentVersion &&
      newVersion &&
      parseInt(currentVersion) < parseInt(newVersion)
    ) {
      yield put(setLastOTACheckDate(null));
      yield navigateTo({route: routes.UPDATE_APP_VERSION});
      return;
    }

    yield put(setLastOTACheckDate(currentDate));
    const update = yield Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      yield Updates.fetchUpdateAsync();
      yield Updates.reloadAsync();
    }
  } catch (e) {}
}

/**
 * Fetch bootstrap saga
 * @returns {IterableIterator<*>}
 */
export function* fetchBootstrap(payloadData) {
  try {
    const response = yield call(req.fetchBootstrap);
    const {
      current_user,
      current_company,
      current_company_currency,
      current_company_settings,
      current_user_settings,
      current_user_abilities = [],
      companies = []
    } = response;
    const locale = current_user_settings?.language ?? 'en';
    PermissionService.setPermissions(
      current_user_abilities,
      current_user?.is_owner
    );
    TranslationService.setLocale(locale);
    const isRTL = locale === 'ar';
    setI18nManagerValue({isRTL});
    yield put({type: types.FETCH_BOOTSTRAP_SUCCESS, payload: response});
    yield put({type: FETCH_COMPANIES_SUCCESS, payload: companies});
    yield put(setSelectedCompany(current_company));
    yield put(
      setUserSetting({
        currentUser: current_user,
        currentAbilities: current_user_abilities
      })
    );
    yield put(
      setCompanySetting({
        selectedCompanyCurrency: current_company_currency,
        selectedCompanySettings: current_company_settings
      })
    );

    const state = yield select();
    if (state?.common?.locale !== locale) {
      resetNavigation();
    }

    payloadData?.payload?.onSuccess?.(response);
    if (payloadData?.returnResponse) {
      return true;
    }
  } catch (e) {
    if (payloadData?.returnResponse) {
      return false;
    }
  }
}

/**
 * Fetch countries saga
 * @returns {IterableIterator<*>}
 */
export function* fetchCountries() {
  try {
    if (CommonServices.isCountriesItemLoaded) {
      return;
    }
    const {data} = yield call(req.fetchCountries);
    yield put({type: types.FETCH_COUNTRIES_SUCCESS, payload: data});
    CommonServices.setIsCountriesItemLoaded();
  } catch (e) {}
}

export default function* commonSaga() {
  yield takeEvery(types.SAVE_ENDPOINT_URL, saveEndpointURL);
  yield takeEvery(types.CHECK_EXCHANGE_RATE, checkExchangeRate);
  yield takeEvery(
    types.CHECK_EXCHANGE_RATE_PROVIDER,
    checkExchangeRateProvider
  );
  yield takeEvery(types.CHECK_OTA_UPDATE, checkOTAUpdate);
  yield takeEvery(types.FETCH_BOOTSTRAP, fetchBootstrap);
  yield takeEvery(types.FETCH_COUNTRIES, fetchCountries);
  yield takeEvery(
    types.FETCH_TAX_AND_DISCOUNT_PER_ITEM,
    fetchTaxAndDiscountPerItem
  );
}
