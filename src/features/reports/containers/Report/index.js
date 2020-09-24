import React from 'react';
import { connect } from 'react-redux';
import { Report } from '../../components/Report';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as ReportAction from '../../actions';
import { REPORT_FORM, DATE_RANGE } from '../../constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        more: { loading },
        global: { language, company, fiscalYear = '2-1' },
    } = state;

    const type = navigation.getParam('type');

    const isLoading = loading.reportsLoading || !type

    return {
        loading: isLoading,
        formValues: getFormValues(REPORT_FORM)(state) || {},
        language,
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
    generateReport: ReportAction.generateReport,
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
