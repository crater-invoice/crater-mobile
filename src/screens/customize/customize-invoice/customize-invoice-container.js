import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeInvoice from './customize-invoice';
import {CUSTOMIZE_INVOICE_FORM} from 'stores/customize/types';
import {customizeInvoiceValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {routes}) => {
  const {
    customizes: {
      customFields,
      loading: {customizeLoading}
    }
  } = state;

  return {
    formValues: getFormValues(CUSTOMIZE_INVOICE_FORM)(state) || {},
    customFields,
    loading: customizeLoading,
    ...commonSelector(state)
  };
};

const CustomizeInvoiceForm = reduxForm({
  form: CUSTOMIZE_INVOICE_FORM,
  validate: customizeInvoiceValidate
})(CustomizeInvoice);

export const CustomizeInvoiceContainer = connect(mapStateToProps)(
  CustomizeInvoiceForm
);
