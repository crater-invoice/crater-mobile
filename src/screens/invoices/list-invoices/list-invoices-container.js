import {connect} from 'react-redux';
import Invoices from './list-invoices';
import {reduxForm, getFormValues} from 'redux-form';
import {INVOICES_FORM} from 'stores/invoices/types';
import {commonSelector} from 'stores/common/selectors';
import {invoicesSelector, loadingSelector} from 'stores/invoices/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';

const mapStateToProps = state => ({
  customers: customersSelector(state),
  invoices: invoicesSelector(state),
  formValues: getFormValues(INVOICES_FORM)(state) || {},
  ...loadingSelector(state),
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchCustomers
};

const InvoicesForm = reduxForm({form: INVOICES_FORM})(Invoices);

export const InvoicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicesForm);
