import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import * as InvoicesAction from '../../actions';
import { RECURRING_INVOICES_FORM } from '../../constants';
import { getCustomers } from '../../../customers/actions';
import { RecurringInvoices } from '../../components/RecurringInvoices';
import {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState
} from '../../selectors';

const mapStateToProps = (state) => {

    const {
        global: { language },
        customers: { customers },
        invoices: {
            invoices,
            loading: { invoicesLoading }
        }
    } = state;

    return {
        invoices,
        dueInvoices: getDueInvoicesState(invoices ?? []),
        draftInvoices: getDraftInvoicesState(invoices ?? []),
        allInvoices: getAllInvoicesState(invoices ?? []),
        loading: invoicesLoading,
        language,
        customers,
        formValues: getFormValues(RECURRING_INVOICES_FORM)(state) || {},

    };
};

const mapDispatchToProps = {
    getRecurringInvoices: InvoicesAction.getRecurringInvoices,
    getCustomers: getCustomers
};

//  Redux Forms
const recurringInvoicesForm = reduxForm({
    form: RECURRING_INVOICES_FORM,
})(RecurringInvoices);

//  connect
const RecurringInvoicesContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recurringInvoicesForm);

RecurringInvoicesContainer.navigationOptions = () => ({
    header: null,
});

export default RecurringInvoicesContainer

