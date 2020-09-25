import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Reports } from '../../components/Reports';
import { colors } from '../../../../styles/colors';
import { reduxForm } from 'redux-form';
import { REPORTS_SEARCH } from '../../constants';

const mapStateToProps = ({ global }) => ({
    language: global.language
});

const mapDispatchToProps = {
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
