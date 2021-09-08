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
      loading: {getCustomizeLoading, customizeLoading}
    },
    paymentModes: {modes}
  } = state;

  let isLoading =
    getCustomizeLoading ||
    customizes === null ||
    typeof customizes === 'undefined';

  return {
    paymentModes: modes,
    formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
    customizes,
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: !isLoading
      ? {
          ...customizes,
          payment_auto_generate:
            customizes.payment_auto_generate === 'YES' ||
            customizes.payment_auto_generate === 1
        }
      : null
  };
};

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(mapStateToProps)(
  CustomizePaymentForm
);

CustomizePaymentContainer.navigationOptions = () => ({
  header: null
});
