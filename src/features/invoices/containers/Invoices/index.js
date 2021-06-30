import React from 'react';
import { connect } from 'react-redux';
import { Invoices } from '../../components/Invoices';
import { reduxForm, getFormValues } from 'redux-form';
import * as InvoicesAction from '../../actions';
import { INVOICE_SEARCH } from '../../constants';
import { getCustomers } from '../../../customers/actions';
import {
    getDueInvoicesState,
    getDraftInvoicesState,
    getAllInvoicesState
} from '../../selectors';

const mapStateToProps = state => {
    const {
        global: { locale, theme },
        customers: { customers },
        invoices: {
            invoices,
            loading: { invoicesLoading }
        }
    } = state;

    return {
        invoices,
        dueInvoices: getDueInvoicesState({ invoices, theme }),
        draftInvoices: getDraftInvoicesState({ invoices, theme }),
        allInvoices: getAllInvoicesState({ invoices, theme }),
        loading: invoicesLoading,
        locale,
        theme,
        customers,
        formValues: getFormValues(INVOICE_SEARCH)(state) || {}
    };
};

const mapDispatchToProps = {
    getInvoices: InvoicesAction.getInvoices,
    getCustomers: getCustomers
};

//  Redux Forms
const invoiceSearchReduxForm = reduxForm({
    form: INVOICE_SEARCH
})(Invoices);

//  connect
const InvoicesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(invoiceSearchReduxForm);

InvoicesContainer.navigationOptions = ({ navigation }) => ({
    gesturesEnabled: false
});

export default InvoicesContainer;
