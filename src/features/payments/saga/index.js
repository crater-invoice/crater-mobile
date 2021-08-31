import { call, put, takeLatest } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import * as TYPES from '../constants';
import { ROUTES } from '@/navigation';
import { alertMe, hasValue } from '@/constants';
import t from 'locales/use-translation';
import { getCustomFields } from '@/features/settings/saga/custom-fields';
import {
    paymentTriggerSpinner as spinner,
    saveUnpaidInvoices,
    setPayments,
    createFromPayment,
    updateFromPayment,
    removeFromPayment
} from '../actions';
import {
    getNextNumber,
    getSettingInfo
} from '@/features/settings/saga/general';
import { CUSTOM_FIELD_TYPES } from '@/features/settings/constants';

function* getPayments({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `payments?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.data) {
            const data = response.data;
            yield put(setPayments({ payments: data, fresh }));
        }

        onSuccess?.(response);
    } catch (e) {}
}

function* getCreatePayment({ payload: { onSuccess } }) {
    try {
        const isAutoGenerate = yield call(getSettingInfo, {
            payload: { key: 'payment_auto_generate' }
        });

        const isAuto = isAutoGenerate === 'YES' || isAutoGenerate === 1;

        const response = yield call(getNextNumber, {
            payload: { key: 'payment' }
        });

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.PAYMENT, limit: 'all' }
            }
        });

        onSuccess?.({
            ...response,
            ...(!isAuto && { nextNumber: null })
        });
    } catch (e) {}
}

function* createPayment({ payload }) {
    const { params, navigation, hasRecordPayment, submissionError } = payload;

    yield put(spinner({ paymentLoading: true }));

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

        if (response.data) {
            yield put(createFromPayment({ payment: response.data }));
        }

        if (!response.data) {
            alertMe({
                desc: t('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        !hasRecordPayment
            ? navigation.goBack(null)
            : navigation.navigate(ROUTES.MAIN_INVOICES);
    } catch (e) {
    } finally {
        yield put(spinner({ paymentLoading: false }));
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

        if (response?.data) {
            const data = response?.data;
            yield put(saveUnpaidInvoices({ invoices: data, fresh }));
        }

        onSuccess?.(response);
    } catch (e) {}
}

function* getPaymentDetail({ payload: { id, onSuccess } }) {
    try {
        const options = { path: `payments/${id}` };

        const response = yield call([Request, 'get'], options);

        if (!response?.data) {
            return;
        }

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.PAYMENT, limit: 'all' }
            }
        });

        onSuccess?.(response);
    } catch (e) {}
}

function* updatePayment({ payload }) {
    const { id, params, navigation, submissionError } = payload;

    yield put(spinner({ paymentLoading: true }));

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

        if (response.data) {
            yield put(updateFromPayment({ payment: response.data }));
        }

        if (!response.data) {
            alertMe({
                desc: t('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        navigation.goBack(null);
    } catch (e) {
    } finally {
        yield put(spinner({ paymentLoading: false }));
    }
}

function* removePayment({ payload: { id, navigation } }) {
    yield put(spinner({ paymentLoading: true }));

    try {
        const options = {
            path: `payments/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(removeFromPayment({ id }));
            navigation.goBack(null);
        }
    } catch (e) {
    } finally {
        yield put(spinner({ paymentLoading: false }));
    }
}

function* sendPaymentReceipt({ payload: { params, navigation, onSuccess } }) {
    yield put(spinner({ sendReceiptLoading: true }));

    try {
        const options = {
            path: `payments/${params.id}/send`,
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            onSuccess?.();
            navigation.navigate(ROUTES.MAIN_PAYMENTS);
            return;
        }

        alertMe({
            desc: t('validation.wrong')
        });
    } catch (e) {
    } finally {
        yield put(spinner({ sendReceiptLoading: false }));
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
