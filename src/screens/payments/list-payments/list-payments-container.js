import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Payments from './list-payments';
import {commonSelector} from 'stores/common/selectors';
import {PAYMENTS_FORM} from 'stores/payment/types';
import {paymentsSelector} from 'stores/payment/selectors';
import {fetchCustomers} from 'stores/customer/actions';
import {fetchPaymentModes} from 'stores/payment-mode/actions';
import {customersSelector} from 'stores/customer/selectors';
import {modesSelector} from 'stores/payment-mode/selectors';

const mapStateToProps = state => ({
  payments: paymentsSelector(state),
  customers: customersSelector(state),
  paymentModes: modesSelector(state),
  formValues: getFormValues(PAYMENTS_FORM)(state) || {},
  ...commonSelector(state)
});

const mapDispatchToProps = {
  fetchCustomers,
  fetchPaymentModes
};

const PaymentsForm = reduxForm({form: PAYMENTS_FORM})(Payments);

export const PaymentsContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentsForm);
