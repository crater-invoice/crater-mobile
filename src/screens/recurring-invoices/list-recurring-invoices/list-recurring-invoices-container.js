import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import RecurringInvoices from './list-recurring-invoices';
import {RECURRING_INVOICES_FORM} from 'stores/recurring-invoices/types';
import {
  invoicesSelector,
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoices/selectors';
import {commonSelector} from 'stores/common/selectors';
import {getCustomers} from '@/features/customers/actions';

const mapStateToProps = state => {
  const {
    common: {
      config: {
        recurring_invoice_status: {update_status}
      }
    },
    customers: {customers}
  } = state;
  return {
    customers,
    statusList: statusSelector(update_status),
    invoices: invoicesSelector(state),
    formValues: getFormValues(RECURRING_INVOICES_FORM)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};
const mapDispatchToProps = {
  getCustomers
};

const RecurringInvoicesForm = reduxForm({
  form: RECURRING_INVOICES_FORM
})(RecurringInvoices);

export const RecurringInvoicesContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecurringInvoicesForm);
