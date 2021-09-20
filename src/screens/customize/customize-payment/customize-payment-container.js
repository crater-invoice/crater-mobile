import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizePayment from './customize-payment';
import {CUSTOMIZE_PAYMENT_FORM} from 'stores/customize/types';
import {customizePaymentValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    customizes: {
      customizes,
      customFields,
      loading: {fetchCustomizeLoading, customizeLoading}
    },
    paymentModes: {modes}
  } = state;

  let isLoading =
    fetchCustomizeLoading ||
    customizes === null ||
    typeof customizes === 'undefined';

  return {
    paymentModes: modes,
    formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: {
      ...customizes,
      payment_auto_generate:
        customizes?.payment_auto_generate === 'YES' ||
        customizes?.payment_auto_generate == 1,
      payment_email_attachment:
        customizes?.payment_email_attachment === 'YES' ||
        customizes?.payment_email_attachment == 1
    }
  };
};

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  validate: customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(mapStateToProps)(
  CustomizePaymentForm
);
