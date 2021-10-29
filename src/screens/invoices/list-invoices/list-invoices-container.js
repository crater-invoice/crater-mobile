import {connect} from 'react-redux';
import Invoices from './list-invoices';
import {reduxForm, getFormValues} from 'redux-form';
import {INVOICES_FORM} from 'stores/invoices/types';
import {getCustomers} from '@/features/customers/actions';
import {commonSelector} from 'stores/common/selectors';
import {invoicesSelector, loadingSelector} from 'stores/invoices/selectors';

const mapStateToProps = state => {
  const {
    customers: {customers}
  } = state;
  return {
    customers,
    invoices: invoicesSelector(state),
    formValues: getFormValues(INVOICES_FORM)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getCustomers
};

const InvoicesForm = reduxForm({form: INVOICES_FORM})(Invoices);

export const InvoicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InvoicesForm);
