import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Users from './users';
import {USERS_FORM} from 'stores/users/types';
import {usersSelector} from 'stores/users/selectors';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  users: usersSelector(state),
  ...commonSelector(state)
});

const UsersForm = reduxForm({form: USERS_FORM})(Users);

export const UsersContainer: any = connect(mapStateToProps)(UsersForm);
