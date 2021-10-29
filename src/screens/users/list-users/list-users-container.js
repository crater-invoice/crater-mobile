import {connect} from 'react-redux';
import {reduxForm, getFormValues} from 'redux-form';
import Users from './list-users';
import {USERS_FORM} from 'stores/users/types';
import {rolesSelector, usersSelector} from 'stores/users/selectors';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  roles: rolesSelector(state),
  users: usersSelector(state),
  formValues: getFormValues(USERS_FORM)(state) || {},
  ...commonSelector(state)
});

const UsersForm = reduxForm({form: USERS_FORM})(Users);

export const UsersContainer: any = connect(mapStateToProps)(UsersForm);
