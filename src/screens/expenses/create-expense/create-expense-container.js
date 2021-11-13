import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreateExpense from './create-expense';
import {validate} from 'stores/expense/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {CREATE_EXPENSE_FORM} from 'stores/expense/types';
import {fetchCategories} from 'stores/category/actions';
import {categoriesSelector} from 'stores/category/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {loadingSelector} from 'stores/expense/selectors';
import {initialValues} from 'stores/expense/helpers';

const mapStateToProps = (state, {route}) => {
  const {
    common: {endpointURL}
  } = state;

  return {
    endpointURL,
    initialValues,
    categories: categoriesSelector(state),
    customers: customersSelector(state),
    customFields: customFieldsSelector(state),
    currency: currentCurrencySelector(state),
    formValues: getFormValues(CREATE_EXPENSE_FORM)(state) || {},
    ...permissionSelector(route),
    ...commonSelector(state),
    ...loadingSelector(state)
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCustomers
};

const CreateExpenseForm = reduxForm({
  form: CREATE_EXPENSE_FORM,
  validate
})(CreateExpense);

export const CreateExpenseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateExpenseForm);
