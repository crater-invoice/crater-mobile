import {connect} from 'react-redux';
import {validate} from './validation';
import {reduxForm} from 'redux-form';
import {Login} from '../../components/Login';
import * as action from '../../actions';
import {LOGIN_FORM} from '../../constants';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => {
  const {auth, common, settings} = state;
  return {
    loading: auth?.loading?.loginLoading,
    socialLoading: auth?.loading?.socialLoginLoading,
    biometryAuthType: common?.biometryAuthType,
    ...commonSelector(state),
    initialValues: {
      // username: settings?.account?.email ?? '',
      // password: ''
      username: 'admin@craterapp.com',
      password: 'crater@123'
    }
  };
};

const mapDispatchToProps = {
  login: action.login,
  biometryAuthLogin: action.biometryAuthLogin
};

const loginReduxForm = reduxForm({
  form: LOGIN_FORM,
  validate
})(Login);

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(loginReduxForm);

export default LoginContainer;
