import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import ForgotPassword from './forgot-password';
import {commonSelector} from 'stores/common/selectors';
import {FORGOT_PASSWORD_FORM} from 'stores/auth/types';
import {forgotPasswordValidator as validate} from 'stores/auth/validator';

const mapStateToProps = state => commonSelector(state);

const ForgotPasswordForm = reduxForm({form: FORGOT_PASSWORD_FORM, validate})(
  ForgotPassword
);

export const ForgotPasswordContainer = connect(mapStateToProps)(
  ForgotPasswordForm
);
