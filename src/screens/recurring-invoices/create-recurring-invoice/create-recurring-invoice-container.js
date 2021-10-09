import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateRecurringInvoice from './create-recurring-invoice';
import {CREATE_RECURRING_INVOICE_FORM} from 'stores/recurring-invoices/types';
import {validate} from 'stores/recurring-invoices/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/recurring-invoices/selectors';
import {getCustomers} from '@/features/customers/actions';
import {getTaxes, getNotes} from '@/features/settings/actions';

const mapStateToProps = (state, {route}) => {
  const {
    common: {taxTypes, currency},
    settings: {notes, customFields},
    customers: {customers}
  } = state;
  const id = route?.params?.id;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...permissionSelector(route),
    id,
    notes,
    customers,
    taxTypes,
    currency,
    customFields,
    formValues: getFormValues(CREATE_RECURRING_INVOICE_FORM)(state) || {},
    initialValues: {
      name: null,
      email: null,
      password: null,
      phone: null,
      role: null
    }
  };
};

const mapDispatchToProps = {
  getCustomers,
  getTaxes,
  getNotes
};

const CreateRecurringInvoiceForm = reduxForm({
  form: CREATE_RECURRING_INVOICE_FORM,
  validate
})(CreateRecurringInvoice);

export const CreateRecurringInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecurringInvoiceForm);
