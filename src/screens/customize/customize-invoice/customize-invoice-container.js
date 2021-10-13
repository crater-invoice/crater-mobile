import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeInvoice from './customize-invoice';
import {CUSTOMIZE_INVOICE_FORM} from 'stores/customize/types';
import {customizeInvoiceValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';
import {
  loadingSelector,
  customFieldsSelector
} from 'stores/customize/selectors';

const mapStateToProps = (state, {routes}) => ({
  formValues: getFormValues(CUSTOMIZE_INVOICE_FORM)(state) || {},
  customFields: customFieldsSelector(state),
  isSaving: loadingSelector(state),
  ...commonSelector(state)
});

const CustomizeInvoiceForm = reduxForm({
  form: CUSTOMIZE_INVOICE_FORM,
  validate: customizeInvoiceValidate
})(CustomizeInvoice);

export const CustomizeInvoiceContainer = connect(mapStateToProps)(
  CustomizeInvoiceForm
);
