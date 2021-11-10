import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {Expense} from '../../components/Expense';
import {validate} from './validation';
import * as actions from '../../actions';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {EXPENSE_FORM, EXPENSE_FIELDS as FIELDS} from '../../constants';
import {fetchCategories} from 'stores/categories/actions';
import {categoriesSelector} from 'stores/categories/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';

const mapStateToProps = (state, {route}) => {
  const {
    common: {endpointURL},
    expenses: {loading},
    settings: {customFields}
  } = state;
  const id = route?.params?.id;

  return {
    categories: categoriesSelector(state),
    customers: customersSelector(state),
    endpointURL,
    customFields,
    loading: loading?.expenseLoading,
    id,
    currency: currentCurrencySelector(state),
    formValues: getFormValues(EXPENSE_FORM)(state) || {},
    ...permissionSelector(route),
    ...commonSelector(state),
    initialValues: {
      expense: {
        [FIELDS.RECEIPT]: '',
        [FIELDS.NOTES]: '',
        [FIELDS.CUSTOMER]: '',
        [FIELDS.CUSTOM_FIELDS]: ''
      }
    }
  };
};

const mapDispatchToProps = {
  ...actions,
  fetchCategories,
  fetchCustomers
};

const addExpenseReduxForm = reduxForm({
  form: EXPENSE_FORM,
  validate
})(Expense);

const ExpenseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(addExpenseReduxForm);

export default ExpenseContainer;
