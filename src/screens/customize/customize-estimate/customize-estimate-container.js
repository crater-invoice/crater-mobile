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
      loading: {fetchCustomizeLoading, customizeLoading}
    }
  } = state;

  let isLoading =
    fetchCustomizeLoading ||
    customizes === null ||
    typeof customizes === 'undefined';

  return {
    formValues: getFormValues(CUSTOMIZE_ESTIMATE_FORM)(state) || {},
    customFields,
    isLoading,
    loading: customizeLoading,
    ...commonSelector(state),
    initialValues: {
      ...customizes,
      set_expiry_date_automatically:
        customizes?.set_expiry_date_automatically === 'YES' ||
        customizes?.set_expiry_date_automatically == 1,
      estimate_email_attachment:
        customizes?.estimate_email_attachment === 'YES' ||
        customizes?.estimate_email_attachment == 1,
      estimate_auto_generate:
        customizes?.estimate_auto_generate === 'YES' ||
        customizes?.estimate_auto_generate == 1
    }
  };
};

const CustomizeEstimateForm = reduxForm({
  form: CUSTOMIZE_ESTIMATE_FORM,
  validate: customizeEstimateValidate
})(CustomizeEstimate);

export const CustomizeEstimateContainer = connect(mapStateToProps)(
  CustomizeEstimateForm
);

CustomizeEstimateContainer.navigationOptions = () => ({
  header: null
});
