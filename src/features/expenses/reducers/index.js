import { EXPENSES_TRIGGER_SPINNER, SET_EXPENSES } from '../constants';

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

        default:
            return state;
    }
}
