import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {validate} from 'stores/recurring-invoices/validator';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {loadingSelector} from 'stores/recurring-invoices/selectors';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {getItems} from '@/features/more/actions';
import moment from 'moment';
import {currentCurrencySelector} from 'stores/company/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {
      taxTypes,
      config: {
        recurring_invoice_status: {update_status}
      }
    },
    settings: {notes, customFields},
    recurringInvoices: {selectedItems, invoiceData},
    more: {items},
    customers: {customers}
  } = state;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    invoiceData,
    items,
    notes,
    customers,
    taxTypes,
    currency: currentCurrencySelector(state),
    customFields,
    statusList: update_status,
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
      frequency_picker: '0 0 1 * *',
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
