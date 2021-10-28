import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as ExpensesAction from '../../actions';
import {Expenses} from '../../components/Expenses';
import {EXPENSE_SEARCH} from '../../constants';
import {getExpensesState} from '../../selectors';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector} from 'stores/common/selectors';
import {fetchCategories} from 'stores/categories/actions';
import {categoriesSelector} from 'stores/categories/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';

const mapStateToProps = state => {
  const {
    expenses: {expenses}
  } = state;
  const currency = currentCurrencySelector(state);
  return {
    expenses: getExpensesState({expenses, currency}),
    currency,
    customers: state.customers?.customers,
    categories: categoriesSelector(state),
    formValues: getFormValues(EXPENSE_SEARCH)(state) || {},
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getExpenses: ExpensesAction.getExpenses,
  fetchCategories,
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
