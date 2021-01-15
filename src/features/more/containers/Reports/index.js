import React from 'react';
import { connect } from 'react-redux';
import { Reports } from '../../components/Reports';
import { colors } from '@/styles';
import { reduxForm } from 'redux-form';
import { REPORTS_SEARCH } from '../../constants';
import * as SettingAction from '../../actions';

const mapStateToProps = ({ more, global }) => ({
    locale: global?.locale
});

const mapDispatchToProps = {
    // logout: SettingAction.logout
};

// Redux Forms
const reportSearchReduxForm = reduxForm({
    form: REPORTS_SEARCH,
})(Reports);

// connect
const SettingContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(reportSearchReduxForm);

SettingContainer.navigationOptions = () => ({
    header: null
});

export default SettingContainer;
