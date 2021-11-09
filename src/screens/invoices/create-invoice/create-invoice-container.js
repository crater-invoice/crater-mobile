import {connect} from 'react-redux';
import CreateInvoice from './create-invoice';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_INVOICE_FORM} from 'stores/invoices/types';
import {validate} from 'stores/invoices/validator';
import {getCustomers} from '@/features/customers/actions';
import {getItems} from '@/features/more/actions';
import {loadingSelector} from 'stores/invoices/selectors';
import {initialValues} from 'stores/invoices/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/notes/actions';
import {notesSelector} from 'stores/notes/selectors';
import {taxTypesSelector} from 'stores/taxes/selectors';
import {fetchTaxes} from 'stores/taxes/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    settings: {customFields},
    invoices: {selectedItems, invoiceData},
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
    notes: notesSelector(state),
    customers,
    taxTypes: taxTypesSelector(state),
    currency: currentCurrencySelector(state),
    customFields,
    formValues: getFormValues(CREATE_INVOICE_FORM)(state) || {},
    initialValues
  };
};

const mapDispatchToProps = {
  getCustomers,
  fetchTaxes,
  fetchNotes,
  getItems
};

const CreateInvoiceReduxForm = reduxForm({
  form: CREATE_INVOICE_FORM,
  validate
})(CreateInvoice);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvoiceReduxForm);
