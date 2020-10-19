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
    GET_ESTIMATES_URL,
    GET_CREATE_ESTIMATE_URL,
    GET_EDIT_ESTIMATE_URL,
    CREATE_ITEM_URL,
    EDIT_ITEM_URL,
    CREATE_ESTIMATE_URL,
    EDIT_ESTIMATE_URL,
    GET_ITEMS_URL,
    CONVERT_TO_INVOICE_URL,
    REMOVE_ESTIMATE_URL,
    CHANGE_ESTIMATE_STATUS_URL,
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


const alreadyInUse = (error) => {

    if (error.includes("errors") && error.includes("estimate_number")) {
        alertMe({
            title: getTitleByLanguage("estimates.alert.alreadyInUseNumber")
        })
        return true;
    }
}

function* getEstimates(payloadData) {

    const {
        payload: {
            onResult = null,
            fresh = true,
            type = '',
            onMeta = null,
            params = null,
            pagination: { page = 1, limit = 10 } = {},
        } = {},
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimatesLoading: true }));

    try {

        let param = {
            ...params,
            status: type,
            page,
            limit
        }
        const options = {
            path: GET_ESTIMATES_URL(param),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimates({ estimates: response.estimates.data, fresh }));

        onMeta && onMeta(response.estimates);

        onResult && onResult(true);

    } catch (error) {
        onResult && onResult(false);
    } finally {
        yield put(estimateTriggerSpinner({ estimatesLoading: false }));
    }
}

function* getCreateEstimate(payloadData) {
    const {
        payload: { onResult },
    } = payloadData;

    yield put(estimateTriggerSpinner({ initEstimateLoading: true }));

    try {


        const options = {
            path: GET_CREATE_ESTIMATE_URL(),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate(response));

        onResult && onResult(response);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ initEstimateLoading: false }));
    }
}

function* getEditEstimate(payloadData) {
    const {
        payload: { id, onResult },
    } = payloadData;

    yield put(estimateTriggerSpinner({ initEstimateLoading: true }));

    try {

        const options = {
            path: GET_EDIT_ESTIMATE_URL(id),
        };

        const response = yield call([Request, 'get'], options);

        yield put(setEstimate(response));

        yield put(removeEstimateItems());

        yield put(setEstimateItems({ estimateItem: response.estimate.items }));

        onResult && onResult(response.estimate);

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ initEstimateLoading: false }));
    }
}

function* addItem(payloadData) {
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ createEstimateItemLoading: true }));

    try {

        const { price, name, description, taxes, unit_id } = item

        const options = {
            path: CREATE_ITEM_URL(),
            body: {
                name,
                description,
                price,
                taxes,
                unit_id,
            }
        };

        const response = yield call([Request, 'post'], options);

        const estimateItem = [{
            ...response.item,
            item_id: response.item.id,
            ...item
        }]

        yield put(setEstimateItems({ estimateItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ createEstimateItemLoading: false }));
    }
}

function* editItem(payloadData) {
    const {
        payload: {
            item,
            onResult,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const { price, name, description, item_id } = item

        const options = {
            path: EDIT_ITEM_URL(item_id),
            body: {
                name,
                description,
                price,
            }
        };

        const response = yield call([Request, 'put'], options);

        const estimateItem = [{
            ...response.item,
            ...item,
        }]

        yield put(removeEstimateItem({ id: estimateItem.id }));

        yield put(setEstimateItems({ estimateItem }));

        onResult && onResult()

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* createEstimate(payloadData) {
    const {
        payload: {
            estimate,
            onResult,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const options = {
            path: CREATE_ESTIMATE_URL(),
            body: estimate,
        };

        const response = yield call([Request, 'post'], options);

        if (!(response.error)) {
            yield put(removeEstimateItems())

            yield put(setEstimates({ estimates: [response.estimate], prepend: true }));

            onResult && onResult(response.url)
        }

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* editEstimate(payloadData) {
    const {
        payload: {
            estimate,
            onResult,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const options = {
            path: EDIT_ESTIMATE_URL(estimate),
            body: estimate
        };

        const response = yield call([Request, 'put'], options);

        yield put(removeFromEstimates({ id: estimate.id }))

        yield put(setEstimates({ estimates: [response.estimate], prepend: true }));

        onResult && onResult(response.url)

    } catch ({ _bodyText }) {
        hasValue(_bodyText) && alreadyInUse(_bodyText)
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
            pagination: { page, limit },
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ itemsLoading: true }));

    try {

        const options = {
            path: GET_ITEMS_URL(q, search, page, limit),
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

function* removeItem(payloadData) {
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ removeItemLoading: true }));

    try {


        yield put(removeEstimateItem({ id }));

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ removeItemLoading: false }));
    }
}

function* convertToInvoice(payloadData) {
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const options = {
            path: CONVERT_TO_INVOICE_URL(id),
        };

        const response = yield call([Request, 'post'], options);

        yield put(removeEstimateItems())

        yield put(setInvoices({ invoices: [response.invoice], prepend: true }));

        onResult && onResult();

    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* removeEstimate(payloadData) {
    const {
        payload: {
            onResult,
            id,
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const options = {
            path: REMOVE_ESTIMATE_URL(id),
        };

        yield call([Request, 'delete'], options);

        yield put(removeFromEstimates({ id }))

        onResult && onResult();
    } catch (error) {
        // console.log(error);
    } finally {
        yield put(estimateTriggerSpinner({ estimateLoading: false }));
    }
}

function* changeEstimateStatus(payloadData) {
    const {
        payload: {
            onResult,
            id,
            action,
            navigation
        },
    } = payloadData;

    yield put(estimateTriggerSpinner({ estimateLoading: true }));

    try {

        const options = {
            path: CHANGE_ESTIMATE_STATUS_URL(action),
            body: { id }
        };

        const response = yield call([Request, 'post'], options);

        if (response.success) {
            navigation.navigate(ROUTES.ESTIMATE_LIST)
            yield call(getEstimates, payload = {});
        }
        else {
            response.error === 'user_email_does_not_exist' && alertMe({ desc: getTitleByLanguage('alert.action.emailNotExist') })
        }


        onResult && onResult();
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
