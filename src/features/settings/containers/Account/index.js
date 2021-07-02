import React from 'react';
import { connect } from 'react-redux';
import { Account } from '../../components/Account';
import { reduxForm } from 'redux-form';
import { EDIT_ACCOUNT } from '../../constants';
import * as AccountAction from '../../actions';
import { validate } from './validation';
import { PermissionService } from '@/services';

const mapStateToProps = (state, { navigation }) => {
    const {
        settings: {
            loading: { getAccountInfoLoading, editAccountInfoLoading },
            account
        },
        global: { locale, theme }
    } = state;

    let isLoading = getAccountInfoLoading || !account;
    const isAllowToEdit = PermissionService.isAllowToManage(
        navigation?.state?.routeName
    );

    return {
        isLoading,
        editAccountLoading: editAccountInfoLoading,
        locale,
        theme,
        isAllowToEdit,
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

//  Redux Forms
const AccountReduxForm = reduxForm({
    form: EDIT_ACCOUNT,
    validate
})(Account);

//  connect
const AccountContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountReduxForm);

AccountContainer.navigationOptions = () => ({
    header: null
});

export default AccountContainer;
