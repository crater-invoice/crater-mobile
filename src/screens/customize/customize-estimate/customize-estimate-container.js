import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeEstimate from './customize-estimate';
import {CUSTOMIZE_ESTIMATE_FORM} from 'stores/customize/types';
import {customizeEstimateValidate} from 'stores/customize/validator';
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
    formValues: getFormValues(CUSTOMIZE_ESTIMATE_FORM)(state) || {},
    customizes,
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: !isLoading
      ? {
          ...customizes,
          estimate_auto_generate:
            customizes.estimate_auto_generate === 'YES' ||
            customizes.estimate_auto_generate === 1
        }
      : null
  };
};

const CustomizeEstimateForm = reduxForm({
  form: CUSTOMIZE_ESTIMATE_FORM,
  validate: customizeEstimateValidate
})(CustomizeEstimate);

export const CustomizeEstimateContainer = connect(mapStateToProps)(
  CustomizeEstimateForm
);
