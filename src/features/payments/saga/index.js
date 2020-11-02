import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import {
    paymentTriggerSpinner,
    saveUnpaidInvoices,
    setPayments
} from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe, hasValue } from '@/constants';
import { getTitleByLanguage } from '@/utils';
import {
    getNextNumber,
    getSettingInfo
} from '@/features/settings/saga/general';

function* getPayments({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `payments?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.payments) {
            const { data } = response.payments;
            yield put(setPayments({ payments: data, fresh }));
        }

        onSuccess?.(response?.payments);
    } catch (e) {}
}

function* getCreatePayment({ payload: { onSuccess } }) {
    try {
        const isAutoGenerate = yield call(getSettingInfo, {
            payload: { key: 'payment_auto_generate' }
        });

        const isAuto = isAutoGenerate === 'YES' || isAutoGenerate === 1;

        if (isAuto) {
            const response = yield call(getNextNumber, {
                payload: { key: 'payment' }
            });
            onSuccess?.(response);
            return;
        }

        onSuccess?.({
            nextNumber: null,
            prefix: null
        });
    } catch (e) {}
}

function* createPayment({ payload }) {
    const { params, navigation, submissionError } = payload;

    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: `payments`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.success) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* getUnpaidInvoices({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        if (!hasValue(queryString?.customer_id)) {
            yield put(saveUnpaidInvoices({ invoices: [], fresh: true }));
            onSuccess?.();
            return;
        }

        const path = `invoices?${queryStrings.stringify(queryString)}`;

        const response = yield call([Request, 'get'], { path });

        if (response?.invoices) {
            const { data } = response.invoices;
            yield put(saveUnpaidInvoices({ invoices: data, fresh }));
        }

        onSuccess?.(response?.invoices);
    } catch (e) {}
}

function* getPaymentDetail({ payload: { id, onSuccess } }) {
    try {
        const options = { path: `payments/${id}` };

        const response = yield call([Request, 'get'], options);

        onSuccess?.(response);
    } catch (e) {}
}

function* updatePayment({ payload }) {
    const { id, params, navigation, submissionError } = payload;

    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: `payments/${id}`,
            body: params
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.success) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* removePayment({ payload: { id, navigation } }) {
    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: `payments/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* sendPaymentReceipt({ payload: { params, navigation } }) {
    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: `payments/send`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.error && response.error === 'user_email_does_not_exist') {
            alertMe({
                title: getTitleByLanguage('alert.action.emailNotExist')
            });
        } else {
            navigation.navigate(ROUTES.MAIN_PAYMENTS);
        }
    } catch (e) {
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

export default function* paymentsSaga() {
    yield takeLatest(TYPES.GET_PAYMENTS, getPayments);
    yield takeLatest(TYPES.GET_CREATE_PAYMENT, getCreatePayment);
    yield takeLatest(TYPES.CREATE_PAYMENT, createPayment);
    yield takeLatest(TYPES.GET_UNPAID_INVOICES, getUnpaidInvoices);
    yield takeLatest(TYPES.GET_PAYMENT_DETAIL, getPaymentDetail);
    yield takeLatest(TYPES.UPDATE_PAYMENT, updatePayment);
    yield takeLatest(TYPES.REMOVE_PAYMENT, removePayment);
    yield takeLatest(TYPES.SEND_PAYMENT_RECEIPT, sendPaymentReceipt);
}
