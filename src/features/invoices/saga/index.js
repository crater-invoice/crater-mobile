import { all, call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
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
    GET_INVOICE_TEMPLATE
} from '../constants';
import {
    invoiceTriggerSpinner as spinner,
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
import { store } from '@/store';
import { getTitleByLanguage } from '@/utils';
import {
    getNextNumber,
    getSettingInfo
} from '@/features/settings/saga/general';

function* getInvoices({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    yield put(spinner({ invoicesLoading: true }));

    try {
        const options = {
            path: `invoices?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.invoices) {
            const { data } = response.invoices;
            yield put(setInvoices({ invoices: data, fresh }));
        }
        onSuccess?.(response?.invoices);
    } catch (error) {
    } finally {
        yield put(spinner({ invoicesLoading: false }));
    }
}

function* getCreateInvoice({ payload: { onSuccess } }) {
    yield put(spinner({ initInvoiceLoading: true }));

    try {
        const response = yield call(getSettingInfo, {
            payload: {
                keys: [
                    'invoice_auto_generate',
                    'tax_per_item',
                    'discount_per_item'
                ]
            }
        });

        const { invoice_auto_generate } = response;

        const isAuto =
            invoice_auto_generate === 'YES' || invoice_auto_generate === 1;

        const nextInvoiceNumber = yield call(getNextNumber, {
            payload: { key: 'invoice' }
        });

        const values = {
            ...nextInvoiceNumber,
            ...(!isAuto && { nextNumber: null })
        };

        const { invoiceTemplates } = yield call(geInvoiceTemplates, {});

        yield put(setInvoice({ ...response, ...values, invoiceTemplates }));

        onSuccess?.(values);
    } catch (e) {
    } finally {
        yield put(spinner({ initInvoiceLoading: false }));
    }
}

function* getEditInvoice({ payload: { id, onSuccess } }) {
    yield put(spinner({ initInvoiceLoading: true }));

    try {
        const options = {
            path: `invoices/${id}`
        };

        const response = yield call([Request, 'get'], options);

        if (!response?.invoice) {
            return;
        }

        const { invoice, invoicePrefix, nextInvoiceNumber } = response;

        const { invoiceTemplates } = yield call(geInvoiceTemplates, {});

        const values = {
            invoice,
            invoicePrefix,
            nextInvoiceNumber,
            invoiceTemplates,
            discount_per_item: invoice?.discount_per_item,
            tax_per_item: invoice?.tax_per_item
        };

        yield put(setInvoice(values));

        yield put(removeInvoiceItems());

        yield put(setInvoiceItems({ invoiceItem: invoice?.items ?? [] }));

        onSuccess?.(invoice);
    } catch (e) {
    } finally {
        yield put(spinner({ initInvoiceLoading: false }));
    }
}

function* addItem({ payload: { item, onResult } }) {
    yield put(spinner({ createInvoiceItemLoading: true }));

    try {
        const { price, name, description, taxes, unit_id } = item;

        const options = {
            path: `items`,
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

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ createInvoiceItemLoading: false }));
    }
}

function* editItem({ payload: { item, onResult } }) {
    yield put(spinner({ createInvoiceItemLoading: true }));

    try {
        const { price, name, description, item_id } = item;

        const options = {
            path: `items/${item_id}`,
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

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ createInvoiceItemLoading: false }));
    }
}

function* createInvoice({ payload }) {
    const { invoice, onSuccess, submissionError, navigation } = payload;
    yield put(spinner({ invoiceLoading: true }));

    try {
        const options = {
            path: `invoices`,
            body: invoice
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.invoice) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        yield put(removeInvoiceItems());
        onSuccess?.(response?.invoice?.invoicePdfUrl);
    } catch (e) {
    } finally {
        yield put(spinner({ invoiceLoading: false }));
    }
}

function* editInvoice({ payload }) {
    const { invoice, onSuccess, submissionError, navigation } = payload;

    yield put(spinner({ invoiceLoading: true }));

    try {
        const options = {
            path: `invoices/${invoice.id}`,
            body: invoice
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.invoice) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        onSuccess?.(response?.invoice?.invoicePdfUrl);
    } catch (e) {
    } finally {
        yield put(spinner({ invoiceLoading: false }));
    }
}

function* getItems({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    yield put(spinner({ itemsLoading: true }));

    try {
        const options = {
            path: `items?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.items) {
            const { data } = response.items;
            yield put(setItems({ items: data, fresh }));
        }

        onSuccess?.(response?.items);
    } catch (e) {
    } finally {
        yield put(spinner({ itemsLoading: false }));
    }
}

function* removeItem({ payload: { onResult, id } }) {
    yield put(spinner({ removeItemLoading: true }));

    try {
        yield put(removeInvoiceItem({ id }));
        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ removeItemLoading: false }));
    }
}

function* removeInvoice({ payload: { onResult, id } }) {
    yield put(spinner({ removeInvoiceLoading: true }));

    try {
        const options = {
            path: `invoices/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(removeFromInvoices({ id }));
        }

        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(spinner({ removeInvoiceLoading: false }));
    }
}

function* changeInvoiceStatus({ payload }) {
    const { onResult = null, params = null, id, action, navigation } = payload;

    yield put(spinner({ changeStatusLoading: true }));

    const param = { id, ...params };

    try {
        const options = {
            path: `invoices/${action}`,
            body: { ...param }
        };

        const response = yield call([Request, 'post'], options);

        if (!response?.success) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation?.goBack?.(null)
            });
            return;
        }

        navigation.navigate(ROUTES.MAIN_INVOICES);
        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ changeStatusLoading: false }));
    }
}

export function* geInvoiceTemplates(payloadData) {
    try {
        const options = {
            path: `invoices/templates`
        };

        return yield call([Request, 'get'], options);
    } catch (e) {}
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
    yield takeEvery(GET_INVOICE_TEMPLATE, geInvoiceTemplates);
}
