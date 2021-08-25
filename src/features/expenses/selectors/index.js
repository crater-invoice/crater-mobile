import { hasLength } from '@/constants';
import { formatCategories } from '@/utils';
import { createSelector } from 'reselect';

const formatExpenseItems = (expenses, currency) =>
    expenses.map(expense => {
        const {
            customer,
            formattedExpenseDate,
            amount,
            expense_category
        } = expense;

        return {
            title: expense_category.name
                ? expense_category.name[0].toUpperCase() +
                  expense_category.name.slice(1)
                : '',
            subtitle: { title: customer?.name },
            amount,
            currency,
            rightSubtitle: formattedExpenseDate,
            fullItem: expense
        };
    });

const getExpensesState = createSelector(
    state => state.expenses,
    state => state.currency,
    (expenses, currency) =>
        !hasLength(expenses) ? [] : formatExpenseItems(expenses, currency)
);

const getCategoriesState = createSelector(
    categories => categories,
    categories => formatCategories(categories)
);

export { getExpensesState, getCategoriesState };
