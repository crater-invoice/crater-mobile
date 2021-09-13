import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeInvoice from './customize-invoice';
import {CUSTOMIZE_INVOICE_FORM} from 'stores/customize/types';
import {customizeInvoiceValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    customizes: {
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

const CustomizeInvoiceForm = reduxForm({
  form: CUSTOMIZE_INVOICE_FORM,
  validate: customizeInvoiceValidate
})(CustomizeInvoice);

export const CustomizeInvoiceContainer = connect(mapStateToProps)(
  CustomizeInvoiceForm
);
