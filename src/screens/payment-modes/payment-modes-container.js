import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import PaymentModes from './payment-modes';
import {CREATE_USER_FORM} from 'stores/payment-modes/types';
import {validate} from 'stores/payment-modes/validator';
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

const PaymentModesForm = reduxForm({form: CREATE_USER_FORM, validate})(
  PaymentModes
);

export const PaymentModesContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentModesForm);

PaymentModesContainer.navigationOptions = () => ({
  header: null
});
