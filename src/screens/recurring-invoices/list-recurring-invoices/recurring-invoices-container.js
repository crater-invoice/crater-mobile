import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import RecurringInvoices from './recurring-invoices';
import {RECURRING_INVOICE_SEARCH} from 'stores/recurring-invoices/types';
import {
  invoicesSelector,
  loadingSelector
} from 'stores/recurring-invoices/selectors';
import {commonSelector} from 'stores/common/selectors';
import {getCustomers} from '@/features/customers/actions';

const mapStateToProps = state => {
  const {
    common: {recurring_invoice_update_status},
    customers: {customers}
  } = state;
  return {
    customers,
    statusList: recurring_invoice_update_status,
    invoices: invoicesSelector(state),
    formValues: getFormValues(RECURRING_INVOICE_SEARCH)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};
const mapDispatchToProps = {
  getCustomers: getCustomers
};

const RecurringInvoicesForm = reduxForm({
  form: RECURRING_INVOICE_SEARCH
})(RecurringInvoices);

export const RecurringInvoicesContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecurringInvoicesForm);
