import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeEstimate from './customize-estimate';
import {CUSTOMIZE_ESTIMATE_FORM} from 'stores/customize/types';
import {customizeEstimateValidate} from 'stores/customize/validator';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {routes}) => {
  const {
    customizes: {
      customFields,
      loading: {customizeLoading}
    }
  } = state;

  return {
    formValues: getFormValues(CUSTOMIZE_ESTIMATE_FORM)(state) || {},
    customFields,
    loading: customizeLoading,
    ...commonSelector(state)
  };
};

const CustomizeEstimateForm = reduxForm({
  form: CUSTOMIZE_ESTIMATE_FORM,
  validate: customizeEstimateValidate
})(CustomizeEstimate);

export const CustomizeEstimateContainer = connect(mapStateToProps)(
  CustomizeEstimateForm
);
