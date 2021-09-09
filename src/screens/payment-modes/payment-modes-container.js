import {connect} from 'react-redux';
import {PaymentModes} from './payment-modes';
import {commonSelector} from 'stores/common/selectors';
import * as paymentAction from 'stores/payment-modes/actions';
import {getFormValues, reduxForm} from 'redux-form';
import {PAYMENT_MODES_FORM} from '@/stores/payment-modes/types';
import {fetchPaymentModes} from 'stores/payment-modes/actions';

const mapStateToProps = state => {
  const {
    paymentModes: {modes}
  } = state;

  return {
    formValues: getFormValues(PAYMENT_MODES_FORM)(state) || {},
    paymentModes: modes,
    ...commonSelector(state)
  };
};

const paymentModesForm = reduxForm({
  form: PAYMENT_MODES_FORM
})(PaymentModes);

const mapDispatchToProps = {
  fetchPaymentModes: fetchPaymentModes
};

export const PaymentModesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(paymentModesForm);

PaymentModesContainer.navigationOptions = () => ({
  header: null
});
