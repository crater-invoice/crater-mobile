import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as InvoicesAction from '../../actions';
import { RECURRING_FORM, RECURRING_EDIT } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';
import { RecurringInvoice } from '../../components/RecurringInvoice';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, taxTypes },
        invoices: { loading, invoiceItems, invoiceData, items },
        customers: { customers, loading: { customersLoading } },
    } = state;

    const {
        invoice = null,
        nextInvoiceNumber,
        invoiceTemplates,
        terms_and_conditions = null,
        invoice_notes = '',
    } = invoiceData;

    let type = navigation.getParam('type')

    let isLoading = loading.initInvoiceLoading || (type === RECURRING_EDIT && !invoice)
        || !nextInvoiceNumber

    return {
        initLoading: isLoading,
        customersLoading,
        loading: loading.invoiceLoading,
        invoiceItems,
        invoiceData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        locale,
        formValues: getFormValues(RECURRING_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            due_date: moment().add(7, 'days'),
            startOn: moment(),
            neverExpire: true,
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            invoice_template_id: invoiceTemplates[0] && invoiceTemplates[0].id,
            display_terms_and_conditions: false,
            terms_and_conditions,
            notes: invoice_notes,
            ...invoice,
            customer: invoice && invoice.user,
            template: invoice && invoice.invoice_template,
        } : null
    };
};

const mapDispatchToProps = {
    getCreateInvoice: InvoicesAction.getCreateInvoice,
    createInvoice: InvoicesAction.createInvoice,
    getItems: InvoicesAction.getItems,
    getEditInvoice: InvoicesAction.getEditInvoice,
    editInvoice: InvoicesAction.editInvoice,
    removeInvoiceItems: InvoicesAction.removeInvoiceItems,
    removeInvoice: InvoicesAction.removeInvoice,
    clearInvoice: InvoicesAction.clearInvoice,
    changeInvoiceStatus: InvoicesAction.changeInvoiceStatus,
    getCustomers: CustomersAction.getCustomers,
};

//  Redux Forms
const recurringInvoiceForm = reduxForm({
    form: RECURRING_FORM,
    validate,
})(RecurringInvoice);

//  connect
const RecurringInvoiceContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(recurringInvoiceForm);

RecurringInvoiceContainer.navigationOptions = () => ({
    header: null,
});

export default RecurringInvoiceContainer;
