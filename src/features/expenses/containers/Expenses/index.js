import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as ExpensesAction from '../../actions';
import {Expenses} from '../../components/Expenses';
import {EXPENSE_SEARCH} from '../../constants';
import {getExpensesState} from '../../selectors';
import {commonSelector} from 'stores/common/selectors';
import {fetchCategories} from 'stores/category/actions';
import {categoriesSelector} from 'stores/category/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';

const mapStateToProps = state => {
  const {
    expenses: {expenses}
  } = state;
  const currency = currentCurrencySelector(state);
  return {
    expenses: getExpensesState({expenses, currency}),
    currency,
    customers: customersSelector(state),
    categories: categoriesSelector(state),
    formValues: getFormValues(EXPENSE_SEARCH)(state) || {},
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getExpenses: ExpensesAction.getExpenses,
  fetchCategories,
  fetchCustomers
};

const ExpensesSearchReduxForm = reduxForm({
  form: EXPENSE_SEARCH
})(Expenses);

const ExpensesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesSearchReduxForm);

export default ExpensesContainer;
