import {
    CREATE_FROM_EXPENSE,
    EXPENSES_TRIGGER_SPINNER,
    REMOVE_FROM_EXPENSE,
    SET_EXPENSES,
    UPDATE_FROM_EXPENSE
} from '../constants';

const initialState = {
    expenses: [],
    loading: {
        expenseLoading: false
    }
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

        case EXPENSES_TRIGGER_SPINNER:
            return { ...state, loading: { ...state.loading, ...payload } };

        case CREATE_FROM_EXPENSE:
            return {
                ...state,
                expenses: [...[payload.expense], ...state.expenses]
            };

        case UPDATE_FROM_EXPENSE:
            const expenseData = payload.expense;
            const expensesList = [];

            if (state.expenses) {
                state.expenses.map(expense => {
                    const { id } = expense;
                    let value = expense;

                    if (id === expenseData.id) {
                        value = {
                            ...expenseData
                        };
                    }
                    expensesList.push(value);
                });
            }

            return {
                ...state,
                expenses: expensesList
            };

        case REMOVE_FROM_EXPENSE: {
            const expenseID = payload.id;

            const filterExpense = state.expenses.filter(
                expense => expense.id !== expenseID
            );

            return {
                ...state,
                expenses: filterExpense
            };
        }

        default:
            return state;
    }
}
