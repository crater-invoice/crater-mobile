import { hasLength } from '@/constants';
import { formatCategories } from '@/utils';
import { createSelector } from 'reselect';

const formatExpenseItems = (expenses, currency) =>
    expenses.map(expense => {
        const { user_name, formattedExpenseDate, amount, category } = expense;

        return {
            title: category.name
                ? category.name[0].toUpperCase() + category.name.slice(1)
                : '',
            subtitle: { title: user_name },
            amount,
            ...currency,
            rightSubtitle: formattedExpenseDate,
            fullItem: expense
        };
    });

const getExpensesState = createSelector(
    expenses => expenses,
    currency => currency,
    (expenses, currency) =>
        !hasLength(expenses) ? [] : formatExpenseItems(expenses, currency)
);

const getCategoriesState = createSelector(
    categories => categories,
    categories => formatCategories(categories)
);

export { getExpensesState, getCategoriesState };
