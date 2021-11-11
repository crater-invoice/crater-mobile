import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {Expense} from '../../components/Expense';
import {validate} from './validation';
import * as actions from '../../actions';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {EXPENSE_FORM, EXPENSE_FIELDS as FIELDS} from '../../constants';
import {fetchCategories} from 'stores/category/actions';
import {categoriesSelector} from 'stores/category/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {endpointURL},
    expenses: {loading}
  } = state;
  const id = route?.params?.id;

  return {
    categories: categoriesSelector(state),
    customers: customersSelector(state),
    endpointURL,
    customFields: customFieldsSelector(state),
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
