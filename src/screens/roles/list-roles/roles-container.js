import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Roles from './roles';
import {ROLES_FORM} from 'stores/roles/types';
import {rolesSelector} from 'stores/roles/selectors';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
  roles: rolesSelector(state),
  ...commonSelector(state)
});

const RolesForm = reduxForm({form: ROLES_FORM})(Roles);

export const RolesContainer = connect(mapStateToProps)(RolesForm);
