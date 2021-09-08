import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import t from 'locales/use-translation';
import Request from 'utils/request';
import { alertMe } from '@/constants';
import {
    settingsTriggerSpinner as spinner,
    setPaymentModes,
    setPaymentMode
} from '../../actions';
import {
    GET_PAYMENT_MODES,
    CREATE_PAYMENT_MODE,
    EDIT_PAYMENT_MODE,
    REMOVE_PAYMENT_MODE
} from '../../constants';

export function* getPaymentModes({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `payment-methods?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.data) {
            const data = response.data;
            yield put(setPaymentModes({ paymentModes: data, fresh }));
        }

        onSuccess?.(response);
    } catch (e) {}
}

function* createPaymentMode({ payload: { params, onSuccess } }) {
    yield put(spinner({ paymentModeLoading: true }));

    try {
        const options = {
            path: `payment-methods`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data) {
            yield put(
                setPaymentMode({
                    paymentMode: [response.data],
                    isCreated: true
                })
            );
            onSuccess?.();
            return;
        }

        if (response?.data?.errors?.name) {
            alertMe({
                desc: response?.data?.errors.name[0]
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ paymentModeLoading: false }));
    }
}

function* editPaymentMode({ payload: { params, onSuccess } }) {
    yield put(spinner({ paymentModeLoading: true }));

    try {
        const options = {
            path: `payment-methods/${params.id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data) {
            yield put(
                setPaymentMode({
                    paymentMode: response.data,
                    isUpdated: true
                })
            );
            onSuccess?.();
            return;
        }

        if (response?.data?.errors?.name) {
            alertMe({
                desc: response?.data?.errors.name[0]
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ paymentModeLoading: false }));
    }
}

function* removePaymentMode({ payload: { id, onSuccess } }) {
    yield put(spinner({ paymentModeLoading: true }));

    try {
        const options = {
            path: `payment-methods/${id}`
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            yield put(setPaymentMode({ id, isRemove: true }));
            onSuccess?.();
        }

        if (response.error && response.error === 'payments_attached') {
            alertMe({
                title: t('payments.alreadyInUseMode')
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ paymentModeLoading: false }));
    }
}

export default function* paymentModesSaga() {
    yield takeEvery(GET_PAYMENT_MODES, getPaymentModes);
    yield takeEvery(CREATE_PAYMENT_MODE, createPaymentMode);
    yield takeEvery(EDIT_PAYMENT_MODE, editPaymentMode);
    yield takeEvery(REMOVE_PAYMENT_MODE, removePaymentMode);
}
