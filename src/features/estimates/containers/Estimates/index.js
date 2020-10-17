import React from 'react';
import { connect } from 'react-redux';
import { Estimates } from '../../components/Estimates';
import { reduxForm, getFormValues } from 'redux-form';
import * as EstimatesAction from '../../actions';
import { ESTIMATE_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';
import {
    getDraftEstimatesState,
    getSentEstimatesState,
    getAllEstimatesState
} from '../../selectors';

const mapStateToProps = (state) => {

    const {
        global: { locale },
        estimates: {
            estimates,
            loading: { estimatesLoading }
        },
        customers: { customers },
    } = state;

    return {
        estimates,
        draftEstimates: getDraftEstimatesState(estimates ?? []),
        sentEstimates: getSentEstimatesState(estimates ?? []),
        allEstimates: getAllEstimatesState(estimates ?? []),
        customers,
        loading: estimatesLoading,
        locale,
        formValues: getFormValues(ESTIMATE_SEARCH)(state) || {},
    };
};

const mapDispatchToProps = {
    getEstimates: EstimatesAction.getEstimates,
    clearEstimates: EstimatesAction.clearEstimates,
    getCustomers: getCustomers
};

//  Redux Forms
const estimateSearchReduxForm = reduxForm({
    form: ESTIMATE_SEARCH,
})(Estimates);

//  connect
const EstimatesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(estimateSearchReduxForm);

EstimatesContainer.navigationOptions = (props) => ({
    header: null,
});

export default EstimatesContainer;
