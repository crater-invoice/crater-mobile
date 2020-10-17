import { connect } from "react-redux";
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import { Login } from "../../components/Login"; //imports the feature's login component.
import * as AuthAction from '../../actions';
import { LOGIN_FORM } from "../../constants";

const mapStateToProps = ({
    auth,
    global,
    settings: { account }

}) => ({
    loading: auth.loading && auth.loading.loginLoading,
    socialLoading: auth.loading && auth.loading.socialLoginLoading,
    locale: global?.locale,
    initialValues: {
        username: (typeof account !== 'undefined' && account !== null) ? account.email ? account.email : '' : '',
    }
});

const mapDispatchToProps = {
    login: AuthAction.login,
    socialLogin: AuthAction.socialLogin,
};

//  Redux Forms
const loginReduxForm = reduxForm({
    form: LOGIN_FORM,
    validate,
})(Login);

// Connects the login-component.
const LoginContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(loginReduxForm);

LoginContainer.navigationOptions = {
    header: null,
};

export default LoginContainer;

