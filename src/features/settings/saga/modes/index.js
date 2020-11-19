import { call, put, takeEvery } from 'redux-saga/effects';
import * as queryStrings from 'query-string';
import { getTitleByLanguage } from '@/utils';
import Request from '@/api/request';
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

        if (response?.paymentMethods) {
            const { data } = response.paymentMethods;
            yield put(setPaymentModes({ paymentMethods: data, fresh }));
        }

        onSuccess?.(response?.paymentMethods);
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

        if (response?.paymentMethod) {
            yield put(
                setPaymentMode({
                    paymentMethod: [response.paymentMethod],
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

        if (response?.paymentMethod) {
            yield put(
                setPaymentMode({
                    paymentMethod: response.paymentMethod,
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
                title: getTitleByLanguage('payments.alreadyInUseMode')
            });
        }
    } catch (e) {
    } finally {
        yield put(spinner({ paymentModeLoading: false }));
    }
}

export default function* paymentMethodsSaga() {
    yield takeEvery(GET_PAYMENT_MODES, getPaymentModes);
    yield takeEvery(CREATE_PAYMENT_MODE, createPaymentMode);
    yield takeEvery(EDIT_PAYMENT_MODE, editPaymentMode);
    yield takeEvery(REMOVE_PAYMENT_MODE, removePaymentMode);
}
