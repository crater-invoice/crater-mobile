import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import { hasValue } from '@/constants';
import t from 'locales/use-translation';
import {
    GET_RECURRING_INVOICES,
    CREATE_RECURRING_INVOICE,
    EDIT_RECURRING_INVOICE,
    // Endpoint Api URL
    CREATE_RECURRING_INVOICE_URL,
    EDIT_RECURRING_INVOICE_URL,
    GET_RECURRING_INVOICES_URL
} from '../../constants';
import {
    invoiceTriggerSpinner,
    setRecurringInvoices,
    removeInvoiceItems
} from '../../actions';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('invoice_number')) {
        alertMe({
            title: t('invoices.alert.alreadyInUseNumber')
        });
        return true;
    }
};

// Recurring Invoice
function* getRecurringInvoices(payloadData) {
    const {
        payload: {
            onResult = null,
            fresh = true,
            type = '',
            onMeta = null,
            params = null,
            pagination: { page = 1, limit = 10 } = {}
        } = {}
    } = payloadData;

    yield put(invoiceTriggerSpinner({ invoicesLoading: true }));

    try {
        let param = {
            ...params,
            page,
            limit
        };

        const options = {
            path: GET_RECURRING_INVOICES_URL(type, param)
        };

        const response = yield call([Request, 'get'], options);

        yield put(
            setRecurringInvoices({ invoices: response.invoices.data, fresh })
        );
        onMeta?.(response.invoices);
        onResult?.(true);
    } catch (error) {
        onResult?.(false);
    } finally {
        yield put(invoiceTriggerSpinner({ invoicesLoading: false }));
    }
}

function* createRecurringInvoice({ payload: { invoice, onResult } }) {
    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    try {
        const options = {
            path: CREATE_RECURRING_INVOICE_URL(),
            body: invoice
        };

        const response = yield call([Request, 'post'], options);

        if (!response.error) {
            yield put(removeInvoiceItems());

            yield put(
                setRecurringInvoices({
                    invoices: [response.invoice],
                    prepend: true
                })
            );

            onResult?.(response?.url);
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

function* editRecurringInvoice({ payload: { invoice, onResult } }) {
    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    try {
        const options = {
            path: EDIT_RECURRING_INVOICE_URL(invoice),
            body: invoice
        };

        const response = yield call([Request, 'put'], options);

        onResult?.(response?.url);

        yield call(getRecurringInvoices, (payload = {}));
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

export default function* recurringInvoiceSaga() {
    // Recurring Invoice
    // -----------------------------------------
    yield takeEvery(GET_RECURRING_INVOICES, getRecurringInvoices);
    yield takeEvery(CREATE_RECURRING_INVOICE, createRecurringInvoice);
    yield takeEvery(EDIT_RECURRING_INVOICE, editRecurringInvoice);
}
