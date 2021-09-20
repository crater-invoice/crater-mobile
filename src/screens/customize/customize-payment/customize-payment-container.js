import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizePayment from './customize-payment';
import {CUSTOMIZE_PAYMENT_FORM} from 'stores/customize/types';
import {customizePaymentValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {routes}) => {
  const {
    customizes: {
      customFields,
      loading: {customizeLoading}
    },
    paymentModes: {modes}
  } = state;

  return {
    paymentModes: modes,
    formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
    customFields,
    loading: customizeLoading,
    ...commonSelector(state)
  };
};

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  validate: customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(mapStateToProps)(
  CustomizePaymentForm
);
