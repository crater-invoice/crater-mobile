import {connect} from 'react-redux';
import {PaymentModes} from './payment-modes';
import {routes} from '@/navigation';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {getFormValues, reduxForm} from 'redux-form';
import {PAYMENT_MODES_FORM} from 'stores/payment-mode/types';
import {fetchPaymentModes} from 'stores/payment-mode/actions';
import {loadingSelector, modesSelector} from 'stores/payment-mode/selectors';

const mapStateToProps = state => ({
  formValues: getFormValues(PAYMENT_MODES_FORM)(state) || {},
  paymentModes: modesSelector(state),
  ...commonSelector(state),
  ...loadingSelector(state),
  ...permissionSelector({name: routes.PAYMENT_MODES})
});

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
