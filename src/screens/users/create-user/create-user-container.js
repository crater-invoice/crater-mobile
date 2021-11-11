import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import CreateUser from './create-user';
import {CREATE_USER_FORM} from 'stores/users/types';
import {validate} from 'stores/users/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';
import {fetchRoles} from 'stores/role/actions';
import {rolesSelector, loadingSelector} from 'stores/users/selectors';

const mapStateToProps = (state, {route}) => ({
  roles: rolesSelector(state),
  ...loadingSelector(state),
  ...commonSelector(state),
  ...permissionSelector(route),
  formValues: getFormValues(CREATE_USER_FORM)(state) || {},
  initialValues: {
    name: null,
    email: null,
    password: null,
    phone: null,
    role: null
  }
});

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
