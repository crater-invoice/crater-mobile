import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------
export const SEARCH_TAX = 'taxForm/SEARCH_TAX';
export const TAX_FORM = 'taxForm/TAX_FORM';

// Type
// -----------------------------------------
export const EDIT_TAX = 'taxType/EDIT_TAX';
export const ADD_TAX = 'taxType/ADD_TAX';

// Actions
// -----------------------------------------
// Taxes
export const GET_TAXES = 'taxes/GET_TAXES';
export const SET_TAXES = 'taxes/SET_TAXES';
export const SET_TAX = 'taxes/SET_TAX';
export const SET_EDIT_TAX = 'taxes/SET_EDIT_TAX';
export const SET_REMOVE_TAX = 'taxes/SET_REMOVE_TAX';
export const TAX_EDIT = 'taxes/TAX_EDIT';
export const TAX_ADD = 'taxes/TAX_ADD';
export const REMOVE_TAX = 'taxes/REMOVE_TAX';

// Endpoint Api URL
// -----------------------------------------
// Tax Types
export const GET_SALES_TAXES_URL = () => `tax-types`

export const CREATE_SALES_TAX_URL = () => `tax-types`
export const EDIT_SALES_TAX_URL = (tax) => `tax-types/${tax.id}`
export const REMOVE_SALES_TAX_URL = (id) => `tax-types/${id}`
