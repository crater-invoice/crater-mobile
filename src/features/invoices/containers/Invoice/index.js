import {connect} from 'react-redux';
import {find} from 'lodash';
import {Invoice} from '../../components/Invoice';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as actions from '../../actions';
import {INVOICE_FORM} from '../../constants';
import moment from 'moment';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';
import {isEmpty} from '@/constants';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {getItems} from '@/features/more/actions';

const getSelectedTemplate = (templates, form, isEditScreen) => {
  if (!isEditScreen) {
    return templates?.[0]?.name;
  }

  if (form?.template_name) {
    return form?.template_name;
  }

  return find(templates, {id: form?.invoice_template_id})?.name;
};

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes, currency},
    invoices,
    invoices: {
      isFetchingInitialData,
      isDeleting,
      isSaving,
      selectedItems,
      invoiceData
    },
    settings: {notes, customFields},
    more: {items},
    customers: {customers}
  } = state;

  const {invoice = null, invoiceTemplates, invoice_notes = ''} = invoiceData;

  const id = route?.params?.id;
  const permissions = permissionSelector(route);
  const isEditScreen = permissions.isEditScreen;

  const isLoading =
    isFetchingInitialData ||
    (isEditScreen && !invoice) ||
    isEmpty(invoiceTemplates);

  return {
    initLoading: isLoading,
    loading: isSaving,
    withLoading: invoices.isLoading || isDeleting,
    selectedItems,
    invoiceData,
    items,
    notes,
    customers,
    formValues: getFormValues(INVOICE_FORM)(state) || {},
    taxTypes,
    currency,
    customFields,
    id,
    ...permissions,
    ...commonSelector(state),
    initialValues: !isLoading
      ? {
          due_date: moment().add(7, 'days'),
          invoice_date: moment(),
          discount_type: 'fixed',
          discount: 0,
          taxes: [],
          template_name: getSelectedTemplate(
            invoiceTemplates,
            invoice,
            isEditScreen
          ),
          notes: invoice_notes,
          ...invoice,
          invoice_number: isEditScreen
            ? invoiceData?.nextInvoiceNumber
            : invoiceData?.nextNumber,
          prefix: isEditScreen
            ? invoiceData?.invoicePrefix
            : invoiceData?.prefix,
          customer: invoice?.customer,
          template: invoice?.invoice_template
        }
      : null
  };
};

const mapDispatchToProps = {
  ...actions,
  getCustomers,
  getTaxes,
  getNotes,
  getItems
};

const addInvoiceReduxForm = reduxForm({
  form: 'invoiceForm/INVOICE_FORM',
  validate
})(Invoice);

const InvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(addInvoiceReduxForm);

export default InvoiceContainer;
