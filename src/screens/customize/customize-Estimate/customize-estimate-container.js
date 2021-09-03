import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeEstimate from './customize-estimate';
import {CUSTOMIZE_ESTIMATE_FORM} from 'stores/customize/types';
import {customizeEstimateValidate} from 'stores/customize/validator';
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

const mapDispatchToProps = {
  getCustomizeSettings: customizeAction.getCustomizeSettings,
  setCustomizeSettings: customizeAction.setCustomizeSettings,
  editCustomizeSettings: customizeAction.editCustomizeSettings,
  editSettingItem: customizeAction.editSettingItem
};

const CustomizeEstimateForm = reduxForm({
  form: CUSTOMIZE_ESTIMATE_FORM,
  customizeEstimateValidate
})(CustomizeEstimate);

export const CustomizeEstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeEstimateForm);

CustomizeEstimateContainer.navigationOptions = () => ({
  header: null
});
