import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { NOTIFICATION } from '../../constants';
import * as NotificationAction from '../../actions';
import { validate } from './validation';
import { Notification } from '../../components/Notification';

const mapStateToProps = (state) => {
    const {
        global: { language },
        settings: {
            loading: {
                getSettingItemLoading,
                editSettingItemLoading
            }
        },
    } = state

    return {
        language,
        getSettingItemLoading,
        editSettingItemLoading
    };
};


const mapDispatchToProps = {
    getSettingItem: NotificationAction.getSettingItem,
    editSettingItem: NotificationAction.editSettingItem
};

//  Redux Forms
const NotificationReduxForm = reduxForm({
    form: NOTIFICATION,
    validate,
})(Notification);

//  connect
const NotificationContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NotificationReduxForm);

NotificationContainer.navigationOptions = () => ({
    header: null,
});

export default NotificationContainer;
