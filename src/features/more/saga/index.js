import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';

import {
    moreTriggerSpinner,
} from '../actions';
import {
    LOGOUT,
} from '../constants';
import { resetIdToken } from '../../authentication/actions';
import { ROUTES } from '../../../navigation/routes';

/**
 * app logout action.
 */
function* logout(payloadData) {
    const {
        payload: { navigation },
    } = payloadData;

    yield put(moreTriggerSpinner({ logoutLoading: true }));

    try {
        yield put(resetIdToken());

        navigation.navigate(ROUTES.AUTH)

    } catch (error) {
        alert('something went wrong');
    } finally {
        yield put(moreTriggerSpinner({ logoutLoading: false }));
    }
}

export default function* moreSaga() {
    yield takeEvery(LOGOUT, logout);
}
