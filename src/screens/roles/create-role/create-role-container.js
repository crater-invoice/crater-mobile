import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {groupBy} from 'lodash';
import CreateRole from './create-role';
import {CREATE_ROLE_FORM} from 'stores/roles/types';
import {validate} from 'stores/roles/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    roles: {permissions, loading}
  } = state;
  const role = route?.params?.role;

  return {
    permissions,
    formattedPermissions: groupBy(permissions ?? [], 'modelName'),
    loading: loading?.roleLoading,
    roleId: role?.id,
    ...commonSelector(state),
    ...permissionSelector(route),
    initialValues: {
      name: ''
    }
  };
};

const CreateRoleForm = reduxForm({form: CREATE_ROLE_FORM, validate})(
  CreateRole
);

export const CreateRoleContainer: any = connect(mapStateToProps)(
  CreateRoleForm
);
