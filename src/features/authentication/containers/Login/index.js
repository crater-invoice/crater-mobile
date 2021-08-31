import { connect } from 'react-redux';
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import { Login } from '../../components/Login';
import * as action from '../../actions';
import { LOGIN_FORM } from '../../constants';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = state => {
    const { auth, global, settings } = state;
    return {
        loading: auth?.loading?.loginLoading,
        socialLoading: auth?.loading?.socialLoginLoading,
        biometryAuthType: global?.biometryAuthType,
        ...commonSelector(state),
        initialValues: {
            username: settings?.account?.email ?? '',
            password: ''
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

LoginContainer.navigationOptions = {
    header: null
};

export default LoginContainer;
