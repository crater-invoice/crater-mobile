import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoice/types';
import {validate} from 'stores/recurring-invoice/validator';
import {currentCurrencySelector} from 'stores/company/selectors';
import {initialValues} from 'stores/recurring-invoice/helpers';
import {fetchNotes} from 'stores/note/actions';
import {notesSelector} from 'stores/note/selectors';
import {taxTypesSelector} from 'stores/tax-type/selectors';
import {fetchTaxes} from 'stores/tax-type/actions';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {
  loadingSelector,
  statusSelector
} from 'stores/recurring-invoice/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    common: {
      dateFormat,
      config: {
        recurring_invoice_status: {update_status}
      }
    },
    recurringInvoice: {selectedItems, invoiceTemplates},
    item: {items}
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
    customers: customersSelector(state),
    taxTypes: taxTypesSelector(state),
    dateFormat,
    currency: currentCurrencySelector(state),
    customFields: customFieldsSelector(state),
    statusList: statusSelector(update_status),
    formValues: getFormValues(CREATE_RECURRING_INVOICE_FORM)(state) || {},
    initialValues: initialValues()
  };
};

const mapDispatchToProps = {
  fetchCustomers,
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
