import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {validate} from 'stores/recurring-invoices/validator';
import {
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoices/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {getItems} from '@/features/more/actions';
import {initialValues} from 'stores/recurring-invoices/helpers';

const mapStateToProps = (state, {route}) => {
  const {
    common: {
      dateFormat,
      taxTypes,
      config: {
        recurring_invoice_status: {update_status}
      }
    },
    settings: {notes, customFields},
    recurringInvoices: {selectedItems, invoiceTemplates},
    more: {items},
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
    notes,
    customers,
    taxTypes,
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
