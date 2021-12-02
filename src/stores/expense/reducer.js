import * as types from './types';

const initialState = {
  expenses: [],
  isDeleting: false,
  isSaving: false
};

export default function expenseReducer(state = initialState, action) {
  const {payload, type} = action;

  switch (type) {
    case types.SPINNER:
      return {...state, [payload.name]: payload.value};

    case types.FETCH_EXPENSES_SUCCESS:
      if (payload.fresh) {
        return {
          ...state,
          expenses: payload.expenses,
          isSaving: false,
          isDeleting: false
        };
      }

      return {...state, expenses: [...state.expenses, ...payload.expenses]};

    case types.ADD_EXPENSE_SUCCESS:
      return {...state, expenses: [...[payload], ...state.expenses]};

    case types.UPDATE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === payload.id ? payload : expense
        )
      };

    case types.REMOVE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: state.expenses.filter(({id}) => id !== payload)
      };

    default:
      return state;
  }
}
