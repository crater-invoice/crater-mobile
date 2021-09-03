import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizePayment from './customize-payment';
import {CUSTOMIZE_PAYMENT_FORM} from 'stores/customize/types';
import {customizePaymentValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';
import * as customizeAction from 'stores/customize/actions';

const mapStateToProps = (state, {navigation}) => {
  const {
    settings: {
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
    modes,
    formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
    customizes,
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: !isLoading
      ? {
          ...customizes,
          invoice_auto_generate:
            customizes.invoice_auto_generate === 'YES' ||
            customizes.invoice_auto_generate === 1
        }
      : null
  };
};

const mapDispatchToProps = {
  getCustomizeSettings: customizeAction.getCustomizeSettings,
  setCustomizeSettings: customizeAction.setCustomizeSettings,
  editCustomizeSettings: customizeAction.editCustomizeSettings,
  editSettingItem: customizeAction.editSettingItem
};

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizePaymentForm);

CustomizePaymentContainer.navigationOptions = () => ({
  header: null
});
