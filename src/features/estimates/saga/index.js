import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
import * as queryStrings from 'query-string';
import {
    GET_ESTIMATES,
    GET_CREATE_ESTIMATE,
    GET_ITEMS,
    ADD_ITEM,
    CREATE_ESTIMATE,
    EDIT_ITEM,
    REMOVE_ITEM,
    GET_EDIT_ESTIMATE,
    EDIT_ESTIMATE,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE,
    CHANGE_ESTIMATE_STATUS,
    GET_ESTIMATE_TEMPLATE
} from '../constants';
import {
    estimateTriggerSpinner as spinner,
    setEstimates,
    setItems,
    setEstimateItems,
    removeEstimateItem,
    removeEstimateItems,
    setEstimate,
    removeFromEstimates
} from '../actions';
import { setInvoices } from '../../invoices/actions';
import { ROUTES } from '@/navigation';
import { alertMe } from '@/constants';
import { getTitleByLanguage } from '@/utils';
import {
    getNextNumber,
    getSettingInfo
} from '@/features/settings/saga/general';

const alreadyInUse = error => {
    if (error.includes('errors') && error.includes('estimate_number')) {
        alertMe({
            title: getTitleByLanguage('estimates.alert.alreadyInUseNumber')
        });
        return true;
    }
};

function* getEstimates({ payload }) {
    const { fresh = true, onSuccess, queryString } = payload;

    try {
        const options = {
            path: `estimates?${queryStrings.stringify(queryString)}`
        };

        const response = yield call([Request, 'get'], options);

        if (response?.estimates) {
            const { data } = response.estimates;
            yield put(setEstimates({ estimates: data, fresh }));
        }

        onSuccess?.(response?.estimates);
    } catch (e) {}
}

function* getCreateEstimate({ payload: { onSuccess } }) {
    yield put(spinner({ initEstimateLoading: true }));

    try {
        const response = yield call(getSettingInfo, {
            payload: {
                keys: [
                    'estimate_auto_generate',
                    'tax_per_item',
                    'discount_per_item'
                ]
            }
        });

        const { estimate_auto_generate } = response;

        const isAuto =
            estimate_auto_generate === 'YES' || estimate_auto_generate === 1;

        const nextEstimateNumber = yield call(getNextNumber, {
            payload: { key: 'estimate' }
        });

        const values = {
            ...nextEstimateNumber,
            ...(!isAuto && { nextNumber: null })
        };

        const { templates } = yield call(geEstimateTemplates, {});

        yield put(
            setEstimate({
                ...response,
                ...values,
                estimateTemplates: templates
            })
        );

        onSuccess?.(values);
    } catch (e) {
    } finally {
        yield put(spinner({ initEstimateLoading: false }));
    }
}

function* getEditEstimate({ payload: { id, onSuccess } }) {
    yield put(spinner({ initEstimateLoading: true }));

    try {
        const options = {
            path: `estimates/${id}`
        };

        const response = yield call([Request, 'get'], options);

        if (!response?.estimate) {
            return;
        }

        const { estimate, estimatePrefix, nextEstimateNumber } = response;

        const { templates } = yield call(geEstimateTemplates, {});

        const values = {
            estimate,
            estimatePrefix,
            nextEstimateNumber,
            estimateTemplates: templates,
            discount_per_item: estimate?.discount_per_item,
            tax_per_item: estimate?.tax_per_item
        };

        yield put(setEstimate(values));

        yield put(removeEstimateItems());

        yield put(setEstimateItems({ estimateItem: estimate.items }));

        onSuccess?.(estimate);
    } catch (e) {
    } finally {
        yield put(spinner({ initEstimateLoading: false }));
    }
}

function* addItem({ payload: { item, onResult } }) {
    yield put(spinner({ createEstimateItemLoading: true }));

    try {
        const { price, name, description, taxes, unit_id } = item;

        const options = {
            path: `items`,
            body: {
                name,
                description,
                price,
                taxes,
                unit_id
            }
        };

        const response = yield call([Request, 'post'], options);

        const estimateItem = [
            {
                ...response.item,
                item_id: response.item.id,
                ...item
            }
        ];

        yield put(setEstimateItems({ estimateItem }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ createEstimateItemLoading: false }));
    }
}

