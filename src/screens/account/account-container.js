import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import Account from './account';
import {validate} from 'stores/user/validator';
import {commonSelector} from 'stores/common/selectors';
import {loadingSelector} from 'stores/user/selectors';
import {ACCOUNT_FORM} from 'stores/user/types';
import {languagesSelector} from 'stores/company/selectors';

const mapStateToProps = state => ({
  ...commonSelector(state),
  languages: languagesSelector(state),
  isSaving: loadingSelector(state),
  initialValues: {
    name: null,
    email: null,
    avatar: null,
    password: null,
    confirmPassword: null
  }
});

const AccountForm = reduxForm({form: ACCOUNT_FORM, validate})(Account);

export default connect(mapStateToProps)(AccountForm);
