import React from 'react';
import { connect } from 'react-redux';
import { Invoice } from '../../components/Invoice';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as InvoicesAction from '../../actions';
import { INVOICE_FORM, INVOICE_EDIT } from '../../constants';
import moment from 'moment';
import * as CustomersAction from '../../../customers/actions';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { language, taxTypes },
        invoices: { loading, invoiceItems, invoiceData, items },
        customers: { customers, loading: { customersLoading } },
    } = state;

    const {
        invoice = null,
        nextInvoiceNumber,
        invoiceTemplates,
        nextInvoiceNumberAttribute
    } = invoiceData;

    let type = navigation.getParam('type')

    let isLoading = loading.initInvoiceLoading || (type === INVOICE_EDIT && !invoice)
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
        language,
        formValues: getFormValues(INVOICE_FORM)(state) || {},
        taxTypes,
        initialValues: !isLoading ? {
            due_date: moment().add(7, 'days'),
            invoice_date: moment(),
            discount_type: 'fixed',
            discount: 0,
            taxes: [],
            invoice_template_id: invoiceTemplates[0] && invoiceTemplates[0].id,
            ...invoice,
            invoice_number: type === INVOICE_EDIT ? nextInvoiceNumber : nextInvoiceNumberAttribute,
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
const addInvoiceReduxForm = reduxForm({
    form: INVOICE_FORM,
    validate,
})(Invoice);

//  connect
const InvoiceContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(addInvoiceReduxForm);

InvoiceContainer.navigationOptions = () => ({
    header: null,
});

export default InvoiceContainer;
