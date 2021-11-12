import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import {validate} from './validation';
import * as actions from '../../actions';
import {PAYMENT_FORM, PAYMENT_FIELDS as FIELDS} from '../../constants';
import {Payment} from '../../components/Payment';
import {fetchPaymentModes} from 'stores/payment-mode/actions';
import {getPaymentModesState} from '../../selectors';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {currentCurrencySelector} from 'stores/company/selectors';
import {fetchNotes} from 'stores/note/actions';
import {notesSelector} from 'stores/note/selectors';
import {customersSelector} from 'stores/customer/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {customFieldsSelector} from 'stores/custom-field/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    payments: {loading, unPaidInvoices},
    paymentMode: {modes}
  } = state;

  const invoice = route?.params?.invoice;
  const hasRecordPayment = route?.params?.hasRecordPayment;

  return {
    customers: customersSelector(state),
    invoice,
    notes: notesSelector(state),
    hasRecordPayment,
    loading: loading?.paymentLoading,
    withLoading: loading?.sendReceiptLoading,
    unPaidInvoices,
    customFields: customFieldsSelector(state),
    paymentModes: getPaymentModesState(modes),
    formValues: getFormValues(PAYMENT_FORM)(state) || {},
    currency: currentCurrencySelector(state),
    ...permissionSelector(route),
    ...commonSelector(state),
    initialValues: {
      payment: {
        [FIELDS.CUSTOMER]: null,
        [FIELDS.INVOICE]: null,
        [FIELDS.METHOD]: null,
        [FIELDS.NOTES]: null
      }
    }
  };
};

const mapDispatchToProps = {
  ...actions,
  fetchCustomers,
  fetchPaymentModes,
  fetchNotes
};

const createPaymentForm = reduxForm({
  form: 'payments/PAYMENT_FORM',
  validate
})(Payment);

const PaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(createPaymentForm);

export default PaymentContainer;
