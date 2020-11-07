import { call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setItemUnit,
    setCurrencies,
    setGlobalCurrencies
} from '../../actions';

import {
    CREATE_CURRENCY,
    EDIT_CURRENCY,
    REMOVE_CURRENCY
} from '../../constants';

import { getTitleByLanguage } from '@/utils';
import { ROUTES } from '@/navigation';
import Request from '@/api/request';
import { alertMe, hasValue } from '@/constants';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('name')) {
        setTimeout(() => {
            alertMe({
                desc: getTitleByLanguage('alert.alreadyInUse', '"Name"')
            });
        }, 1000);

        return true;
    }
};

function* createCurrency({ payload: { params, navigation } }) {
    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {
        const options = {
            path: `currencies`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES);
            yield put(
                setGlobalCurrencies({
                    currency: [response.currency],
                    isCreated: true
                })
            );
            yield call(getCurrencies, (payload = {}));
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

function* editCurrency({ payload: { id, params, navigation } }) {
    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {
        const options = {
            path: `currencies/${id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES);
            yield put(
                setGlobalCurrencies({
                    currency: [response.currency],
                    isUpdated: true
                })
            );
            yield call(getCurrencies, (payload = {}));
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

function* removeCurrency({ payload: { id, navigation } }) {
    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {
        const options = {
            path: `currencies/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES);
            yield put(setGlobalCurrencies({ id, isRemove: true }));
            yield call(getCurrencies, (payload = {}));
        }
    } catch (e) {
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

export default function* currenciesSaga() {
    // Currencies
    // -----------------------------------------
    yield takeEvery(CREATE_CURRENCY, createCurrency);
    yield takeEvery(EDIT_CURRENCY, editCurrency);
    yield takeEvery(REMOVE_CURRENCY, removeCurrency);
}
