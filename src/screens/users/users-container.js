import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import Users from './users';
import { USERS_FORM } from 'modules/users/constants';
import { usersSelector } from 'modules/users/selectors';

const mapStateToProps = ({ users, global }) => ({
    users: usersSelector(users.users),
    locale: global?.locale,
    ...users.loading
});

const UsersForm = reduxForm({
    form: USERS_FORM
})(Users);

const UsersContainer: any = connect(mapStateToProps)(UsersForm);

UsersContainer.navigationOptions = () => ({
    header: null
});

export default UsersContainer;
