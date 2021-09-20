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
      loading: {fetchCustomizeLoading, customizeLoading}
    }
  } = state;

  let isLoading =
    fetchCustomizeLoading ||
    customizes === null ||
    typeof customizes === 'undefined';

  return {
    formValues: getFormValues(CUSTOMIZE_INVOICE_FORM)(state) || {},
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: {
      ...customizes,
      invoice_auto_generate:
        customizes?.invoice_auto_generate === 'YES' ||
        customizes?.invoice_auto_generate == 1,
      set_due_date_automatically:
        customizes?.set_due_date_automatically === 'YES' ||
        customizes?.set_due_date_automatically == 1,
      invoice_email_attachment:
        customizes?.invoice_email_attachment === 'YES' ||
        customizes?.invoice_email_attachment == 1
    }
  };
};

const CustomizeInvoiceForm = reduxForm({
  form: CUSTOMIZE_INVOICE_FORM,
  validate: customizeInvoiceValidate
})(CustomizeInvoice);

export const CustomizeInvoiceContainer = connect(mapStateToProps)(
  CustomizeInvoiceForm
);
