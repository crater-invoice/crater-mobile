import {connect} from 'react-redux';
import {ForgotPassword} from '../../components/ForgotPassword';
import {validate} from './validation';
import {reduxForm} from 'redux-form';
import * as AuthAction from '../../actions';
import {FORGOT_PASSWORD_FORM} from '../../constants';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = state => ({
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

export default ForgotPasswordContainer;
