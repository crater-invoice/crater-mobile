import { connect } from 'react-redux';
import { Account } from '../../components/Account';
import { reduxForm } from 'redux-form';
import { EDIT_ACCOUNT } from '../../constants';
import * as AccountAction from '../../actions';
import { validate } from './validation';
import { PermissionService } from '@/services';
import { commonSelector } from 'modules/common/selectors';

const mapStateToProps = (state, { navigation }) => {
    const {
        settings: {
            loading: { getAccountInfoLoading, editAccountInfoLoading },
            account
        }
    } = state;

    let isLoading = getAccountInfoLoading || !account;
    const isAllowToEdit = PermissionService.isAllowToManage(
        navigation?.state?.routeName
    );

    return {
        isLoading,
        editAccountLoading: editAccountInfoLoading,
        isAllowToEdit,
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

AccountContainer.navigationOptions = () => ({
    header: null
});

export default AccountContainer;
