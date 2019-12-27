import React from 'react';
import { connect } from 'react-redux';
import { Estimate } from '../../components/Estimate';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as EstimatesAction from '../../actions';
import { ESTIMATE_FORM, ESTIMATE_EDIT } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        estimates: { loading, estimateItems, estimateData, items },
        customers: { customers },
    } = state;

    const {
        estimate = null,
        nextEstimateNumber,
        nextEstimateNumberAttribute,
        estimateTemplates
    } = estimateData;

    let type = navigation.getParam('type')

    let isLoading = loading.initEstimateLoading || (type === ESTIMATE_EDIT && !estimate)
        || !nextEstimateNumber

    return {
        initLoading: isLoading,
        loading: loading.estimateLoading,
        estimateItems,
        estimateData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        language,
        formValues: getFormValues(ESTIMATE_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            expiry_date: moment().add(7, 'days'),
            estimate_date: moment(),
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            estimate_template_id: estimateTemplates[0] && estimateTemplates[0].id,
            ...estimate,
            estimate_number: nextEstimateNumberAttribute || nextEstimateNumber,
            customer: estimate && estimate.user,
            template: estimate && estimate.estimate_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateEstimate: EstimatesAction.getCreateEstimate,
    createEstimate: EstimatesAction.createEstimate,
    getItems: EstimatesAction.getItems,
    getEditEstimate: EstimatesAction.getEditEstimate,
    editEstimate: EstimatesAction.editEstimate,
    removeEstimateItems: EstimatesAction.removeEstimateItems,
    removeEstimate: EstimatesAction.removeEstimate,
    convertToInvoice: EstimatesAction.convertToInvoice,
    clearEstimate: EstimatesAction.clearEstimate,
    convertToInvoice: EstimatesAction.convertToInvoice,
    changeEstimateStatus: EstimatesAction.changeEstimateStatus,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const addEstimateReduxForm = reduxForm({
    form: ESTIMATE_FORM,
    validate,
})(Estimate);

//  connect
const EstimateContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addEstimateReduxForm);

EstimateContainer.navigationOptions = () => ({
    header: null,
});

export default EstimateContainer;
