import {connect} from 'react-redux';
import CreateInvoice from './create-invoice';
import {reduxForm, getFormValues} from 'redux-form';
import {CREATE_INVOICE_FORM} from 'stores/invoices/types';
import {validate} from 'stores/invoices/validator';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {getItems} from '@/features/more/actions';
import {
  commonSelector,
  permissionSelector,
  settingsSelector
} from 'stores/common/selectors';
import {loadingSelector} from '@/stores/invoices/selectors';
import {initialValues} from '@/stores/invoices/helpers';

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes, currency},
    settings: {notes, customFields},
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
    notes,
    customers,
    taxTypes,
    currency,
    customFields,
    formValues: getFormValues(CREATE_INVOICE_FORM)(state) || {},
    initialValues
  };
};

const mapDispatchToProps = {
  getCustomers,
  getTaxes,
  getNotes,
  getItems
};

const CreateInvoiceReduxForm = reduxForm({
  form: CREATE_INVOICE_FORM,
  validate
})(CreateInvoice);

export const CreateInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateInvoiceReduxForm);
