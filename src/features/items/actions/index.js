import {
    GET_ITEMS,
    SET_ITEMS,
    ITEM_ADD,
    CLEAR_ITEM,
    GET_EDIT_ITEM,
    REMOVE_ITEM,
    ITEM_EDIT,
    SET_ITEM,
    DELETE_ITEM,
    SET_FILTER_ITEMS
} from "../constants";

export const addItem = (payload = {}) => ({
    type: ITEM_ADD,
    payload,
});

export const editItem = (payload = {}) => ({
    type: ITEM_EDIT,
    payload,
});

export const getItems = (payload = {}) => ({
    type: GET_ITEMS,
    payload,
});

export const removeItem = (payload = {}) => ({
    type: REMOVE_ITEM,
    payload,
});

export const setItems = (payload = {}) => ({
    type: SET_ITEMS,
    payload,
});

export const setFilterItems = (payload = {}) => ({
    type: SET_FILTER_ITEMS,
    payload,
});

export const setItem = (payload = {}) => ({
    type: SET_ITEM,
    payload,
});

export const clearItem = (payload = {}) => ({
    type: CLEAR_ITEM,
    payload,
});

export const deleteItem = (payload = {}) => ({
    type: DELETE_ITEM,
    payload,
});

export const getEditItem = (payload = {}) => ({
    type: GET_EDIT_ITEM,
    payload,
});
