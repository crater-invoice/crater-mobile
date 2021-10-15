import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizePayment from './customize-payment';
import {CUSTOMIZE_PAYMENT_FORM} from 'stores/customize/types';
import {customizePaymentValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';
import {
  loadingSelector,
  customFieldsSelector
} from 'stores/customize/selectors';

const mapStateToProps = (state, {routes}) => ({
  ...commonSelector(state),
  formValues: getFormValues(CUSTOMIZE_PAYMENT_FORM)(state) || {},
  customFields: customFieldsSelector(state),
  isSaving: loadingSelector(state)
});

const CustomizePaymentForm = reduxForm({
  form: CUSTOMIZE_PAYMENT_FORM,
  validate: customizePaymentValidate
})(CustomizePayment);

export const CustomizePaymentContainer = connect(mapStateToProps)(
  CustomizePaymentForm
);
