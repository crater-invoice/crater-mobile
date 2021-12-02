import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Customers from './list-customers';
import {commonSelector} from 'stores/common/selectors';
import {CUSTOMERS_FORM} from 'stores/customer/types';
import {customersSelector} from 'stores/customer/selectors';

const mapStateToProps = state => ({
  customers: customersSelector(state),
  formValues: getFormValues(CUSTOMERS_FORM)(state) || {},
  ...commonSelector(state)
});

const CustomersForm = reduxForm({form: CUSTOMERS_FORM})(Customers);

export const CustomersContainer: any = connect(mapStateToProps)(CustomersForm);
