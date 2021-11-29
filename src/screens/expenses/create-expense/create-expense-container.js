import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreateExpense from './create-expense';
import {validate} from 'stores/expense/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {CREATE_EXPENSE_FORM} from 'stores/expense/types';
import {fetchCategories} from 'stores/category/actions';
import {categoriesSelector} from 'stores/category/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {loadingSelector} from 'stores/expense/selectors';
import {modesSelector} from 'stores/payment-mode/selectors';
import {fetchPaymentModes} from 'stores/payment-mode/actions';
import {
  currenciesSelector,
  currentCurrencySelector
} from 'stores/company/selectors';
import moment from 'moment';

const mapStateToProps = (state, {route}) => {
  const {
    common: {endpointURL}
  } = state;
  const currency = currentCurrencySelector(state);
  return {
    endpointURL,
    categories: categoriesSelector(state),
    customers: customersSelector(state),
    customFields: customFieldsSelector(state),
    currency,
    formValues: getFormValues(CREATE_EXPENSE_FORM)(state) || {},
    currencies: currenciesSelector(state),
    paymentModes: modesSelector(state),
    ...permissionSelector(route),
    ...commonSelector(state),
    ...loadingSelector(state),
    initialValues: {
      attachment_receipt: null,
      expense_date: moment(),
      amount: null,
      expense_category_id: null,
      customer_id: null,
      notes: null,
      currency_id: currency?.id,
      payment_method_id: null,
      exchange_rate: 1
    }
  };
};

const mapDispatchToProps = {
  fetchCategories,
  fetchCustomers,
  fetchPaymentModes
};

const CreateExpenseForm = reduxForm({
  form: CREATE_EXPENSE_FORM,
  validate
})(CreateExpense);

export const CreateExpenseContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateExpenseForm);
