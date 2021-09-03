import {connect} from 'react-redux';
import {getFormValues, reduxForm} from 'redux-form';
import ItemUnits from './item-units';
import {CREATE_USER_FORM} from 'stores/item-units/types';
import {validate} from 'stores/item-units/validator';
import {commonSelector, permissionSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {navigation}) => {
  const {
    users: {loading},
    roles: {roles}
  } = state;
  const user = navigation.getParam('user', {});
  return {
    roles,
    loading: loading?.userLoading,
    userId: user?.id,
    ...commonSelector(state),
    ...permissionSelector(navigation),
    formValues: getFormValues(CREATE_USER_FORM)(state) || {},
    initialValues: {
      name: null,
      email: null,
      password: null,
      phone: null,
      role: null
    }
  };
};

const mapDispatchToProps = {};

const ItemUnitsForm = reduxForm({form: CREATE_USER_FORM, validate})(ItemUnits);

export const ItemUnitsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemUnitsForm);

ItemUnitsContainer.navigationOptions = () => ({
  header: null
});
