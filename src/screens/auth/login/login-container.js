import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Constants from 'expo-constants';
import Login from './login';
import {commonSelector} from 'stores/common/selectors';
import {LOGIN_FORM} from 'stores/auth/types';
import {loginValidator as validate} from 'stores/auth/validator';
import {
  biometryTypeSelector,
  currentUserEmailSelector
} from 'stores/auth/selectors';

const mapStateToProps = state => ({
  biometryAuthType: biometryTypeSelector(state),
  ...commonSelector(state),
  initialValues: {
    username: currentUserEmailSelector(state),
    password: '',
    device_name: Constants.deviceName
  }
});

const LoginForm = reduxForm({form: LOGIN_FORM, validate})(Login);

export const LoginContainer = connect(mapStateToProps)(LoginForm);
