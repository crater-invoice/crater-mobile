import { connect } from 'react-redux';
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import { Login } from '../../components/Login';
import * as AuthAction from '../../actions';
import { LOGIN_FORM } from '../../constants';
import { hasValue } from '@/constants';

const mapStateToProps = ({ auth, global, settings: { account } }) => ({
    loading: auth.loading && auth.loading.loginLoading,
    socialLoading: auth.loading && auth.loading.socialLoginLoading,
    locale: global?.locale,
    initialValues: {
        username: hasValue(account) ? account?.email ?? '' : '',
        password: ''
    }
});

const mapDispatchToProps = {
    login: AuthAction.login
};

//  Redux Forms
const loginReduxForm = reduxForm({
    form: LOGIN_FORM,
    validate
})(Login);

// Connects the login-component.
const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(loginReduxForm);

LoginContainer.navigationOptions = {
    header: null
};

export default LoginContainer;
