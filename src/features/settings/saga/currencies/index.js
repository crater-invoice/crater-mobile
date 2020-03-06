import { call, put, takeEvery } from 'redux-saga/effects';

import {
    settingsTriggerSpinner,
    setItemUnit,
    setCurrencies,
    setGlobalCurrencies,
} from '../../actions';

import {

    // Endpoint Api URL
    CREATE_ITEM_UNIT_URL,
    EDIT_ITEM_UNIT_URL,
    REMOVE_ITEM_UNIT_URL,
    GET_CURRENCIES,
    CREATE_CURRENCY,
    EDIT_CURRENCY,
    REMOVE_CURRENCY,
    GET_CURRENCIES_URL,
    CREATE_CURRENCY_URL,
    EDIT_CURRENCY_URL,
    REMOVE_CURRENCY_URL,
} from '../../constants';

import Request from '../../../../api/request';
import { hasValue, alertMe } from '../../../../api/global';
import { getTitleByLanguage } from '../../../../navigation/actions';
import { ROUTES } from '../../../../navigation/routes';


const alreadyInUse = (error) => {

    if (error.includes("errors") && error.includes("name")) {

        setTimeout(() => {
            alertMe({
                desc: getTitleByLanguage('alert.alreadyInUse', "\"Name\"")
            })
        }, 1000);

        return true;
    }
}


function* getCurrencies(payloadData) {
    const {
        payload: {
            onResult = null,
            onMeta = null,
            fresh = true,
            search,
            pagination: { page = 1, limit = 10 } = {},
        } = {},
    } = payloadData;

    yield put(settingsTriggerSpinner({ currenciesLoading: true }));

    try {

        let param = {
            search,
            page,
            limit
        }

        const options = {
            path: GET_CURRENCIES_URL(param),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setCurrencies({ currencies: response.currencies.data, fresh }));

        onMeta && onMeta(response.currencies);

        onResult && onResult(response.currencies);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ currenciesLoading: false }));
    }
}


function* createCurrency({ payload: { params, navigation } }) {

    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {

        const options = {
            path: CREATE_CURRENCY_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES)
            yield put(setGlobalCurrencies({
                currency: [response.currency], isCreated: true
            }));
            yield call(getCurrencies, payload = {});
        }

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

function* editCurrency({ payload: { id, params, navigation } }) {

    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {

        const options = {
            path: EDIT_CURRENCY_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES)
            yield put(setGlobalCurrencies({
                currency: [response.currency], isUpdated: true
            }));
            yield call(getCurrencies, payload = {});
        }

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

function* removeCurrency({ payload: { id, navigation } }) {

    yield put(settingsTriggerSpinner({ currencyLoading: true }));

    try {

        const options = {
            path: REMOVE_CURRENCY_URL(id),
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.CURRENCIES)
            yield put(setGlobalCurrencies({ id, isRemove: true }));
            yield call(getCurrencies, payload = {});
        }

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(settingsTriggerSpinner({ currencyLoading: false }));
    }
}

export default function* currenciesSaga() {
    // Currencies
    // -----------------------------------------
    yield takeEvery(GET_CURRENCIES, getCurrencies);
    yield takeEvery(CREATE_CURRENCY, createCurrency);
    yield takeEvery(EDIT_CURRENCY, editCurrency);
    yield takeEvery(REMOVE_CURRENCY, removeCurrency);
}
