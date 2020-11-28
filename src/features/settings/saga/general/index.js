import { call, takeEvery, put } from 'redux-saga/effects';
import {
    GET_GENERAL_SETTING,
    GET_NEXT_NUMBER,
    GET_SETTING_INFO
} from '../../constants';
import Request from '@/api/request';
import { setGlobalCurrencies } from '../../actions';

export function* getNextNumber({ payload: { key } }) {
    try {
        const options = {
            path: `next-number?key=${key}`
        };

        return yield call([Request, 'get'], options);
    } catch (e) {}
}

export function* getSettingInfo({ payload }) {
    const { key = null, keys = null, onSuccess = null } = payload;

    try {
        const options = {
            path: `company/settings`,
            axiosProps: {
                params: { settings: keys ? keys : [key] }
            }
        };

        const response = yield call([Request, 'get'], options);

        if (onSuccess) {
            onSuccess(keys ? response : response?.[key]);
            return;
        }

        return keys ? response : response?.[key];
    } catch (e) {}
}

export function* getGeneralSetting({ payload }) {
    const { url, onSuccess, responseUrl, returnResponse = false } = payload;

    try {
        const options = { path: url };

        const response = yield call([Request, 'get'], options);

        if (returnResponse) {
            return response[responseUrl ?? url];
        }

        if (url === 'currencies') {
            yield put(
                setGlobalCurrencies({
                    currencies: response[responseUrl ?? url]
                })
            );
        }

        if (response[responseUrl ?? url]) {
            onSuccess?.(response[responseUrl ?? url]);
        }
    } catch (e) {}
}

export default function* preferencesSaga() {
    yield takeEvery(GET_NEXT_NUMBER, getNextNumber);
    yield takeEvery(GET_GENERAL_SETTING, getGeneralSetting);
    yield takeEvery(GET_SETTING_INFO, getSettingInfo);
}
