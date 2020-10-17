import queryString from 'query-string';

// Forms
// -----------------------------------------
export const EXPENSE_SEARCH = 'expenses/EXPENSE_SEARCH';
export const EXPENSE_FORM = 'expenses/EXPENSE_FORM';


// Type
// -----------------------------------------
export const EXPENSE_ADD = 'expense/EXPENSE_ADD';
export const EXPENSE_EDIT = 'expense/EXPENSE_EDIT';

// Actions
// -----------------------------------------
export const GET_CATEGORIES = 'category/GET_CATEGORIES';
export const SET_CATEGORIES = 'category/SET_CATEGORIES';

export const GET_EXPENSES = 'expenses/GET_EXPENSES';
export const SET_FILTER_EXPENSES = 'expenses/SET_FILTER_EXPENSES';
export const GET_CREATE_EXPENSE = 'expenses/GET_CREATE_EXPENSE';
export const GET_EDIT_EXPENSE = 'expenses/GET_EDIT_EXPENSE';
export const EDIT_EXPENSE = 'expenses/EDIT_EXPENSE';
export const SET_EXPENSES = 'expenses/SET_EXPENSES';
export const SET_EXPENSE = 'expenses/SET_EXPENSE';
export const CLEAR_EXPENSE = 'expenses/CLEAR_EXPENSE';
export const REMOVE_EXPENSE = 'expenses/REMOVE_EXPENSE';
export const CREATE_EXPENSE = 'expenses/CREATE_EXPENSE';
export const GET_RECEIPT = 'expenses/GET_RECEIPT';
export const DOWNLOAD_RECEIPT = 'expenses/DOWNLOAD_RECEIPT';

export const EXPENSES_TRIGGER_SPINNER = 'expenses/EXPENSES_TRIGGER_SPINNER';


export const ACTIONS_VALUE = {
    REMOVE: 'remove',
    DOWNLOAD: 'download',
}

export const EXPENSE_ACTIONS = (Lng, locale, imageUrl = '') => {


    let viewReceipt = {
        label: Lng.t("expenses.viewReceipt", { locale }),
        value: ACTIONS_VALUE.DOWNLOAD
    }

    let actions = {
        label: Lng.t("expenses.removeExpense", { locale }),
        value: ACTIONS_VALUE.REMOVE
    }


    return imageUrl ? [
        viewReceipt,
        actions,
    ] :
        [actions]
}


// Endpoint Api URL
// -----------------------------------------

export const GET_EXPENSES_URL = (param) => `expenses?${queryString.stringify({
    ...param,
    orderByField: 'created_at',
    orderBy: 'desc'
})}`

export const CREATE_EXPENSE_URL = () => `expenses`
export const EDIT_EXPENSE_URL = (id) => `expenses/${id}`
export const REMOVE_EXPENSE_URL = (id) => `expenses/${id}`

export const GET_EDIT_EXPENSE_URL = (id) => `expenses/${id}/edit`
export const GET_CREATE_EXPENSE_URL = () => `expenses/create`

export const UPLOAD_RECEIPT_URL = (id) => `expenses/${id}/upload/receipts`
export const SHOW_RECEIPT_URL = (id) => `expenses/${id}/show/receipt`
