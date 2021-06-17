import React from 'react';
import { connect } from 'react-redux';
import { Report } from '../../components/Report';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as MoreAction from '../../actions';
import { REPORT_FORM, DATE_RANGE } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        more: { loading },
        global: { locale, company, fiscalYear = '2-1',theme },
    } = state;

    const type = navigation.getParam('type');

    const isLoading = loading.reportsLoading || !type

    return {
        loading: isLoading,
        formValues: getFormValues(REPORT_FORM)(state) || {},
        locale,
        theme,
        type,
        company,
        fiscalYear,
        initialValues: !isLoading && {
            date_range: DATE_RANGE.THIS_MONTH,
            report_type: 'byCustomer'
        },
    };
};

const mapDispatchToProps = {
    generateReport: MoreAction.generateReport,
};

//  Redux Forms
const ReportReduxForm = reduxForm({
    form: REPORT_FORM,
    validate,
})(Report);

//  connect
const ReportContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ReportReduxForm);

ReportContainer.navigationOptions = () => ({
    header: null,
});

export default ReportContainer;
