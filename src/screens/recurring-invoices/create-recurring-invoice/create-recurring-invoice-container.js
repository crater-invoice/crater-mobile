import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {validate} from 'stores/recurring-invoices/validator';
import {currentCurrencySelector} from 'stores/company/selectors';
import {getCustomers} from '@/features/customers/actions';
import {initialValues} from 'stores/recurring-invoices/helpers';
import {fetchNotes} from 'stores/notes/actions';
import {notesSelector} from 'stores/notes/selectors';
import {taxTypesSelector} from 'stores/taxes/selectors';
import {fetchTaxes} from 'stores/taxes/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoices/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {
      dateFormat,
      config: {
        recurring_invoice_status: {update_status}
      }
    },
    settings: {customFields},
    recurringInvoices: {selectedItems, invoiceTemplates},
    items: {items},
    customers: {customers}
  } = state;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    invoiceTemplates,
    items,
    notes: notesSelector(state),
    customers,
    taxTypes: taxTypesSelector(state),
    dateFormat,
    currency: currentCurrencySelector(state),
    customFields,
    statusList: statusSelector(update_status),
    formValues: getFormValues(CREATE_RECURRING_INVOICE_FORM)(state) || {},
    initialValues: initialValues(invoiceTemplates)
  };
};

const mapDispatchToProps = {
  getCustomers,
  fetchTaxes,
  fetchNotes
};

const CreateRecurringInvoiceForm = reduxForm({
  form: CREATE_RECURRING_INVOICE_FORM,
  validate
})(CreateRecurringInvoice);

export const CreateRecurringInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecurringInvoiceForm);
