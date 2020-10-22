import { call, put, takeEvery } from 'redux-saga/effects';
import Request from '@/api/request';
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
    // Endpoint Api URL
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    GET_ITEMS_URL,
    URL
} from '../constants';
import {
    estimateTriggerSpinner,
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
import { alertMe, hasValue } from '@/constants';
import { getTitleByLanguage } from '@/utils';

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
            path: URL.GET_ESTIMATES(queryString)
        };

        const response = yield call([Request, 'get'], options);

        if (response?.estimates) {
            const { data } = response.estimates;
            yield put(setEstimates({ estimates: data, fresh }));
        }

        onSuccess?.(response?.estimates);
    } catch (e) {
    } finally {
    }
}

function* getCreateEstimate({ payload: { onResult } }) {
    yield put(estimateTriggerSpinner({ initEstimateLoading: true }));

    try {
        const options = {
            path: URL.GET_CREATE_ESTIMATE
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate(response));

        onResult?.(response);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ initEstimateLoading: false }));
    }
}

function* getEditEstimate({ payload: { id, onResult } }) {
    yield put(estimateTriggerSpinner({ initEstimateLoading: true }));

    try {
        const options = {
            path: URL.GET_SELECTED_ESTIMATE(id)
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate(response));

        yield put(removeEstimateItems());

        yield put(setEstimateItems({ estimateItem: response.estimate.items }));

        onResult?.(response.estimate);
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ initEstimateLoading: false }));
    }
}

function* addItem({ payload: { item, onResult } }) {
    yield put(estimateTriggerSpinner({ createEstimateItemLoading: true }));

    try {
        const { price, name, description, taxes, unit_id } = item;

        const options = {
            path: CREATE_ITEM_URL(),
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
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ createEstimateItemLoading: false }));
    }
}

function* editItem({ payload: { item, onResult } }) {
    yield put(estimateTriggerSpinner({ estimateLoading: true }));

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

        const estimateItem = [
            {
                ...response.item,
                ...item
            }
        ];

        yield put(removeEstimateItem({ id: estimateItem.id }));

        yield put(setEstimateItems({ estimateItem }));

        onResult?.();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* createEstimate({ payload: { estimate, onResult } }) {
    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {
        const options = {
            path: URL.CREATE_ESTIMATE,
            body: estimate
        };

        const response = yield call([Request, 'post'], options);

        if (!response.error) {
            yield put(removeEstimateItems());

            yield put(
                setEstimates({ estimates: [response.estimate], prepend: true })
            );

            onResult?.(response.url);
        }
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* editEstimate({ payload: { estimate, onResult } }) {
    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {
        const options = {
            path: URL.EDIT_ESTIMATE(estimate),
            body: estimate
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimates({ id: estimate.id }));

        yield put(
            setEstimates({ estimates: [response.estimate], prepend: true })
        );

        onResult?.(response.url);
    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
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

    yield put(estimateTriggerSpinner({ itemsLoading: true }));

    try {
        const options = {
            path: GET_ITEMS_URL(q, search, page, limit)
        };

        const response = yield call([Request, 'get'], options);

        yield put(setItems({ items: response.items.data, fresh }));

        onMeta && onMeta(response.items);

        onResult && onResult(response.items);
    } catch (error) {
        // console.log(error);
        onResult && onResult(response.items);
    } finally {
        yield put(estimateTriggerSpinner({ itemsLoading: false }));
    }
}

function* removeItem({ payload: { onResult, id } }) {
    yield put(estimateTriggerSpinner({ removeItemLoading: true }));

    try {
        yield put(removeEstimateItem({ id }));

        onResult?.();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice({ payload: { onResult, id } }) {
    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {
        const options = {
            path: URL.CONVERT_TO_INVOICE(id)
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimateItems());

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult?.();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* removeEstimate({ payload: { onResult, id } }) {
    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {
        const options = {
            path: URL.REMOVE_ESTIMATE(id)
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimates({ id }));

        onResult?.();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* changeEstimateStatus({ payload }) {
    const { onResult, id, action, navigation } = payload;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {
        const options = {
            path: URL.CHANGE_ESTIMATE_STATUS(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_LIST);
        } else {
            response.error === 'user_email_does_not_exist' &&
                alertMe({
                    desc: getTitleByLanguage('alert.action.emailNotExist')
                });
        }

        onResult?.();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
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
}
