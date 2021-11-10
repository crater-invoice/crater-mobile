import {call, takeEvery} from 'redux-saga/effects';
import Request from 'utils/request';
import {getSettingInfo} from '@/features/settings/saga/general';
import {GET_MAIL_CONFIGURATION} from '../constants';

function* getMailConfiguration({payload: {body, onSuccess}}) {
  try {
    const options = {path: 'mail/config'};
    const emailConfig = yield call([Request, 'get'], options);
    const emailBody = yield call(getSettingInfo, {payload: {key: body}});
    onSuccess?.({...emailConfig, emailBody});
  } catch (e) {}
}

export default function* moreSaga() {
  yield takeEvery(GET_MAIL_CONFIGURATION, getMailConfiguration);
}
