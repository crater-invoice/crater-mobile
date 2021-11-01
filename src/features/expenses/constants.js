import t from 'locales/use-translation';

// Forms
// -----------------------------------------
export const EXPENSE_SEARCH = 'expenses/EXPENSE_SEARCH';
export const EXPENSE_FORM = 'expenses/EXPENSE_FORM';

// Types
// -----------------------------------------
export const GET_CREATE_EXPENSE = 'expenses/GET_CREATE_EXPENSE';
export const GET_EXPENSES = 'expenses/GET_EXPENSES';
export const SET_EXPENSES = 'expenses/SET_EXPENSES';
export const GET_EXPENSE_DETAIL = 'expenses/GET_EXPENSE_DETAIL';
export const CREATE_EXPENSE = 'expenses/CREATE_EXPENSE';
export const UPDATE_EXPENSE = 'expenses/UPDATE_EXPENSE';
export const REMOVE_EXPENSE = 'expenses/REMOVE_EXPENSE';
export const EXPENSES_TRIGGER_SPINNER = 'expenses/EXPENSES_TRIGGER_SPINNER';
export const SHOW_IMAGE_ON_EDIT = 'expenses/SHOW_IMAGE_ON_EDIT';

export const CREATE_FROM_EXPENSE = 'expenses/CREATE_FROM_EXPENSE';
export const REMOVE_FROM_EXPENSE = 'expenses/REMOVE_FROM_EXPENSE';
export const UPDATE_FROM_EXPENSE = 'expenses/UPDATE_FROM_EXPENSE';

export const ACTIONS_VALUE = {
    REMOVE: 'remove',
    DOWNLOAD: 'download'
};

export const EXPENSE_ACTIONS = (imageUrl = '', isAllowToDelete) => {
    const options = [];

    imageUrl &&
        options.push({
            label: t('expenses.view_receipt'),
            value: ACTIONS_VALUE.DOWNLOAD
        });

    isAllowToDelete &&
        options.push({
            label: t('expenses.remove_expense'),
            value: ACTIONS_VALUE.REMOVE
        });

    return options;
};

// Expense Fields
// -----------------------------------------
export const EXPENSE_FIELDS = {
    RECEIPT: 'attachment_receipt',
    DATE: 'expense_date',
    AMOUNT: 'amount',
    CATEGORY: 'expense_category_id',
    NOTES: 'notes',
    CUSTOMER: 'customer_id',
    CUSTOM_FIELDS: 'customFields'
};
