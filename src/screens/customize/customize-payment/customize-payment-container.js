import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizePayment from './customize-payment';
import {CUSTOMIZE_PAYMENT_FORM} from 'stores/customize/types';
import {customizePaymentValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {routes}) => {
  const {
    customizes: {
      loading: {customizeLoading}
    },
    settings: {customFields}
  } = state;

  return {
    ...commonSelector(state),
    formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
    loading: customizeLoading,
    customFields
  };
};

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  validate: customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(mapStateToProps)(
  CustomizePaymentForm
);
