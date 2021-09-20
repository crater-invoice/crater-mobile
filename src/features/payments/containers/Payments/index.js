import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import * as PaymentsAction from '../../actions';
import {Payments} from '../../components/Payments';
import {PAYMENT_SEARCH} from '../../constants';
import {getPaymentsState, getPaymentModesState} from '../../selectors';
import {getCustomers} from '@/features/customers/actions';
import {fetchPaymentModes} from 'stores/payment-modes/actions';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  payments: getPaymentsState(state.payments?.payments),
  customers: state.customers?.customers,
  paymentModes: getPaymentModesState(state?.paymentModes?.modes),
  formValues: getFormValues(PAYMENT_SEARCH)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  getPayments: PaymentsAction.getPayments,
  getCustomers,
  fetchPaymentModes
};

const paymentSearchReduxForm = reduxForm({
  form: PAYMENT_SEARCH
})(Payments);

const PaymentsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(paymentSearchReduxForm);

export default PaymentsContainer;
