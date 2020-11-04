import React from 'react';
import { connect } from 'react-redux';
import { Invoice } from '../../components/Invoice';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { INVOICE_FORM, INVOICE_EDIT } from '../../constants';
import moment from 'moment';
import { getCustomers } from '@/features/customers/actions';
import { getTaxes } from '@/features/settings/actions';
import { isArray } from '@/constants';

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, taxTypes, currency },
        invoices: { loading, invoiceItems, invoiceData, items },
        customers: { customers }
    } = state;

    const {
        invoice = null,
        invoiceTemplates,
        invoice_notes = ''
    } = invoiceData;

    const type = navigation.getParam('type');
    const id = navigation.getParam('id');
    const isEditScreen = type === INVOICE_EDIT;

    const isLoading =
        loading.initInvoiceLoading ||
        (isEditScreen && !invoice) ||
        !isArray(invoiceTemplates);

    return {
        initLoading: isLoading,
        loading: loading.invoiceLoading,
        invoiceItems,
        invoiceData,
        items,
        type,
        customers,
        itemsLoading: loading.itemsLoading,
        locale,
        formValues: getFormValues(INVOICE_FORM)(state) || {},
        taxTypes,
        currency,
        id,
        initialValues: !isLoading
            ? {
                  due_date: moment().add(7, 'days'),
                  invoice_date: moment(),
                  discount_type: 'fixed',
                  discount: 0,
                  taxes: [],
                  invoice_template_id: invoiceTemplates?.[0]?.id,
                  notes: invoice_notes,
                  ...invoice,
                  invoice_number: isEditScreen
                      ? invoiceData?.nextInvoiceNumber
                      : invoiceData?.nextNumber,
                  prefix: isEditScreen
                      ? invoiceData?.invoicePrefix
                      : invoiceData?.prefix,
                  customer: invoice?.user,
                  template: invoice?.invoice_template
              }
            : null
    };
};

const mapDispatchToProps = {
    ...actions,
    getCustomers,
    getTaxes
};

//  Redux Forms
const addInvoiceReduxForm = reduxForm({
    form: INVOICE_FORM,
    validate
})(Invoice);

//  connect
const InvoiceContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(addInvoiceReduxForm);

InvoiceContainer.navigationOptions = () => ({
    header: null
});

export default InvoiceContainer;
