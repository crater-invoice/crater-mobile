import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import CreatePayment from './create-payment';
import {validate} from 'stores/payment/validator';
import {CREATE_PAYMENT_FORM} from 'stores/payment/types';
import {customFieldsSelector} from 'stores/custom-field/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {fetchPaymentModes} from 'stores/payment-mode/actions';
import {fetchNotes} from 'stores/note/actions';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {notesSelector} from 'stores/note/selectors';
import {modesSelector} from 'stores/payment-mode/selectors';
import {fetchPaymentInvoices} from 'stores/payment/actions';
import {
  loadingSelector,
  paymentInvoicesSelector
} from 'stores/payment/selectors';

const mapStateToProps = (state, {route}) => {
  const paymentInvoiceId = route?.params?.paymentInvoiceId;
  const paymentInvoices = state?.payment?.paymentInvoices;
  const theme = state?.common?.theme;
  return {
    ...loadingSelector(state),
    ...commonSelector(state),
    ...permissionSelector(route),
    notes: notesSelector(state),
    paymentModes: modesSelector(state),
    customers: customersSelector(state),
    currency: currentCurrencySelector(state),
    customFields: customFieldsSelector(state),
    invoice: route?.params?.invoice,
    hasRecordPayment: route?.params?.hasRecordPayment,
    formValues: getFormValues(CREATE_PAYMENT_FORM)(state) || {},
    paymentInvoices: paymentInvoicesSelector(
      paymentInvoices,
      paymentInvoiceId,
      theme
    ),
    initialValues: {
      payment_date: null,
      payment_number: null,
      customer_id: null,
      invoice_id: null,
      amount: null,
      payment_method_id: null,
      notes: null
    }
  };
};

const mapDispatchToProps = {
  fetchCustomers,
  fetchPaymentModes,
  fetchPaymentInvoices,
  fetchNotes
};
const CreatePaymentForm = reduxForm({form: CREATE_PAYMENT_FORM, validate})(
  CreatePayment
);

export const CreatePaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatePaymentForm);
