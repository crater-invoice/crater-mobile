import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {Expense} from '../../components/Expense';
import {validate} from './validation';
import * as actions from '../../actions';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {EXPENSE_FORM, EXPENSE_FIELDS as FIELDS} from '../../constants';
import {fetchCategories} from 'stores/categories/actions';
import {categoriesSelector} from 'stores/categories/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {endpointURL, currency},
    expenses: {loading},
    settings: {customFields}
  } = state;
  const id = route?.params?.id;

  return {
    categories: categoriesSelector(state),
    customers: state.customers?.customers,
    endpointURL,
    customFields,
    loading: loading?.expenseLoading,
    id,
    currency,
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
  getCustomers
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
