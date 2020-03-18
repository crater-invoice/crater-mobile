import { createSelector } from 'reselect'
import { hasLength } from '../../../api/global';

const formatExpenseItems = (expenses, currency) => expenses.map((expense) => {
    const {
        notes,
        formattedExpenseDate,
        amount,
        category
    } = expense;

    return {
        title: category.name ? category.name[0].toUpperCase() +
            category.name.slice(1) : '',
        subtitle: { title: notes },
        amount,
        ...currency,
        rightSubtitle: formattedExpenseDate,
        fullItem: expense,
    };
});

const getExpensesState = createSelector(
    expenses => expenses,
    currency => currency,
    (expenses, currency) => !hasLength(expenses) ? [] : formatExpenseItems(expenses, currency)
);

const getFilterExpensesState = createSelector(
    expenses => expenses,
    currency => currency,
    (expenses, currency) => !hasLength(expenses) ? [] : formatExpenseItems(expenses, currency)
);

const getCategoriesState = createSelector(
    categories => categories,
    categories => !hasLength(categories) ? [] : categories.map((category) => ({
        label: category.name,
        value: category.id
    }))
);

export {
    getExpensesState,
    getFilterExpensesState,
    getCategoriesState
}
