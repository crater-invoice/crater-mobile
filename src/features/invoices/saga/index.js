import { all, call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import {
    GET_INVOICES,
    GET_CREATE_INVOICE,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_INVOICE,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_INVOICE,
    EDIT_INVOICE,
    REMOVE_INVOICE,
    CHANGE_INVOICE_STATUS,
    // Endpoint Api URL
    GET_INVOICES_URL,
    GET_CREATE_INVOICE_URL,
    GET_EDIT_INVOICE_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_INVOICE_URL,
    EDIT_INVOICE_URL,
    GET_ITEMS_URL,
    REMOVE_INVOICE_URL,
    CHANGE_INVOICE_STATUS_URL
} from '../constants';
import {
    invoiceTriggerSpinner,
    setInvoices,
    setItems,
    setInvoiceItems,
    removeInvoiceItem,
    removeInvoiceItems,
    setInvoice,
    removeFromInvoices
} from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe, hasValue } from '@/constants';
import recurring from './recurringInvoice';
import { store } from '@/store';
import { getTitleByLanguage } from '@/utils';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('invoice_number')) {
        alertMe({
            title: getTitleByLanguage('invoices.alert.alreadyInUseNumber')
        });
        return true;
    }
};

function* getInvoices({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    yield put(invoiceTriggerSpinner({ invoicesLoading: true }));

    try {
        const options = {
            path: GET_INVOICES_URL(queryString)
        };

        const response = yield call([Request, 'get'], options);

        if (response?.invoices) {
            const { data } = response.invoices;
            yield put(setInvoices({ invoices: data, fresh }));
        }
        onSuccess?.(response?.invoices);
    } catch (error) {
    } finally {
        yield put(invoiceTriggerSpinner({ invoicesLoading: false }));
    }
}

function* getCreateInvoice(payloadData) {
    const {
        payload: { onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ initInvoiceLoading: true }));

    try {
        const options = {
            path: GET_CREATE_INVOICE_URL()
        };

        const response = yield call([Request, 'get'], options);

        yield put(setInvoice(response));

        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ initInvoiceLoading: false }));
    }
}

function* getEditInvoice(payloadData) {
    const {
        payload: { id, onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ initInvoiceLoading: true }));

    try {
        const {
            settings: { taxTypes }
        } = store.getState();

        const options = {
            path: GET_EDIT_INVOICE_URL(id)
        };

        const response = yield call([Request, 'get'], options);

        yield put(setInvoice(response));

        yield put(removeInvoiceItems());

        yield put(setInvoiceItems({ invoiceItem: response.invoice.items }));

        onResult && onResult(response.invoice);
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ initInvoiceLoading: false }));
    }
}

function* addItem(payloadData) {
    const {
        payload: { item, onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ createInvoiceItemLoading: true }));

    try {
        const { price, name, description, taxes, unit_id } = item;

        const options = {
            path: CREATE_ITEM_URL(),
            body: {
                name,
                description,
                price,
                unit_id,
                taxes
            }
        };

        const response = yield call([Request, 'post'], options);

        const invoiceItem = [
            {
                ...response.item,
                item_id: response.item.id,
                ...item
            }
        ];

        yield put(setInvoiceItems({ invoiceItem }));

        onResult && onResult();
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ createInvoiceItemLoading: false }));
    }
}

function* editItem(payloadData) {
    const {
        payload: { item, onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ createInvoiceItemLoading: true }));

    try {
        const { price, name, description, item_id } = item;

        const options = {
            path: EDIT_ITEM_URL(item_id),
            body: {
                name,
                description,
                price
            }
        };

        const response = yield call([Request, 'put'], options);

        const invoiceItem = [
            {
                ...response.item,
                ...item
            }
        ];

        yield put(removeInvoiceItem({ id: invoiceItem.id }));

        yield put(setInvoiceItems({ invoiceItem }));

        onResult && onResult();
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ createInvoiceItemLoading: false }));
    }
}

function* createInvoice(payloadData) {
    const {
        payload: { invoice, onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    try {
        const options = {
            path: CREATE_INVOICE_URL(),
            body: invoice
        };

        const response = yield call([Request, 'post'], options);

        if (!response.error) {
            yield put(removeInvoiceItems());

            yield put(
                setInvoices({ invoices: [response.invoice], prepend: true })
            );

            onResult && onResult(response.url);
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

function* editInvoice(payloadData) {
    const {
        payload: { invoice, onResult }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    try {
        const options = {
            path: EDIT_INVOICE_URL(invoice),
            body: invoice
        };

        const response = yield call([Request, 'put'], options);

        onResult && onResult(response.url);

        yield put(removeFromInvoices({ id: invoice.id }));

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

function* getItems(payloadData) {
    const {
        payload: {
            onResult,
            fresh,
            onMeta,
            search = '',
            q = '',
            pagination: { page, limit }
        }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ itemsLoading: true }));

    try {
        const options = {
            path: GET_ITEMS_URL(q, search, page, limit)
        };

        const response = yield call([Request, 'get'], options);

        yield put(setItems({ items: response.items.data, fresh }));

        onMeta && onMeta(response.items);

        onResult && onResult(response.items);
    } catch (error) {
        onResult && onResult(response.items);
    } finally {
        yield put(invoiceTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem(payloadData) {
    const {
        payload: { onResult, id }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ removeItemLoading: true }));

    try {
        yield put(removeInvoiceItem({ id }));

        onResult && onResult();
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ removeItemLoading: false }));
    }
}

function* removeInvoice(payloadData) {
    const {
        payload: { onResult, id }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    try {
        const options = {
            path: REMOVE_INVOICE_URL(id)
        };

        const response = yield call([Request, 'delete'], options);

        if (response.success) yield put(removeFromInvoices({ id }));

        onResult && onResult(response);
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

function* changeInvoiceStatus(payloadData) {
    const {
        payload: { onResult = null, params = null, id, action, navigation }
    } = payloadData;

    yield put(invoiceTriggerSpinner({ invoiceLoading: true }));

    const param = { id, ...params };

    try {
        const options = {
            path: CHANGE_INVOICE_STATUS_URL(action),
            body: { ...param }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success || hasValue(response.invoice)) {
            action === 'send'
                ? navigation.navigate(ROUTES.MAIN_INVOICES, {
                      mailSendMsg: 'sendMail.sendEmailToast'
                  })
                : navigation.navigate(ROUTES.MAIN_INVOICES);
        } else {
            response.error === 'user_email_does_not_exist' &&
                alertMe({
                    desc: getTitleByLanguage('alert.action.emailNotExist')
                });
        }

        onResult && onResult();
    } catch (e) {
    } finally {
        yield put(invoiceTriggerSpinner({ invoiceLoading: false }));
    }
}

export default function* invoicesSaga() {
    yield takeEvery(GET_INVOICES, getInvoices);
    yield takeEvery(GET_CREATE_INVOICE, getCreateInvoice);
    yield takeEvery(GET_EDIT_INVOICE, getEditInvoice);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_INVOICE, createInvoice);
    yield takeEvery(EDIT_INVOICE, editInvoice);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(REMOVE_INVOICE, removeInvoice);
    yield takeEvery(CHANGE_INVOICE_STATUS, changeInvoiceStatus);

    yield all([recurring()]);
}
