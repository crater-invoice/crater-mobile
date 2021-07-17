import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Roles from './roles';
import {ROLES_FORM} from 'modules/roles/constants';
import {rolesSelector} from 'modules/roles/selectors';

const mapStateToProps = ({roles, global}) => ({
  roles: rolesSelector(roles?.roles),
  locale: global?.locale,
  ...roles.loading
});

const RolesForm = reduxForm({
  form: ROLES_FORM
})(Roles);

const RolesContainer: any = connect(mapStateToProps)(RolesForm);

RolesContainer.navigationOptions = () => ({
  header: null
});

export default RolesContainer;
