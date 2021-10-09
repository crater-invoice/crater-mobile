import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import RecurringInvoices from './recurring-invoices';
import {RECURRING_INVOICES_FORM} from 'stores/recurring-invoices/types';
import {
  invoicesSelector,
  loadingSelector
} from 'stores/recurring-invoices/selectors';
import {commonSelector} from '@/stores/common/selectors';
import {getCustomers} from '@/features/customers/actions';

const mapStateToProps = state => {
  return {
    invoices: invoicesSelector(state),
    customers: state.customers?.customers,
    formValues: getFormValues(RECURRING_INVOICES_FORM)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};
const mapDispatchToProps = {
  getCustomers: getCustomers
};

const RecurringInvoicesForm = reduxForm({
  form: RECURRING_INVOICES_FORM
})(RecurringInvoices);

export const RecurringInvoicesContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecurringInvoicesForm);
