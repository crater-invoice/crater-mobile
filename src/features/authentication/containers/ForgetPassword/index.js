import { connect } from 'react-redux';
import { ForgotPassword } from '../../components/ForgotPassword';
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import * as AuthAction from '../../actions';
import { FORGOT_PASSWORD_FORM } from '../../constants';

const mapStateToProps = ({ auth, global }) => ({
    loading: auth.loading.forgetPasswordLoading,
    validation: true,
    locale: global?.locale,
});

const mapDispatchToProps = {
    sendForgotPasswordMail: AuthAction.sendForgotPasswordMail,
};

//  Redux Forms
const forgotPasswordReduxForm = reduxForm({
    form: FORGOT_PASSWORD_FORM,
    validate,
})(ForgotPassword);

//  connect
const ForgotPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(forgotPasswordReduxForm);

ForgotPasswordContainer.navigationOptions = {
    header: null,
};

export default ForgotPasswordContainer;
