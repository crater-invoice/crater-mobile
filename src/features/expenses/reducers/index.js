import {
    SET_CATEGORIES,
    EXPENSES_TRIGGER_SPINNER,
    SET_EXPENSES,
    CREATE_EXPENSE,
    SET_EXPENSE,
    CLEAR_EXPENSE,
    SET_FILTER_EXPENSES
} from "../constants";

const initialState = {
    expenses: [],
    filterExpenses: [],
    categories: [],
    errors: null,
    expense: null,
    customers: null,
    loading: {
        expensesLoading: false,
        expenseLoading: false,
        initExpenseLoading: false,
        categoriesLoading: false,
    },
};

export default function expensesReducer(state = initialState, action) {
    const { payload, type } = action;

    switch (type) {

        case SET_EXPENSES:

            let { expenses, fresh } = payload;

            if (!fresh) {
                return { ...state, expenses: [...state.expenses, ...expenses] };
            }

            return { ...state, expenses };

        case SET_FILTER_EXPENSES:

            if (!payload.fresh) {
                return {
                    ...state,
                    filterExpenses: [...state.filterExpenses, ...payload.expenses]
                };
            }

            return { ...state, filterExpenses: payload.expenses };

        case SET_CATEGORIES:
            return { ...state, categories: payload.categories };

        case EXPENSES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case CREATE_EXPENSE:
            return { ...state, ...payload };

        case CLEAR_EXPENSE:
            return { ...state, expense: null };

        case SET_EXPENSE:
            const { expense, customers, categories } = payload
            return { ...state, expense, customers, categories };

        default:
            return state;
    }
}
