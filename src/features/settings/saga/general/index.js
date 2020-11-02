import { call, takeEvery } from 'redux-saga/effects';
import {
    GET_GENERAL_SETTING,
    GET_NEXT_NUMBER,
    GET_SETTING_INFO
} from '../../constants';
import Request from '@/api/request';

export function* getNextNumber({ payload: { key } }) {
    try {
        const options = {
            path: `next-number?key=${key}`
        };

        return yield call([Request, 'get'], options);
    } catch (e) {}
}

export function* getSettingInfo({ payload: { key } }) {
    try {
        const options = {
            path: `company/settings`,
            axiosProps: {
                params: { settings: [key] }
            }
        };

        const response = yield call([Request, 'get'], options);
        return response?.[key];
    } catch (e) {}
}

function* getGeneralSetting({ payload }) {
    const { url, onSuccess, responseUrl } = payload;

    try {
        const options = { path: url };

        const response = yield call([Request, 'get'], options);
        if (response[responseUrl ?? url]) {
            onSuccess(response[responseUrl ?? url]);
        }
    } catch (e) {
        console.log({ e });
    }
}

export default function* preferencesSaga() {
    yield takeEvery(GET_NEXT_NUMBER, getNextNumber);
    yield takeEvery(GET_GENERAL_SETTING, getGeneralSetting);
    yield takeEvery(GET_SETTING_INFO, getSettingInfo);
}
