import {connect} from 'react-redux';
import {PaymentModes} from './payment-modes';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import * as customizeAction from 'stores/payment-modes/actions';

const mapStateToProps = state => {
  const {
    paymentModes: {modes}
  } = state;

  return {
    modes,
    ...commonSelector(state)
  };
};

const mapDispatchToProps = {
  createPaymentMode: customizeAction.createPaymentMode,
  editPaymentMode: customizeAction.editPaymentMode,
  removePaymentMode: customizeAction.removePaymentMode,
  getPaymentModes: customizeAction.getPaymentModes
};

export const PaymentModesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModes);

PaymentModesContainer.navigationOptions = () => ({
  header: null
});
