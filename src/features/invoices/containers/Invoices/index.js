import {connect} from 'react-redux';
import {Invoices} from '../../components/Invoices';
import {reduxForm, getFormValues} from 'redux-form';
import * as InvoicesAction from '../../actions';
import {INVOICE_SEARCH} from '../../constants';
import {getCustomers} from '../../../customers/actions';
import {commonSelector} from 'stores/common/selectors';
import {
  getDueInvoicesState,
  getDraftInvoicesState,
  getAllInvoicesState
} from '../../selectors';

const mapStateToProps = state => {
  const {
    invoices: {
      invoices,
      loading: {invoicesLoading}
    }
  } = state;
  const theme = state.common?.theme;

  return {
    invoices,
    dueInvoices: getDueInvoicesState({invoices, theme}),
    draftInvoices: getDraftInvoicesState({invoices, theme}),
    allInvoices: getAllInvoicesState({invoices, theme}),
    loading: invoicesLoading,
    customers: state.customers?.customers,
    formValues: getFormValues(INVOICE_SEARCH)(state) || {},
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  getInvoices: InvoicesAction.getInvoices,
  getCustomers: getCustomers
};

const invoiceSearchReduxForm = reduxForm({
  form: 'invoiceForm/INVOICE_SEARCH'
})(Invoices);

const InvoicesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(invoiceSearchReduxForm);

export default InvoicesContainer;
