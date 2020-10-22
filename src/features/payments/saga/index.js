import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    GET_PAYMENTS,
    GET_CREATE_PAYMENT,
    CREATE_PAYMENT,
    GET_UNPAID_INVOICES,
    GET_EDIT_PAYMENT,
    EDIT_PAYMENT,
    REMOVE_PAYMENT,
    SEND_PAYMENT_RECEIPT,
    // Endpoint Api URL
    GET_PAYMENTS_URL,
    GET_CREATE_PAYMENTS_URL,
    CREATE_PAYMENT_URL,
    GET_UNPAID_INVOICES_URL,
    GET_EDIT_PAYMENT_URL,
    EDIT_PAYMENT_URL,
    REMOVE_PAYMENT_URL,
    SEND_PAYMENT_RECEIPT_URL
} from '../constants';

import { paymentTriggerSpinner, setPayments } from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe, hasValue } from '@/constants';
import { getTitleByLanguage } from '@/utils';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('payment_number')) {
        alertMe({
            title: getTitleByLanguage('payments.alreadyInUseNumber')
        });
        return true;
    }
};

function* getPayments({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: GET_PAYMENTS_URL(queryString)
        };

        const response = yield call([Request, 'get'], options);

        if (response?.payments) {
            const { data } = response.payments;
            yield put(setPayments({ payments: data, fresh }));
        }

        onSuccess?.(response?.payments);
    } catch (error) {
    } finally {
    }
}

function* getCreatePayment(payloadData) {
    const {
        payload: { onResult }
    } = payloadData;

    yield put(paymentTriggerSpinner({ initPaymentLoading: true }));

    try {
        const options = {
            path: GET_CREATE_PAYMENTS_URL()
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(paymentTriggerSpinner({ initPaymentLoading: false }));
    }
}

function* createPayment(payloadData) {
    const {
        payload: { params, navigation, onResult, hasRecordPayment }
    } = payloadData;
    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: CREATE_PAYMENT_URL(),
            body: params
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.MAIN_PAYMENTS);
        } else {
            onResult && onResult(response.error);
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* getUnpaidInvoices(payloadData) {
    const {
        payload: { onResult, id }
    } = payloadData;

    yield put(paymentTriggerSpinner({ getUnpaidInvoicesLoading: true }));

    try {
        const options = {
            path: GET_UNPAID_INVOICES_URL(id)
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response.invoices);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(paymentTriggerSpinner({ getUnpaidInvoicesLoading: false }));
    }
}

function* getEditPayment(payloadData) {
    const {
        payload: { id, onResult }
    } = payloadData;

    yield put(paymentTriggerSpinner({ initPaymentLoading: true }));

    try {
        const options = {
            path: GET_EDIT_PAYMENT_URL(id)
        };

        const response = yield call([Request, 'get'], options);
        onResult && onResult(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(paymentTriggerSpinner({ initPaymentLoading: false }));
    }
}

function* editPayment(payloadData) {
    const {
        payload: { id, params, navigation }
    } = payloadData;

    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: EDIT_PAYMENT_URL(id),
            body: params
        };

        const response = yield call([Request, 'put'], options);
        navigation.navigate(ROUTES.MAIN_PAYMENTS);
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* removePayment(payloadData) {
    const {
        payload: { id, navigation }
    } = payloadData;

    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: REMOVE_PAYMENT_URL(id)
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) {
            navigation.navigate(ROUTES.MAIN_PAYMENTS);
        }
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

function* sendPaymentReceipt({ payload: { params, navigation } }) {
    yield put(paymentTriggerSpinner({ paymentLoading: true }));

    try {
        const options = {
            path: SEND_PAYMENT_RECEIPT_URL(),
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
    } catch (error) {
        // console.log(error)
    } finally {
        yield put(paymentTriggerSpinner({ paymentLoading: false }));
    }
}

export default function* paymentsSaga() {
    yield takeEvery(GET_PAYMENTS, getPayments);
    yield takeEvery(GET_CREATE_PAYMENT, getCreatePayment);
    yield takeEvery(CREATE_PAYMENT, createPayment);
    yield takeEvery(GET_UNPAID_INVOICES, getUnpaidInvoices);
    yield takeEvery(GET_EDIT_PAYMENT, getEditPayment);
    yield takeEvery(EDIT_PAYMENT, editPayment);
    yield takeEvery(REMOVE_PAYMENT, removePayment);
    yield takeEvery(SEND_PAYMENT_RECEIPT, sendPaymentReceipt);
}
