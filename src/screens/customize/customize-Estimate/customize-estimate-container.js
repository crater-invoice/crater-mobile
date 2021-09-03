import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CustomizeEstimate from './customize-estimate';
import {CREATE_USER_FORM} from 'stores/customize/types';
import {validate} from 'stores/customize/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    users: {loading},
    roles: {roles}
  } = state;
  const user = navigation.getParam('user', {});
  return {
    roles,
    loading: loading?.userLoading,
    userId: user?.id,
    ...commonSelector(state),
    ...permissionSelector(navigation),
    formValues: getFormValues(CREATE_USER_FORM)(state) || {},
    initialValues: {
      name: null,
      email: null,
      password: null,
      phone: null,
      role: null
    }
  };
};

const mapDispatchToProps = {};

const CustomizeEstimateForm = reduxForm({form: CREATE_USER_FORM, validate})(
  CustomizeEstimate
);

export const CustomizeEstimateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomizeEstimateForm);

CustomizeEstimateContainer.navigationOptions = () => ({
  header: null
});
