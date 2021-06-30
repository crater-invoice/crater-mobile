import React from 'react';
import { connect } from 'react-redux';
import { Estimate } from '../../components/Estimate';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { ESTIMATE_FORM, ESTIMATE_EDIT } from '../../constants';
import moment from 'moment';
import { getTaxes, getNotes } from '@/features/settings/actions';
import { isArray } from '@/constants';
import { getCustomers } from '@/features/customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, taxTypes, currency },
        estimates: { loading, estimateItems, estimateData, items },
        customers: { customers },
        settings: { notes, customFields }
    } = state;

    const {
        estimate = null,
        estimateTemplates,
        estimate_notes = ''
    } = estimateData;

    const type = navigation.getParam('type');
    const id = navigation.getParam('id');
    const isEditScreen = type === ESTIMATE_EDIT;

    const isLoading =
        loading?.initEstimateLoading ||
        (isEditScreen && !estimate) ||
        !isArray(estimateTemplates);

    return {
        initLoading: isLoading,
        loading: loading?.estimateLoading,
        withLoading:
            loading?.changeStatusLoading || loading?.removeEstimateLoading,
        estimateItems,
        estimateData,
        items,
        type,
        notes,
        customers,
        itemsLoading: loading?.itemsLoading,
        locale,
        formValues: getFormValues(ESTIMATE_FORM)(state) || {},
        taxTypes,
        customFields,
        id,
        currency,
        initialValues: !isLoading
            ? {
                  expiry_date: moment().add(7, 'days'),
                  estimate_date: moment(),
                  discount_type: 'fixed',
                  discount: 0,
                  taxes: [],
                  template_name: estimateTemplates?.[0]?.name,
                  notes: estimate_notes,
                  ...estimate,
                  estimate_number: isEditScreen
                      ? estimateData?.nextEstimateNumber
                      : estimateData?.nextNumber,
                  prefix: isEditScreen
                      ? estimateData?.estimatePrefix
                      : estimateData?.prefix,
                  customer: estimate?.user,
                  template: estimate?.estimate_template
              }
            : null
    };
};

const mapDispatchToProps = {
    ...actions,
    getCustomers,
    getTaxes,
    getNotes
};

//  Redux Forms
const addEstimateReduxForm = reduxForm({
    form: ESTIMATE_FORM,
    validate
})(Estimate);

//  connect
const EstimateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addEstimateReduxForm);

EstimateContainer.navigationOptions = () => ({
    header: null
});

export default EstimateContainer;
