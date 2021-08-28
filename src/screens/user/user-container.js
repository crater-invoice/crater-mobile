import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import { groupBy } from 'lodash';
import User from './user';
import { USER_FORM } from 'modules/users/constants';
import { validateUser } from 'modules/users/validator';
import { commonSelector, permissionSelector } from 'modules/common/selectors';
import * as actions from 'modules/users/actions';
import { fetchRoles } from '@/modules/roles/actions';
const mapStateToProps = (state, { navigation }) => {
    const {
        users: { permissions, loading },
        roles: { roles }
    } = state;
    const user = navigation.getParam('user', {});
    return {
        permissions,
        formattedPermissions: groupBy(permissions ?? [], 'modelName'),
        loading: loading?.userLoading,
        userId: user?.id,
        ...commonSelector(state),
        ...permissionSelector(navigation),
        fetchRoles,
        formValues: getFormValues(USER_FORM)(state) || {},
        roles,
        initialValues: {
            user: {
                name: null,
                email: null,
                password: null,
                phone: null,
                role: null
            }
        }
    };
};

const mapDispatchToProps = {
    ...actions,
    fetchRoles
};

const UserForm = reduxForm({
    form: USER_FORM,
    validate: validateUser
})(User);

const UserContainer: any = connect(
    mapStateToProps,
    mapDispatchToProps
)(UserForm);

UserContainer.navigationOptions = () => ({
    header: null
});

export default UserContainer;
