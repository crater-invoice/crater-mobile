import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {validate} from 'stores/recurring-invoices/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/recurring-invoices/selectors';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {getItems} from '@/features/more/actions';
import moment from 'moment';

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes, currency},
    settings: {notes, customFields},
    recurringInvoices: {status, selectedItems, invoiceData},
    more: {items},
    customers: {customers}
  } = state;
  const id = route?.params?.id;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...permissionSelector(route),
    id,
    selectedItems,
    invoiceData,
    items,
    notes,
    customers,
    taxTypes,
    currency,
    customFields,
    statusList: status,
    formValues: getFormValues(CREATE_RECURRING_INVOICE_FORM)(state) || {},
    initialValues: {
      customer_id: null,
      starts_at: moment(),
      next_invoice_at: null,
      limit_by: null,
      limit_date: moment().add(7, 'days'),
      limit_count: null,
      status: null,
      frequency: '0 0 1 * *',
      frequency_picker: null,
      items: null,
      template_name: null,
      send_automatically: null
    }
  };
};

const mapDispatchToProps = {
  getCustomers,
  getTaxes,
  getNotes,
  getItems
};

const CreateRecurringInvoiceForm = reduxForm({
  form: CREATE_RECURRING_INVOICE_FORM,
  validate
})(CreateRecurringInvoice);

export const CreateRecurringInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecurringInvoiceForm);
