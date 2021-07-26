import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {groupBy} from 'lodash';
import Role from './role';
import {ROLE_FORM} from 'modules/roles/constants';
import {validateRole} from 'modules/roles/validator';
import {commonSelector, permissionSelector} from 'modules/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    roles: {permissions, loading}
  } = state;
  const role = navigation.getParam('role', {});
  return {
    permissions,
    formattedPermissions: groupBy(permissions ?? [], 'modelName'),
    loading: loading?.roleLoading,
    roleId: role?.id,
    ...commonSelector(state),
    ...permissionSelector(navigation),
    initialValues: {
      name: ''
    }
  };
};

const RoleForm = reduxForm({
  form: ROLE_FORM,
  validate: validateRole
})(Role);

const RoleContainer: any = connect(mapStateToProps)(RoleForm);

RoleContainer.navigationOptions = () => ({
  header: null
});

export default RoleContainer;
