import React from 'react';
import { connect } from 'react-redux';
import { find } from 'lodash';
import { Invoice } from '../../components/Invoice';
import { reduxForm, getFormValues } from 'redux-form';
import { validate } from './validation';
import * as actions from '../../actions';
import { INVOICE_FORM, INVOICE_EDIT } from '../../constants';
import moment from 'moment';
import { getCustomers } from '@/features/customers/actions';
import { getTaxes, getNotes } from '@/features/settings/actions';
import { isArray } from '@/constants';

export const getSelectedTemplate = (templates, form, isEditScreen) => {
    if (!isEditScreen) {
        return templates?.[0]?.name;
    }

    if (form?.template_name) {
        return form?.template_name;
    }

    return find(templates, { id: form?.invoice_template_id })?.name;
};

const mapStateToProps = (state, { navigation }) => {
    const {
        global: { locale, taxTypes, currency, theme },
        invoices: { loading, invoiceItems, invoiceData, items },
        customers: { customers },
        settings: { notes, customFields }
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
        loading?.initInvoiceLoading ||
        (isEditScreen && !invoice) ||
        !isArray(invoiceTemplates);

    return {
        initLoading: isLoading,
        loading: loading?.invoiceLoading,
        withLoading:
            loading?.changeStatusLoading || loading?.removeInvoiceLoading,
        invoiceItems,
        invoiceData,
        items,
        type,
        notes,
        customers,
        itemsLoading: loading?.itemsLoading,
        locale,
        formValues: getFormValues(INVOICE_FORM)(state) || {},
        taxTypes,
        currency,
        theme,
        customFields,
        id,
        initialValues: !isLoading
            ? {
                  due_date: moment().add(7, 'days'),
                  invoice_date: moment(),
                  discount_type: 'fixed',
                  discount: 0,
                  taxes: [],
                  template_name: getSelectedTemplate(
                      invoiceTemplates,
                      invoice,
                      isEditScreen
                  ),
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
    getTaxes,
    getNotes
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
