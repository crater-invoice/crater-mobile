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
    removeFromInvoices,
    updateFromInvoices
} from '../actions';
import { ROUTES } from '@/navigation';
import { alertMe } from '@/constants';
import t from 'locales/use-translation';
import {
    getNextNumber,
    getSettingInfo
} from '@/features/settings/saga/general';
import { getCustomFields } from '@/features/settings/saga/custom-fields';
import { CUSTOM_FIELD_TYPES } from '@/features/settings/constants';
import InvoiceServices from '@/features/invoices/services';

function* getInvoices({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    yield put(spinner({ invoicesLoading: true }));

    try {
        const options = {
            path: `invoices?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.data) {
            const data = response.data;
            yield put(setInvoices({ invoices: data, fresh }));
        }
        onSuccess?.(response?.data);
    } catch (error) {
    } finally {
        yield put(spinner({ invoicesLoading: false }));
    }
}

function* getCreateInvoice({ payload: { onSuccess } }) {
    yield put(spinner({ initInvoiceLoading: true }));

    try {
        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.INVOICE, limit: 'all' }
            }
        });

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

        yield call(getCustomFields, {
            payload: {
                queryString: { type: CUSTOM_FIELD_TYPES.INVOICE, limit: 'all' }
            }
        });

        const response = yield call([Request, 'get'], options);

        if (!response?.data) {
            return;
        }

        const { invoicePrefix, nextInvoiceNumber } = response?.meta;
        const invoice = response?.data;
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

        yield put(
            setInvoiceItems({ invoiceItem: invoice?.invoiceItems ?? [] })
        );

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
                ...response.data,
                item_id: response.data.id,
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

        if (!response.data) {
            alertMe({
                desc: t('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        InvoiceServices.toggleIsFirstInvoiceCreated(true);

        yield put(removeInvoiceItems());

        yield put(setInvoices({ invoices: [response.data], prepend: true }));

        onSuccess?.(response?.data?.invoicePdfUrl);
    } catch (e) {
    } finally {
        yield put(spinner({ invoiceLoading: false }));
    }
}

function* editInvoice({ payload }) {
    const { invoice, onSuccess, submissionError, navigation, status } = payload;

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

        if (!response.data) {
            alertMe({
                desc: t('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        if (response.data) {
            yield put(updateFromInvoices({ invoice: response.data }));
            status !== 'download' && navigation.goBack(null);
        }

        onSuccess?.(response?.data?.invoicePdfUrl);
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

        if (response?.data) {
            const data = response.data;
            yield put(setItems({ items: data, fresh }));
        }

        onSuccess?.(response?.data);
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

        if (response?.data || response?.success) {
            onResult?.();
            navigation.navigate(ROUTES.MAIN_INVOICES);
        } else {
            alertMe({
                desc: t('validation.wrong'),
                okPress: () => navigation?.goBack?.(null)
            });
            return;
        }
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
