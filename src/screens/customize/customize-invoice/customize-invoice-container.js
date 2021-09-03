import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeInvoice from './customize-invoice';
import {CUSTOMIZE_INVOICE_FORM} from 'stores/customize/types';
import {customizeInvoiceValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';
import * as customizeAction from 'stores/customize/actions';

const mapStateToProps = (state, {navigation}) => {
  const {
    settings: {
      customizes,
      customFields,
      loading: {getCustomizeLoading, customizeLoading}
    }
  } = state;

  let isLoading =
    getCustomizeLoading ||
    customizes === null ||
    typeof customizes === 'undefined';

  return {
    formValues: getFormValues(CUSTOMIZE_INVOICE_FORM)(state) || {},
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

const CustomizeInvoiceForm = reduxForm({
  form: CUSTOMIZE_INVOICE_FORM,
  customizeInvoiceValidate
})(CustomizeInvoice);

export const CustomizeInvoiceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeInvoiceForm);

CustomizeInvoiceContainer.navigationOptions = () => ({
  header: null
});
