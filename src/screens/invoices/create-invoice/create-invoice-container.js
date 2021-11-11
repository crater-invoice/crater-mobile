import {connect} from 'react-redux';
import CreateInvoice from './create-invoice';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_INVOICE_FORM} from 'stores/invoices/types';
import {validate} from 'stores/invoices/validator';
import {loadingSelector} from 'stores/invoices/selectors';
import {initialValues} from 'stores/invoices/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/notes/actions';
import {notesSelector} from 'stores/notes/selectors';
import {taxTypesSelector} from 'stores/taxes/selectors';
import {fetchTaxes} from 'stores/taxes/actions';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    invoices: {selectedItems, invoiceData},
    items: {items}
  } = state;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissionSelector(route),
    selectedItems,
    invoiceData,
    items,
    notes: notesSelector(state),
    customers: customersSelector(state),
    taxTypes: taxTypesSelector(state),
    currency: currentCurrencySelector(state),
    customFields: customFieldsSelector(state),
    formValues: getFormValues(CREATE_INVOICE_FORM)(state) || {},
    initialValues
  };
};

const mapDispatchToProps = {
  fetchCustomers,
  fetchTaxes,
  fetchNotes
};

const CreateInvoiceReduxForm = reduxForm({
  form: CREATE_INVOICE_FORM,
  validate
})(CreateInvoice);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvoiceReduxForm);
