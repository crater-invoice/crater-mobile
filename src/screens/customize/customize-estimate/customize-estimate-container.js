import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeEstimate from './customize-estimate';
import {CUSTOMIZE_ESTIMATE_FORM} from 'stores/customize/types';
import {customizeEstimateValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';
import {
  loadingSelector,
  customFieldsSelector
} from 'stores/customize/selectors';

const mapStateToProps = (state, {routes}) => ({
  formValues: getFormValues(CUSTOMIZE_ESTIMATE_FORM)(state) || {},
  customFields: customFieldsSelector(state),
  isSaving: loadingSelector(state),
  ...commonSelector(state)
});

const CustomizeEstimateForm = reduxForm({
  form: CUSTOMIZE_ESTIMATE_FORM,
  validate: customizeEstimateValidate
})(CustomizeEstimate);

export const CustomizeEstimateContainer = connect(mapStateToProps)(
  CustomizeEstimateForm
);
