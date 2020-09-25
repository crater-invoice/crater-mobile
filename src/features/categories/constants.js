import queryString from 'query-string';
import { ROUTES } from "../../navigation/routes";

// Forms
// -----------------------------------------

export const CATEGORY_SEARCH = 'categories/CATEGORY_SEARCH';
export const CATEGORY_FORM = 'categories/CATEGORY_FORM';

// Type
// -----------------------------------------
export const CATEGORY_ADD = 'category/CATEGORY_ADD';
export const CATEGORY_EDIT = 'category/CATEGORY_EDIT';

// Actions
// -----------------------------------------

// Categories
export const GET_EXPENSE_CATEGORIES = 'categories/GET_EXPENSE_CATEGORIES';
export const GET_CREATE_EXPENSE_CATEGORY = 'categories/GET_CREATE_EXPENSE_CATEGORY';

export const CREATE_EXPENSE_CATEGORY = 'categories/CREATE_EXPENSE_CATEGORY';
export const EDIT_EXPENSE_CATEGORY = 'categories/EDIT_EXPENSE_CATEGORY';
export const REMOVE_EXPENSE_CATEGORY = 'categories/REMOVE_EXPENSE_CATEGORY';

export const SET_EXPENSE_CATEGORIES = 'categories/SET_EXPENSE_CATEGORIES';
export const SET_CREATE_EXPENSE_CATEGORIES = 'categories/SET_CREATE_EXPENSE_CATEGORIES';
export const SET_EDI_EXPENSE_CATEGORIES = 'categories/SET_EDI_EXPENSE_CATEGORIES';
export const SET_REMOVE_EXPENSE_CATEGORIES = 'categories/SET_REMOVE_EXPENSE_CATEGORIES';

// Endpoint Api URL
// -----------------------------------------

// Expense Categories
export const GET_EXPENSE_CATEGORIES_URL = () => `categories`
export const GET_EDIT_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}/edit`

export const CREATE_EXPENSE_CATEGORIES_URL = () => `categories`
export const EDIT_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}`
export const REMOVE_EXPENSE_CATEGORIES_URL = (id) => `categories/${id}`
