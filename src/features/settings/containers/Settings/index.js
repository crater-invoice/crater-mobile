import React from 'react';
import { connect } from 'react-redux';
import { Settings } from '../../components/Settings';
import { colors } from '@/styles';
import { reduxForm } from 'redux-form';
import { SETTINGS_SEARCH } from '../../constants';
import * as SettingAction from '../../actions';

const mapStateToProps = ({ settings, global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {
    logout: SettingAction.logout
};

//  Redux Forms
const settingSearchReduxForm = reduxForm({
    form: SETTINGS_SEARCH
})(Settings);

//  connect
const SettingContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(settingSearchReduxForm);

SettingContainer.navigationOptions = () => ({
    header: null
});

export default SettingContainer;
