import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Roles from './roles';
import {ROLES_FORM} from 'modules/roles/constants';
import {rolesSelector} from 'modules/roles/selectors';
import {commonSelector} from 'modules/common/selectors';

const mapStateToProps = state => ({
  roles: rolesSelector(state.roles?.roles),
  ...state.roles.loading,
  ...commonSelector(state)
});

const RolesForm = reduxForm({
  form: ROLES_FORM
})(Roles);

const RolesContainer: any = connect(mapStateToProps)(RolesForm);

RolesContainer.navigationOptions = () => ({
  header: null
});

export default RolesContainer;
