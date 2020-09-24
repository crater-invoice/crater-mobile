import {
    GET_TAXES,
    SET_TAXES,
    REMOVE_TAX,
    SET_TAX,
    TAX_ADD,
    TAX_EDIT,
    SET_EDIT_TAX,
    SET_REMOVE_TAX,
} from "../constants";

//  Taxes
// -------------------------------------------------
export const getTaxes = (payload) => ({
    type: GET_TAXES,
    payload,
});

export const setTaxes = (payload) => ({
    type: SET_TAXES,
    payload,
});

export const addTax = (payload) => ({
    type: TAX_ADD,
    payload,
});

export const editTax = (payload) => ({
    type: TAX_EDIT,
    payload,
});

export const removeTax = (payload) => ({
    type: REMOVE_TAX,
    payload,
});

export const setTax = (payload) => ({
    type: SET_TAX,
    payload,
});

export const setEditTax = (payload) => ({
    type: SET_EDIT_TAX,
    payload,
});

export const setRemoveTax = (payload) => ({
    type: SET_REMOVE_TAX,
    payload,
});
