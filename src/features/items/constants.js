import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const ITEM_FORM = 'itemForm/ITEM_FORM';
export const ITEM_SEARCH = 'itemForm/ITEM_SEARCH';

// Actions
// -----------------------------------------
export const ADD_ITEM = 'itemType/ADD_ITEM';
export const EDIT_ITEM = 'itemType/EDIT_ITEM';
export const ITEM_EDIT = 'item/ITEM_EDIT';
export const ITEM_ADD = 'item/ITEM_ADD';
export const CLEAR_ITEM = 'item/CLEAR_ITEM';
export const DELETE_ITEM = 'item/DELETE_ITEM';
export const REMOVE_ITEM = 'item/REMOVE_ITEM';
export const GET_ITEMS = 'item/GET_ITEMS';
export const GET_EDIT_ITEM = 'item/GET_EDIT_ITEM';
export const SET_ITEMS = 'item/SET_ITEMS';
export const SET_FILTER_ITEMS = 'item/SET_FILTER_ITEMS';
export const SET_ITEM = 'item/SET_ITEM';

// Item Unit
// -----------------------------------------
export const ITEM_UNITS = [
    { label: 'pc', value: 'pc' },
    { label: 'box', value: 'box' },
    { label: 'cm', value: 'cm' },
    { label: 'dz', value: 'dz' },
    { label: 'ft', value: 'ft' },
    { label: 'g', value: 'g' },
    { label: 'in', value: 'in' },
    { label: 'kg', value: 'kg' },
    { label: 'km', value: 'km' },
    { label: 'lb', value: 'lb' },
    { label: 'mg', value: 'mg' }
]

export const ITEM_DEFAULT_OPTION = {
    label: 'box', value: 'box'
}

// Endpoint Api URL
// -----------------------------------------

export const GET_ITEMS_URL = (param) => `items?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`
export const GET_EDIT_ITEMS_URL = (id) => `items/${id}/edit`

export const CREATE_ITEM_URL = () => `items`
export const EDIT_ITEM_URL = (id) => `items/${id}`
export const REMOVE_ITEM_URL = (id) => `items/${id}`
