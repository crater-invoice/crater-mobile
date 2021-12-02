import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Expenses from './list-expenses';
import {EXPENSES_FORM} from 'stores/expense/types';
import {commonSelector} from 'stores/common/selectors';
import {fetchCategories} from 'stores/category/actions';
import {categoriesSelector} from 'stores/category/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {expenseSelector, loadingSelector} from 'stores/expense/selectors';

const mapStateToProps = state => ({
  expenses: expenseSelector(state),
  customers: customersSelector(state),
  categories: categoriesSelector(state),
  formValues: getFormValues(EXPENSES_FORM)(state) || {},
  ...loadingSelector(state),
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchCategories,
  fetchCustomers
};

const ExpensesForm = reduxForm({form: EXPENSES_FORM})(Expenses);

export const ExpensesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesForm);
