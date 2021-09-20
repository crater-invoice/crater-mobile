import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as ExpensesAction from '../../actions';
import * as CategoriesAction from '../../../settings/actions';
import {Expenses} from '../../components/Expenses';
import {EXPENSE_SEARCH} from '../../constants';
import {getExpensesState, getCategoriesState} from '../../selectors';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => {
  const {
    common: {currency},
    expenses: {expenses}
  } = state;

  return {
    expenses: getExpensesState({expenses, currency}),
    currency,
    customers: state.customers?.customers,
    categories: getCategoriesState(state.settings?.categories),
    formValues: getFormValues(EXPENSE_SEARCH)(state) || {},
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getExpenses: ExpensesAction.getExpenses,
  getCategories: CategoriesAction.getExpenseCategories,
  getCustomers
};

const ExpensesSearchReduxForm = reduxForm({
  form: EXPENSE_SEARCH
})(Expenses);

const ExpensesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesSearchReduxForm);

export default ExpensesContainer;
