import { connect } from 'react-redux';
import { ForgotPassword } from '../../components/ForgotPassword';
import { validate } from './validation';
import { reduxForm } from 'redux-form';
import * as AuthAction from '../../actions';
import { FORGOT_PASSWORD_FORM } from '../../constants';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = state => ({
    loading: state.auth.loading.forgetPasswordLoading,
    validation: true,
    ...commonSelector(state)
});

const mapDispatchToProps = {
    sendForgotPasswordMail: AuthAction.sendForgotPasswordMail
};

const forgotPasswordReduxForm = reduxForm({
    form: FORGOT_PASSWORD_FORM,
    validate
})(ForgotPassword);

const ForgotPasswordContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(forgotPasswordReduxForm);

ForgotPasswordContainer.navigationOptions = {
    header: null
};

export default ForgotPasswordContainer;
