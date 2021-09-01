import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import {groupBy} from 'lodash';
import CreateUser from './create-user';
import {USER_CREATE_FORM} from 'stores/users/types';
import {validateUser} from 'stores/users/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {fetchRoles} from 'stores/roles/actions';

const mapStateToProps = (state, {navigation}) => {
  const {
    users: {permissions, loading},
    roles: 
    {roles}
  } = state;
  const user = navigation.getParam('user', {});
  return {
    permissions,
    loading: loading?.userLoading,
    userId: user?.id,
    ...commonSelector(state),
    ...permissionSelector(navigation),
    fetchRoles,
    formValues: getFormValues(USER_CREATE_FORM)(state) || {},
    roles,
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

const CreateUserForm = reduxForm({
  form: USER_CREATE_FORM,
  validate: validateUser
})(CreateUser);

export const CreateUserContainer: any = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateUserForm);

CreateUserContainer.navigationOptions = () => ({
  header: null
});

