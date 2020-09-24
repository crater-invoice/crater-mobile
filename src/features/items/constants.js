import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const ITEM_FORM = 'moreForm/ITEM_FORM';
export const ITEM_SEARCH = 'moreForm/ITEM_SEARCH';

// Actions
// -----------------------------------------
export const ITEM_EDIT = 'more/ITEM_EDIT';
export const ITEM_ADD = 'more/ITEM_ADD';
export const CLEAR_ITEM = 'more/CLEAR_ITEM';
export const DELETE_ITEM = 'more/DELETE_ITEM';
export const REMOVE_ITEM = 'more/REMOVE_ITEM';
export const GET_ITEMS = 'more/GET_ITEMS';
export const GET_EDIT_ITEM = 'more/GET_EDIT_ITEM';
export const SET_ITEMS = 'more/SET_ITEMS';
export const SET_FILTER_ITEMS = 'more/SET_FILTER_ITEMS';
export const SET_ITEM = 'more/SET_ITEM';

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