function* editItem({ payload: { item, onResult } }) {
    yield put(spinner({ estimateLoading: true }));

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

        const estimateItem = [
            {
                ...response.item,
                ...item
            }
        ];

        yield put(removeEstimateItem({ id: estimateItem.id }));

        yield put(setEstimateItems({ estimateItem }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ estimateLoading: false }));
    }
}

function* createEstimate({ payload }) {
    const { estimate, onSuccess, submissionError, navigation } = payload;

    yield put(spinner({ estimateLoading: true }));

    try {
        const options = {
            path: `estimates`,
            body: estimate
        };

        const response = yield call([Request, 'post'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.estimate) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        yield put(removeEstimateItems());

        onSuccess?.(response?.estimate?.estimatePdfUrl);
    } catch (e) {
    } finally {
        yield put(spinner({ estimateLoading: false }));
    }
}

function* editEstimate({ payload }) {
    const { estimate, onSuccess, submissionError, navigation } = payload;

    yield put(spinner({ estimateLoading: true }));

    try {
        const options = {
            path: `estimates/${estimate.id}`,
            body: estimate
        };

        const response = yield call([Request, 'put'], options);

        if (response?.data?.errors) {
            submissionError?.(response?.data?.errors);
            return;
        }

        if (!response.estimate) {
            alertMe({
                desc: getTitleByLanguage('validation.wrong'),
                okPress: () => navigation.goBack(null)
            });
            return;
        }

        onSuccess?.(response?.estimate?.estimatePdfUrl);
    } catch (e) {
    } finally {
        yield put(spinner({ estimateLoading: false }));
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
        yield put(removeEstimateItem({ id }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice({ payload: { onResult, id } }) {
    yield put(spinner({ estimateLoading: true }));

    try {
        const options = {
            path: `estimates/${id}/convert-to-invoice`
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimateItems());

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ estimateLoading: false }));
    }
}

function* removeEstimate({ payload: { onResult, id } }) {
    yield put(spinner({ removeEstimateLoading: true }));

    try {
        const options = {
            path: `estimates/delete`,
            body: { ids: [id] }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            yield put(removeFromEstimates({ id }));
        }

        onResult?.(response);
    } catch (e) {
    } finally {
        yield put(spinner({ removeEstimateLoading: false }));
    }
}

function* changeEstimateStatus({ payload }) {
    const { onResult = null, params = null, id, action, navigation } = payload;

    yield put(spinner({ changeStatusLoading: true }));

    const param = { id, ...params };

    try {
        const options = {
            path: `estimates/${action}`,
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

        navigation.navigate(ROUTES.ESTIMATE_LIST);
        onResult?.();
    } catch (e) {
    } finally {
        yield put(spinner({ changeStatusLoading: false }));
    }
}

export function* geEstimateTemplates(payloadData) {
    try {
        const options = {
            path: `estimates/templates`
        };

        return yield call([Request, 'get'], options);
    } catch (e) {}
}

export default function* estimatesSaga() {
    yield takeEvery(GET_ESTIMATES, getEstimates);
    yield takeEvery(GET_CREATE_ESTIMATE, getCreateEstimate);
    yield takeEvery(GET_EDIT_ESTIMATE, getEditEstimate);
    yield takeEvery(ADD_ITEM, addItem);
    yield takeEvery(GET_ITEMS, getItems);
    yield takeEvery(CREATE_ESTIMATE, createEstimate);
    yield takeEvery(EDIT_ESTIMATE, editEstimate);
    yield takeEvery(EDIT_ITEM, editItem);
    yield takeEvery(REMOVE_ITEM, removeItem);
    yield takeEvery(CONVERT_TO_INVOICE, convertToInvoice);
    yield takeEvery(CHANGE_ESTIMATE_STATUS, changeEstimateStatus);
    yield takeEvery(REMOVE_ESTIMATE, removeEstimate);
    yield takeEvery(GET_ESTIMATE_TEMPLATE, geEstimateTemplates);
}
