import { call, put, takeEvery } from 'redux-saga/effects';

import {
  settingsTriggerSpinner,
  setPreferences,
  setSettings,
} from '../../actions';

import {
  // Endpoint Api URL
  GET_PREFERENCES,
  EDIT_PREFERENCES,
  GET_PREFERENCES_URL,
  PREFERENCES_SETTING_TYPE,
  EDIT_PREFERENCES_URL,
  GET_GENERAL_SETTING
} from '../../constants';

import Request from '@/api/request';

function* getPreferences(payloadData) {
  const {
      payload: { onResult },
  } = payloadData;

  yield put(settingsTriggerSpinner({ getPreferencesLoading: true }));

  try {

      const options = {
        path: GET_PREFERENCES_URL(),
        axiosProps: {
          params: { settings: PREFERENCES_SETTING_TYPE }
        }
      };

      const response = yield call([Request, 'get'], options);
      
      yield put(setPreferences({ preferences: response }));
      onResult && onResult(response)

  } catch (error) {
      console.log(error);
  } finally {
      yield put(settingsTriggerSpinner({ getPreferencesLoading: false }));
  }
}

function* editPreferences(payloadData) {
  const {
      payload: { params, navigation, currencies },
  } = payloadData;

  yield put(settingsTriggerSpinner({ editPreferencesLoading: true }));

  try {

      const options = {
        path: EDIT_PREFERENCES_URL(),
        body: { settings: params }
      };

      const response = yield call([Request, 'post'], options);
      
      if (response.success) {
          // let newData = currencies.filter((item) => {
          //     let filterData = false
          //     if (item['id'].toString() === params.currency.toString())
          //         filterData = true

          //     return filterData
          // });

          yield put(setSettings({
              settings: params,
              // currency: newData.length !== 0 ? newData[0] : []
          }));
          navigation.goBack(null)
      }

  } catch (error) {
      console.log(error);
  } finally {
      yield put(settingsTriggerSpinner({ editPreferencesLoading: false }));
  }
}

function* getGeneralSetting({ payload }) {

  const {
    url = null,
    onSuccess = null,
    responseUrl = null
  } = {} = payload

  try {
    const options = {
      path : url
    }

    const response = yield call([Request, 'get'], options)

    if(response[responseUrl ?? url]){
      onSuccess(response[responseUrl ?? url])
    }
    

  } catch (error) {
    console.log(error)
  } finally {
  }
}

export default function* preferencesSaga() {
  // Languages
  // -----------------------------------------
  yield takeEvery(GET_PREFERENCES, getPreferences);
  yield takeEvery(EDIT_PREFERENCES, editPreferences);
  yield takeEvery(GET_GENERAL_SETTING, getGeneralSetting)
}