import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as PaymentsAction from '../../actions';
import {Payments} from '../../components/Payments';
import {PAYMENT_SEARCH} from '../../constants';
import {getPaymentsState, getPaymentModesState} from '../../selectors';
import {fetchPaymentModes} from 'stores/payment-modes/actions';
import {commonSelector} from 'stores/common/selectors';
import {customersSelector} from 'stores/customers/selectors';
import {fetchCustomers} from 'stores/customers/actions';

const mapStateToProps = state => ({
  payments: getPaymentsState(state.payments?.payments),
  customers: customersSelector(state),
  paymentModes: getPaymentModesState(state?.paymentModes?.modes),
  formValues: getFormValues(PAYMENT_SEARCH)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getPayments: PaymentsAction.getPayments,
  fetchCustomers,
  fetchPaymentModes
};

const paymentSearchReduxForm = reduxForm({
  form: 'payments/PAYMENT_SEARCH'
})(Payments);

const PaymentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(paymentSearchReduxForm);

export default PaymentsContainer;
