import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateUser from './create-user';
import {CREATE_USER_FORM} from 'stores/users/types';
import {validate} from 'stores/users/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {fetchRoles} from 'stores/roles/actions';

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

const mapDispatchToProps = {
  fetchRoles
};

const CreateUserForm = reduxForm({form: CREATE_USER_FORM, validate})(
  CreateUser
);

export const CreateUserContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserForm);

CreateUserContainer.navigationOptions = () => ({
  header: null
});
