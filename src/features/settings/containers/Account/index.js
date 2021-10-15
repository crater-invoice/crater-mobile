import {connect} from 'react-redux';
import {Account} from '../../components/Account';
import {reduxForm} from 'redux-form';
import {EDIT_ACCOUNT} from '../../constants';
import * as AccountAction from '../../actions';
import {validate} from './validation';
import {commonSelector} from 'stores/common/selectors';

const mapStateToProps = (state, {route}) => {
  const {
    settings: {
      loading: {getAccountInfoLoading, editAccountInfoLoading},
      account
    }
  } = state;
  let isLoading = getAccountInfoLoading || !account;
  return {
    isLoading,
    editAccountLoading: editAccountInfoLoading,
    isAllowToEdit: true,
    ...commonSelector(state),
    initialValues: !isLoading
      ? {
          name: account?.name,
          email: account?.email
        }
      : null
  };
};

const mapDispatchToProps = {
  editAccount: AccountAction.editAccount,
  getAccount: AccountAction.getAccountInformation,
  editAccount: AccountAction.editAccountInformation
};

const AccountReduxForm = reduxForm({
  form: EDIT_ACCOUNT,
  validate
})(Account);

const AccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountReduxForm);

export default AccountContainer;
