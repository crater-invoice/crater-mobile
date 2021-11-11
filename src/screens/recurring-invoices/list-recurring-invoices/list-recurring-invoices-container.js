import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import RecurringInvoices from './list-recurring-invoices';
import {RECURRING_INVOICES_FORM} from 'stores/recurring-invoice/types';
import {commonSelector} from 'stores/common/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {
  invoicesSelector,
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoice/selectors';

const mapStateToProps = state => {
  const {
    common: {
      config: {
        recurring_invoice_status: {update_status}
      }
    }
  } = state;
  return {
    customers: customersSelector(state),
    statusList: statusSelector(update_status),
    invoices: invoicesSelector(state),
    formValues: getFormValues(RECURRING_INVOICES_FORM)(state) || {},
    ...loadingSelector(state),
    ...commonSelector(state)
  };
};
const mapDispatchToProps = {
  fetchCustomers
};

const RecurringInvoicesForm = reduxForm({
  form: RECURRING_INVOICES_FORM
})(RecurringInvoices);

export const RecurringInvoicesContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecurringInvoicesForm);
