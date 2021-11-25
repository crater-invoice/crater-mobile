import {connect} from 'react-redux';
import CreateInvoice from './create-invoice';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_INVOICE_FORM} from 'stores/invoice/types';
import {validate} from 'stores/invoice/validator';
import {loadingSelector, templatesSelector} from 'stores/invoice/selectors';
import {initialValues, isAllowToEditInvoice} from 'stores/invoice/helpers';
import {currentCurrencySelector} from 'stores/company/selectors';
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

const mapStateToProps = (state, {route}) => {
  const {
    invoice: {selectedItems},
    item: {items}
  } = state;
  const permissions = permissionSelector(route);
  const isAllowToEdit = isAllowToEditInvoice(
    route,
    permissions.isEditScreen,
    permissions.isAllowToEdit
  );

  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...settingsSelector(state),
    ...permissions,
    isAllowToEdit,
    selectedItems,
    items,
    invoiceTemplates: templatesSelector(state),
    notes: notesSelector(state),
    customers: customersSelector(state),
    taxTypes: taxTypesSelector(state),
    currency: currentCurrencySelector(state),
    customFields: customFieldsSelector(state),
    formValues: getFormValues(CREATE_INVOICE_FORM)(state) || {},
    initialValues: initialValues()
  };
};

const mapDispatchToProps = {
  fetchCustomers,
  fetchTaxes,
  fetchNotes
};

const CreateInvoiceForm = reduxForm({
  form: CREATE_INVOICE_FORM,
  validate
})(CreateInvoice);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvoiceForm);
