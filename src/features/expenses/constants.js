// Forms
// -----------------------------------------
export const EXPENSE_SEARCH = 'expenses/EXPENSE_SEARCH';
export const EXPENSE_FORM = 'expenses/EXPENSE_FORM';

// Form Type
// -----------------------------------------
export const EXPENSE_ADD = 'expense/EXPENSE_ADD';
export const EXPENSE_EDIT = 'expense/EXPENSE_EDIT';

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

export const ACTIONS_VALUE = {
    REMOVE: 'remove',
    DOWNLOAD: 'download'
};

export const EXPENSE_ACTIONS = (
    Lng,
    locale,
    imageUrl = '',
    isAllowToDelete
) => {
    const options = [];

    imageUrl &&
        options.push({
            label: Lng.t('expenses.viewReceipt', { locale }),
            value: ACTIONS_VALUE.DOWNLOAD
        });

    isAllowToDelete &&
        options.push({
            label: Lng.t('expenses.removeExpense', { locale }),
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
