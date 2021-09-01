import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {groupBy} from 'lodash';
import CreateRole from './create-role';
import {CREATE_ROLE_FORM} from 'modules/roles/constants';
import {validate} from 'modules/roles/validator';
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

const CreateRoleForm = reduxForm({form: CREATE_ROLE_FORM, validate})(
  CreateRole
);

const CreateRoleContainer: any = connect(mapStateToProps)(CreateRoleForm);

CreateRoleContainer.navigationOptions = () => ({
  header: null
});

export default CreateRoleContainer;
