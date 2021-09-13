import {routes} from '../routes';
import ExpenseContainer from '../../features/expenses/containers/Expense';
import {generateStackNavigation} from '../actions';

export const ExpenseNavigator = {
  [routes.EXPENSE]: generateStackNavigation(routes.EXPENSE, ExpenseContainer)
};
