import {
    GET_ESTIMATES,
    SET_ESTIMATES,
    CLEAR_ESTIMATES,
    GET_CREATE_ESTIMATE,
    SET_CREATE_ESTIMATE,
    ESTIMATES_TRIGGER_SPINNER,
    ADD_ITEM,
    GET_ITEMS,
    SET_ITEMS,
    SET_ESTIMATE_ITEMS,
    CREATE_ESTIMATE,
    EDIT_ITEM,
    SET_EDIT_ESTIMATE_ITEMS,
    REMOVE_ITEM,
    REMOVE_ESTIMATE_ITEM,
    GET_EDIT_ESTIMATE,
    SET_EDIT_ESTIMATE,
    EDIT_ESTIMATE,
    REMOVE_ESTIMATE_ITEMS,
    CLEAR_ESTIMATE,
    SET_ESTIMATE,
    CONVERT_TO_INVOICE,
    REMOVE_ESTIMATE,
    REMOVE_FROM_ESTIMATES,
    CHANGE_ESTIMATE_STATUS,
} from "../constants";

export const getEstimates = (payload = {}) => ({
    type: GET_ESTIMATES,
    payload,
});

export const setEstimates = (payload = {}) => ({
    type: SET_ESTIMATES,
    payload,
});

export const clearEstimates = (payload = {}) => ({
    type: CLEAR_ESTIMATES,
    payload,
});

export const clearEstimate = (payload = {}) => ({
    type: CLEAR_ESTIMATE,
    payload,
});

export const getCreateEstimate = (payload = {}) => ({
    type: GET_CREATE_ESTIMATE,
    payload,
});

export const getEditEstimate = (payload = {}) => ({
    type: GET_EDIT_ESTIMATE,
    payload,
});

export const createEstimate = (payload = {}) => ({
    type: CREATE_ESTIMATE,
    payload,
});

export const editEstimate = (payload = {}) => ({
    type: EDIT_ESTIMATE,
    payload,
});

export const setEstimate = (payload = {}) => ({
    type: SET_ESTIMATE,
    payload,
});

export const setEditEstimate = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE,
    payload,
});

export const estimateTriggerSpinner = (payload) => ({
    type: ESTIMATES_TRIGGER_SPINNER,
    payload,
});

export const addItem = (payload = {}) => ({
    type: ADD_ITEM,
    payload,
});

export const getItems = (payload = {}) => ({
    type: GET_ITEMS,
    payload,
});

export const setItems = (payload = {}) => ({
    type: SET_ITEMS,
    payload,
});

export const setEstimateItems = (payload = {}) => ({
    type: SET_ESTIMATE_ITEMS,
    payload,
});

export const editItem = (payload = {}) => ({
    type: EDIT_ITEM,
    payload,
});

export const setEditEstimateItem = (payload = {}) => ({
    type: SET_EDIT_ESTIMATE_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const removeEstimateItem = (payload = {}) => ({
    type: REMOVE_ESTIMATE_ITEM,
    payload,
});

export const removeEstimateItems = () => ({
    type: REMOVE_ESTIMATE_ITEMS
});


export const convertToInvoice = (payload = {}) => ({
    type: CONVERT_TO_INVOICE,
    payload,
});

export const removeEstimate = (payload = {}) => ({
    type: REMOVE_ESTIMATE,
    payload,
});

export const removeFromEstimates = (payload = {}) => ({
    type: REMOVE_FROM_ESTIMATES,
    payload,
});

export const changeEstimateStatus = (payload = {}) => ({
    type: CHANGE_ESTIMATE_STATUS,
    payload,
});

