import {call, put, takeEvery, select} from 'redux-saga/effects';
import moment from 'moment';
import * as Updates from 'expo-updates';
import * as types from './types';
import * as req from './service';
import {setI18nManagerValue, showNotification} from '@/utils';
import t from 'locales/use-translation';
import {routes} from '@/navigation';
import {hasValue} from '@/constants';
import {APP_VERSION} from '../../../config';
import {navigateTo} from '@/navigation/navigation-action';
import {setLastOTACheckDate} from './actions';
import {PermissionService} from '@/services';
import {setAccountInformation} from '@/features/settings/actions';
import {PING_SUCCESS} from '../auth/types';

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
    showNotification({message: t('endpoint.alertInvalidUrl'), type: 'error'});
    onResult?.();
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

    if (isSameDate || !endpointApi) {
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
      user,
      default_language = 'en',
      abilities = [],
      companies = []
    } = response;

    PermissionService.setPermissions(abilities);
    const isRTL = default_language === 'ar';
    setI18nManagerValue({isRTL});
    yield put(setAccountInformation({account: user}));
    yield put({type: types.FETCH_BOOTSTRAP_SUCCESS, payload: response});
    // yield put({type: FETCH_COMPANIES_SUCCESS, payload: {companies}});
    payloadData?.payload?.onSuccess?.(response);
  } catch (e) {}
}

export default function* commonSaga() {
  yield takeEvery(types.SAVE_ENDPOINT_URL, saveEndpointURL);
  yield takeEvery(types.CHECK_OTA_UPDATE, checkOTAUpdate);
  yield takeEvery(types.FETCH_BOOTSTRAP, fetchBootstrap);
  yield takeEvery(
    types.FETCH_TAX_AND_DISCOUNT_PER_ITEM,
    fetchTaxAndDiscountPerItem
  );
}
