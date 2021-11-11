import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreateCustomer from './create-customer';
import {validate} from 'stores/customers/validator';
import {loadingSelector} from 'stores/customers/selectors';
import {CREATE_CUSTOMER_FORM} from 'stores/customers/types';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {
  commonSelector,
  countriesSelector,
  permissionSelector
} from 'stores/common/selectors';
import {
  currenciesSelector,
  currentCurrencySelector
} from 'stores/company/selectors';

const mapStateToProps = (state, {route}) => ({
  ...loadingSelector(state),
  ...commonSelector(state),
  ...permissionSelector(route),
  formValues: getFormValues(CREATE_CUSTOMER_FORM)(state) || {},
  currencies: currenciesSelector(state),
  countries: countriesSelector(state),
  currency: currentCurrencySelector(state),
  customFields: customFieldsSelector(state),
  initialValues: {
    name: null,
    contact_name: null,
    email: null,
    phone: null,
    website: null,
    currency_id: null,
    customFields: null,
    billing: null,
    shipping: null,
    password: null,
    confirmPassword: null
  }
});

const CreateCustomerForm = reduxForm({form: CREATE_CUSTOMER_FORM, validate})(
  CreateCustomer
);

export const CreateCustomerContainer = connect(mapStateToProps)(
  CreateCustomerForm
);
